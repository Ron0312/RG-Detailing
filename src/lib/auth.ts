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
 * Verifies the username and password against the hardcoded credentials.
 */
export function verifyCredentials(username: string, password: string): boolean {
    // Check for dev mode via explicit process.env / import.meta.env
    // to handle variations in Astro/Vite testing environments
    let isDev = false;
    if (typeof process !== 'undefined' && process.env.VITE_DEV === 'true') {
        isDev = true;
    } else if (typeof process !== 'undefined' && process.env.VITE_DEV === 'false') {
        isDev = false;
    } else if (typeof import.meta !== 'undefined' && import.meta.env) {
        if (import.meta.env.VITE_DEV === 'true') isDev = true;
        else if (import.meta.env.VITE_DEV === 'false') isDev = false;
        else {
            if (import.meta.env.DEV === true || import.meta.env.DEV === 'true') isDev = true;
            if (import.meta.env.MODE === 'development') isDev = true;
        }
    }

    let expectedUsername = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.ADMIN_USERNAME : undefined;
    if (!expectedUsername && typeof process !== 'undefined') expectedUsername = process.env.ADMIN_USERNAME;

    let expectedPassword = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.ADMIN_PASSWORD : undefined;
    if (!expectedPassword && typeof process !== 'undefined') expectedPassword = process.env.ADMIN_PASSWORD;

    if ((!expectedUsername || !expectedPassword) && isDev) {
        expectedUsername = 'admin';
        expectedPassword = 'password';
    }

    if (!expectedUsername || !expectedPassword) {
        return false; // Fail closed
    }

    // Compare username with timing-safe equal
    const usernameBuf = Buffer.from(username);
    const expectedUsernameBuf = Buffer.from(expectedUsername);
    if (usernameBuf.length !== expectedUsernameBuf.length || !timingSafeEqual(usernameBuf, expectedUsernameBuf)) {
        return false;
    }

    // Compare password hash with timing-safe equal
    const inputHash = createHash('sha256').update(password).digest('hex');
    const expectedHash = createHash('sha256').update(expectedPassword).digest('hex');

    const inputHashBuf = Buffer.from(inputHash);
    const expectedHashBuf = Buffer.from(expectedHash);

    if (inputHashBuf.length !== expectedHashBuf.length || !timingSafeEqual(inputHashBuf, expectedHashBuf)) {
        return false;
    }

    return true;
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
