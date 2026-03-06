import { createHash, randomBytes, createHmac, timingSafeEqual } from 'node:crypto';
import { Buffer } from 'node:buffer';
import type { APIContext } from 'astro';

// Helper to get environment variables securely across Node/Astro environments
function getEnv(key: string): string | undefined {
    if (typeof process !== 'undefined' && process.env[key]) {
        return process.env[key];
    }
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
        return import.meta.env[key];
    }
    return undefined;
}

// Generate a random secret for signing session cookies if not provided.
// Prioritizes process.env -> import.meta.env -> random fallback
let sessionSecretEnv = getEnv('SESSION_SECRET');
const SESSION_SECRET = sessionSecretEnv ? Buffer.from(sessionSecretEnv) : randomBytes(32);

function sign(data: string): string {
    return createHmac('sha256', SESSION_SECRET).update(data).digest('hex');
}

/**
 * Verifies the username and password securely against environment variables.
 * Uses timingSafeEqual to prevent timing attacks.
 */
export function verifyCredentials(username: string, password: string): boolean {
    let adminUsername = getEnv('ADMIN_USERNAME');
    let adminPassword = getEnv('ADMIN_PASSWORD');
    let adminPasswordHash = adminPassword ? createHash('sha256').update(adminPassword).digest('hex') : undefined;

    // Fallback to defaults only in DEV mode for local testing
    if ((!adminUsername || !adminPasswordHash) && import.meta.env.DEV) {
        adminUsername = 'admin';
        // Hash for 'password'
        adminPasswordHash = '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8';
    }

    // Fail closed if no credentials configured and not in dev
    if (!adminUsername || !adminPasswordHash) {
        return false;
    }

    // Compare usernames securely (timing attack prevention is less critical for username, but good practice)
    if (username !== adminUsername) {
        return false;
    }

    const inputHash = createHash('sha256').update(password).digest('hex');
    const inputHashBuf = Buffer.from(inputHash);
    const expectedHashBuf = Buffer.from(adminPasswordHash);

    // Prevent timing attacks when comparing the password hash
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
