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
 * Helper to securely get env variables
 */
const getEnv = (key: string) => {
    if (typeof process !== 'undefined' && process.env[key]) {
        return process.env[key];
    }
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
        return import.meta.env[key];
    }
    return undefined;
};

/**
 * Verifies the username and password against environment credentials.
 */
export function verifyCredentials(username: string, password: string): boolean {
    let expectedUsername = getEnv('ADMIN_USERNAME');
    let expectedPassword = getEnv('ADMIN_PASSWORD');

    // Vitest runs with MODE=test by default, which can cause import.meta.env.DEV to be true.
    // If VITE_DEV is explicitly set to false, we should respect that over the default.
    const isDev =
        getEnv('VITE_DEV') === 'true' ||
        getEnv('VITE_DEV') === true ||
        ((getEnv('VITE_DEV') !== 'false' && getEnv('VITE_DEV') !== false) &&
            ((typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV === true) ||
            (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.MODE === 'development')));

    if (!expectedUsername || !expectedPassword) {
        if (isDev) {
            expectedUsername = 'admin';
            expectedPassword = 'password';
        } else {
            // Fail closed in production if no credentials configured
            return false;
        }
    }

    if (username !== expectedUsername) return false;

    // Use timing-safe comparison to prevent timing attacks
    const inputHash = createHash('sha256').update(password).digest();
    const expectedHash = createHash('sha256').update(expectedPassword).digest();

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
        // Hash both to ensure identical buffer lengths (32 bytes)
        // Prevents length-leakage attacks while using timingSafeEqual
        const keyHash = createHash('sha256').update(key).digest();
        const secretHash = createHash('sha256').update(envSecret).digest();
        if (timingSafeEqual(keyHash, secretHash)) {
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
