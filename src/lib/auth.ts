import { createHash, randomBytes, createHmac, timingSafeEqual } from 'node:crypto';
import type { APIContext } from 'astro';

const USERNAME = 'Ronni';
// SHA-256 of "Remo!123#"
const PASSWORD_HASH = '61840eb1a5c8ab075562dfb1839f5f5a454a2a482af67438fe7cdaf9f41336ba';

// Generate a random session secret on server start
// This ensures sessions are invalidated on restart and cannot be forged even if PASSWORD_HASH is known
const SESSION_SECRET = randomBytes(32);

/**
 * Verifies the username and password against the hardcoded credentials.
 */
export function verifyCredentials(username: string, password: string): boolean {
    // Note: This early return leaks username validity via timing, but given the single-user nature
    // and hardcoded username, the risk is minimal compared to password timing attacks.
    if (username !== USERNAME) return false;

    const hash = createHash('sha256').update(password).digest('hex');

    // Use timingSafeEqual for constant-time comparison to prevent timing attacks
    const targetBuffer = Buffer.from(PASSWORD_HASH, 'hex');
    const inputBuffer = Buffer.from(hash, 'hex');

    // timingSafeEqual throws if lengths differ, so we check length first.
    // In a real multi-user system, we would simulate a comparison even on failure to avoid timing leaks.
    if (inputBuffer.length !== targetBuffer.length) {
        return false;
    }

    return timingSafeEqual(inputBuffer, targetBuffer);
}

/**
 * Checks if the request is authenticated via session cookie or API key.
 */
export function isAuthenticated(context: APIContext): boolean {
    // 1. Check Session Cookie
    const session = context.cookies.get('admin_session');

    if (session && session.value) {
        try {
            // Verify the session signature
            const expectedSignature = createHmac('sha256', SESSION_SECRET)
                .update(PASSWORD_HASH)
                .digest('hex');

            const inputSignature = Buffer.from(session.value, 'hex');
            const targetSignature = Buffer.from(expectedSignature, 'hex');

            if (inputSignature.length === targetSignature.length && timingSafeEqual(inputSignature, targetSignature)) {
                return true;
            }
        } catch (e) {
            // Ignore malformed cookies
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
    // Create a signature of the password hash using our ephemeral secret
    const signature = createHmac('sha256', SESSION_SECRET)
        .update(PASSWORD_HASH)
        .digest('hex');

    context.cookies.set('admin_session', signature, {
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
