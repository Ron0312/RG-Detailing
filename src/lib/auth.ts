import { createHash, randomBytes, createHmac, timingSafeEqual } from 'node:crypto';
import type { APIContext } from 'astro';

// Secure credentials using Environment Variables with hardcoded fallbacks
// In production, these should be set via ENV variables.
const USERNAME = import.meta.env.ADMIN_USERNAME || 'Ronni';
// SHA-256 of "Remo!123#" - default fallback
const PASSWORD_HASH = import.meta.env.ADMIN_PASSWORD_HASH || '61840eb1a5c8ab075562dfb1839f5f5a454a2a482af67438fe7cdaf9f41336ba';

// Warn if using default credentials in production
if (import.meta.env.PROD && !import.meta.env.ADMIN_PASSWORD_HASH) {
    console.warn('⚠️  SECURITY WARNING: Using default admin credentials in PRODUCTION. Please set ADMIN_USERNAME and ADMIN_PASSWORD_HASH environment variables immediately.');
}

// Generate a secret for signing session cookies.
// Use ENV variable if available, otherwise fallback to randomBytes (invalidates sessions on restart).
const SESSION_SECRET = import.meta.env.SESSION_SECRET
    ? Buffer.from(import.meta.env.SESSION_SECRET, 'hex')
    : randomBytes(32);

function sign(data: string): string {
    return createHmac('sha256', SESSION_SECRET).update(data).digest('hex');
}

/**
 * Verifies the username and password against the credentials.
 */
export function verifyCredentials(username: string, password: string): boolean {
    if (username !== USERNAME) return false;
    const hash = createHash('sha256').update(password).digest('hex');
    // Use timingSafeEqual to prevent timing attacks on hash comparison
    const hashBuf = Buffer.from(hash);
    const expectedBuf = Buffer.from(PASSWORD_HASH);

    if (hashBuf.length !== expectedBuf.length) return false;
    return timingSafeEqual(hashBuf, expectedBuf);
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
    if (envSecret && key === envSecret) {
        return true;
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
