import { createHash, randomBytes, createHmac, timingSafeEqual } from 'node:crypto';
import { Buffer } from 'node:buffer';
import type { APIContext } from 'astro';

// Helper to get environment variables (process.env priority)
const getEnv = (key: string) => {
    if (typeof process !== 'undefined' && process.env[key]) {
        return process.env[key];
    }
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
        return import.meta.env[key];
    }
    return undefined;
};

// Lazy loaded session secret
let SESSION_SECRET: Buffer | null = null;

function getSessionSecret(): Buffer {
    if (!SESSION_SECRET) {
        const secretStr = getEnv('SESSION_SECRET');
        SESSION_SECRET = secretStr ? Buffer.from(secretStr) : randomBytes(32);
    }
    return SESSION_SECRET;
}

function sign(data: string): string {
    return createHmac('sha256', getSessionSecret()).update(data).digest('hex');
}

/**
 * Verifies the username and password against the configured credentials.
 */
export function verifyCredentials(username: string, password: string): boolean {
    let expectedUsername = getEnv('ADMIN_USERNAME');
    let expectedPassword = getEnv('ADMIN_PASSWORD');

    // Default 'admin'/'password' in DEV mode if missing
    if (!expectedUsername || !expectedPassword) {
        if (import.meta.env.DEV) {
            expectedUsername = expectedUsername || 'admin';
            expectedPassword = expectedPassword || 'password';
        } else {
            // Fail-closed in PROD if missing
            return false;
        }
    }

    if (username !== expectedUsername) return false;

    // Use timingSafeEqual to compare hashed passwords
    const expectedHashStr = createHash('sha256').update(expectedPassword).digest('hex');
    const inputHashStr = createHash('sha256').update(password).digest('hex');

    const expectedBuf = Buffer.from(expectedHashStr);
    const inputBuf = Buffer.from(inputHashStr);

    if (expectedBuf.length !== inputBuf.length) return false;

    return timingSafeEqual(inputBuf, expectedBuf);
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
