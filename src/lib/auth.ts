import { createHash, randomBytes, createHmac, timingSafeEqual } from 'node:crypto';
import { Buffer } from 'node:buffer';
import type { APIContext } from 'astro';

// Generate a random secret for signing session cookies.
// In a real production app, this should persist or be in ENV to survive restarts.
const SESSION_SECRET = randomBytes(32);

function sign(data: string): string {
    return createHmac('sha256', SESSION_SECRET).update(data).digest('hex');
}

/**
 * Gets an environment variable securely across both Node (runtime) and Astro (build-time) environments.
 */
function getEnv(key: string): string | undefined {
    if (typeof process !== 'undefined' && process.env[key]) {
        return process.env[key];
    }
    // Static property access required by Vite
    if (typeof import.meta !== 'undefined' && import.meta.env) {
        if (key === 'ADMIN_USERNAME') return import.meta.env.ADMIN_USERNAME;
        if (key === 'ADMIN_PASSWORD') return import.meta.env.ADMIN_PASSWORD;
    }
    return undefined;
}

/**
 * Verifies the username and password against configured credentials.
 */
export function verifyCredentials(username: string, password: string): boolean {
    const expectedUsername = getEnv('ADMIN_USERNAME');
    const expectedPasswordHash = getEnv('ADMIN_PASSWORD');

    if (!expectedUsername || !expectedPasswordHash) {
        // Enforce fail-closed policy if env vars are missing
        if (import.meta.env.DEV) {
            // Default to 'admin'/'password' in development only if missing
            // SHA-256 of "password"
            const devPasswordHash = '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8';
            if (username !== 'admin') return false;
            const hash = createHash('sha256').update(password).digest('hex');
            return hash === devPasswordHash;
        }
        return false;
    }

    if (username !== expectedUsername) return false;

    const hash = createHash('sha256').update(password).digest('hex');
    const hashBuf = Buffer.from(hash);
    const expectedHashBuf = Buffer.from(expectedPasswordHash);

    if (hashBuf.length !== expectedHashBuf.length) return false;

    return timingSafeEqual(hashBuf, expectedHashBuf);
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

    const envSecret = import.meta.env.STATS_SECRET;
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

    context.cookies.set('admin_session', `${payload}.${signature}`, {
        path: '/',
        httpOnly: true,
        secure: import.meta.env.PROD,
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
