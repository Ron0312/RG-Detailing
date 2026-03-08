import { createHash, randomBytes, createHmac, timingSafeEqual } from 'node:crypto';
import { Buffer } from 'node:buffer';
import type { APIContext } from 'astro';

export function getEnv(key: string): string | undefined {
    if (typeof process !== 'undefined' && process.env && process.env[key] !== undefined && process.env[key] !== '') {
        return process.env[key];
    }
    // Static replacement is needed for Vite, so we only handle the keys we actually use.
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env) {
        if (key === 'SESSION_SECRET') return import.meta.env.SESSION_SECRET;
        if (key === 'ADMIN_USERNAME') return import.meta.env.ADMIN_USERNAME;
        if (key === 'ADMIN_PASSWORD') return import.meta.env.ADMIN_PASSWORD;
        if (key === 'STATS_SECRET') return import.meta.env.STATS_SECRET;
    }
    return undefined;
}

// Generate a random secret for signing session cookies.
// In a real production app, this should persist or be in ENV to survive restarts.
const SESSION_SECRET = (() => {
    const secret = getEnv('SESSION_SECRET');
    return secret ? Buffer.from(secret) : randomBytes(32);
})();

function sign(data: string): string {
    return createHmac('sha256', SESSION_SECRET).update(data).digest('hex');
}

/**
 * Verifies the username and password against the configured credentials.
 */
export function verifyCredentials(username: string, password: string): boolean {
    const adminUsername = getEnv('ADMIN_USERNAME');
    const adminPassword = getEnv('ADMIN_PASSWORD');

    // Strict fail-closed policy
    if (!adminUsername || !adminPassword) {
        return false;
    }

    if (username !== adminUsername) return false;

    // Compare SHA-256 hashes using timingSafeEqual to prevent timing attacks
    const inputHash = createHash('sha256').update(password).digest();
    const expectedHash = createHash('sha256').update(adminPassword).digest();

    if (inputHash.length !== expectedHash.length) return false;

    return timingSafeEqual(inputHash, expectedHash);
}

/**
 * Checks if the request is authenticated via session cookie or API key.
 */
export function isAuthenticated(context: APIContext): boolean {
    // 1. Check Session Cookie (Signed)
    const cookie = context.cookies.get('admin_session');
    if (cookie && cookie.value) {
        const [payload, signature] = cookie.value.split('.');
        if (payload && signature) {
            const expectedSignature = sign(payload);
            const signatureBuf = Buffer.from(signature);
            const expectedBuf = Buffer.from(expectedSignature);

            if (signatureBuf.length === expectedBuf.length &&
                timingSafeEqual(signatureBuf, expectedBuf)) {
                // Check expiry timestamp in payload
                const expiry = parseInt(payload.split(':')[1] || '0');
                if (Date.now() < expiry) {
                    return true;
                }
            }
        }
    }

    // 2. Check Legacy Key (Query Param or Authorization Header)
    // This allows continued access for scripts or if STATS_SECRET is set.
    const url = new URL(context.request.url);
    const key = url.searchParams.get('key') || context.request.headers.get('Authorization')?.replace('Bearer ', '');

    const envSecret = getEnv('STATS_SECRET');
    if (envSecret && key) {
        const keyBuf = Buffer.from(key);
        const secretBuf = Buffer.from(envSecret);
        if (keyBuf.length === secretBuf.length && timingSafeEqual(keyBuf, secretBuf)) {
            return true;
        }
    }

    return false;
}

/**
 * Creates a secure session cookie.
 */
export function createSession(context: APIContext) {
    const expires = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
    const payload = `admin:${expires}`;
    const signature = sign(payload);

    // @ts-ignore
    const isProd = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.PROD;

    context.cookies.set('admin_session', `${payload}.${signature}`, {
        path: '/',
        httpOnly: true,
        secure: isProd,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 days
    });
}

/**
 * Destroys the session cookie.
 */
export function destroySession(context: APIContext) {
    context.cookies.delete('admin_session', { path: '/' });
}
