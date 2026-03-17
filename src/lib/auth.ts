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
 * Verifies the username and password securely against environment variables.
 */
export function verifyCredentials(username: string, password: string): boolean {
    const getEnv = (key: string) => {
        if (typeof process !== 'undefined' && process.env[key]) return process.env[key];
        if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) return import.meta.env[key];
        return undefined;
    };

    // Check if in dev mode to allow fallback, but make sure to fail closed in production
    const isProd = getEnv('VITE_PROD') === 'true' || getEnv('VITE_PROD') === true || getEnv('MODE') === 'production';
    const isDevEnv = getEnv('VITE_DEV') === 'true' || getEnv('VITE_DEV') === true ||
                  getEnv('MODE') === 'development' ||
                  (typeof import.meta !== 'undefined' && import.meta.env && (import.meta.env.DEV === true || import.meta.env.DEV === 'true'));

    // Explicitly reject dev fallback if explicitly prod
    const isDev = isDevEnv && !isProd;

    const envUsername = getEnv('ADMIN_USERNAME') || (isDev ? 'admin' : undefined);
    const envPassword = getEnv('ADMIN_PASSWORD') || (isDev ? 'password' : undefined);

    if (!envUsername || !envPassword) return false;

    if (username !== envUsername) return false;

    const inputHashBuf = createHash('sha256').update(password).digest();
    const expectedHashBuf = createHash('sha256').update(envPassword).digest();

    return inputHashBuf.length === expectedHashBuf.length && timingSafeEqual(inputHashBuf, expectedHashBuf);
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
