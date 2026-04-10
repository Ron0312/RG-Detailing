import { createHash, randomBytes, createHmac, timingSafeEqual, scryptSync } from 'node:crypto';
import { Buffer } from 'node:buffer';
import type { APIContext } from 'astro';

function getEnv(key: string): string | undefined {
    if (typeof process !== 'undefined' && process.env[key]) {
        return process.env[key];
    }
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
        return import.meta.env[key] as string;
    }
    return undefined;
}

// Session secret from ENV survives restarts; falls back to random (dev only).
const SESSION_SECRET = (() => {
    const envSecret = getEnv('SESSION_SECRET');
    if (envSecret) return Buffer.from(envSecret, 'hex');
    if (getEnv('PROD') || import.meta.env.PROD) {
        console.warn('[auth] SESSION_SECRET not set — sessions will not survive restarts');
    }
    return randomBytes(32);
})();

function sign(data: string): string {
    return createHmac('sha256', SESSION_SECRET).update(data).digest('hex');
}

/**
 * Verifies username and password.
 * Supports two formats for ADMIN_PASSWORD_HASH:
 *   - scrypt: "scrypt:<salt_hex>:<hash_hex>"
 *   - sha256: plain 64-char hex string (legacy, not recommended)
 */
export function verifyCredentials(username: string, password: string): boolean {
    const expectedUser = getEnv('ADMIN_USERNAME') || 'admin';
    if (username !== expectedUser) return false;

    const storedHash = getEnv('ADMIN_PASSWORD_HASH');
    if (!storedHash) {
        console.error('[auth] ADMIN_PASSWORD_HASH not set — login disabled');
        return false;
    }

    if (storedHash.startsWith('scrypt:')) {
        const parts = storedHash.split(':');
        if (parts.length !== 3) return false;
        const salt = Buffer.from(parts[1], 'hex');
        const expected = Buffer.from(parts[2], 'hex');
        const derived = scryptSync(password, salt, 64);
        return derived.length === expected.length && timingSafeEqual(derived, expected);
    }

    // Legacy SHA-256 fallback (for migration)
    const hash = createHash('sha256').update(password).digest('hex');
    const hashBuf = Buffer.from(hash);
    const storedBuf = Buffer.from(storedHash);
    return hashBuf.length === storedBuf.length && timingSafeEqual(hashBuf, storedBuf);
}

/**
 * Generates a scrypt hash string for use in ADMIN_PASSWORD_HASH env var.
 * Usage: node -e "import('./src/lib/auth.ts').then(m => console.log(m.hashPassword('mypassword')))"
 */
export function hashPassword(password: string): string {
    const salt = randomBytes(16);
    const hash = scryptSync(password, salt, 64);
    return `scrypt:${salt.toString('hex')}:${hash.toString('hex')}`;
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
