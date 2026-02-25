import { createHash, createHmac, timingSafeEqual, randomBytes } from 'node:crypto';
import type { APIContext } from 'astro';

// Get credentials from environment or fallback (safe defaults for development)
// In production, these should be set via environment variables.
const getAdminUsername = () => import.meta.env.ADMIN_USERNAME || 'admin';
const getAdminPassword = () => import.meta.env.ADMIN_PASSWORD || 'change_me_please';

// Session Secret: Priority: Process Env -> Import Meta Env -> Random (invalidates on restart)
const getSessionSecret = () => {
    if (typeof process !== 'undefined' && process.env.SESSION_SECRET) {
        return process.env.SESSION_SECRET;
    }
    if (import.meta.env.SESSION_SECRET) {
        return import.meta.env.SESSION_SECRET;
    }
    // Fallback to random secret (secure, but resets sessions on server restart)
    if (!globalThis._sessionSecret) {
        globalThis._sessionSecret = randomBytes(32).toString('hex');
    }
    return globalThis._sessionSecret;
};

// Global cache for random secret
declare global {
    var _sessionSecret: string | undefined;
}

/**
 * Securely compares two strings using constant-time algorithm to prevent timing attacks.
 */
function secureCompare(a: string, b: string): boolean {
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    if (bufA.length !== bufB.length) {
        return false;
    }
    return timingSafeEqual(bufA, bufB);
}

/**
 * Verifies the username and password against the environment credentials.
 */
export function verifyCredentials(username: string, password: string): boolean {
    const validUser = getAdminUsername();
    const validPass = getAdminPassword();

    // Use SHA-256 for comparison to ensure fixed length and prevent timing attacks
    const userHash = createHash('sha256').update(username).digest('hex');
    const validUserHash = createHash('sha256').update(validUser).digest('hex');

    const passHash = createHash('sha256').update(password).digest('hex');
    const validPassHash = createHash('sha256').update(validPass).digest('hex');

    return secureCompare(userHash, validUserHash) && secureCompare(passHash, validPassHash);
}

/**
 * Generates a signed session cookie value.
 */
function signSession(username: string): string {
    const secret = getSessionSecret();
    const signature = createHmac('sha256', secret).update(username).digest('hex');
    return `${username}.${signature}`;
}

/**
 * Verifies a signed session cookie value.
 */
function verifySession(sessionValue: string): boolean {
    const parts = sessionValue.split('.');
    if (parts.length !== 2) return false;

    const [username, signature] = parts;
    const secret = getSessionSecret();
    const expectedSignature = createHmac('sha256', secret).update(username).digest('hex');

    return secureCompare(signature, expectedSignature);
}

/**
 * Checks if the request is authenticated via signed session cookie or API key.
 */
export function isAuthenticated(context: APIContext): boolean {
    // 1. Check Session Cookie
    const session = context.cookies.get('admin_session');
    if (session && verifySession(session.value)) {
        return true;
    }

    // 2. Check Legacy Key (Query Param or Authorization Header)
    // This allows continued access for scripts or if STATS_SECRET is set.
    const url = new URL(context.request.url);
    const key = url.searchParams.get('key') || context.request.headers.get('Authorization')?.replace('Bearer ', '');

    const envSecret = import.meta.env.STATS_SECRET;
    // Ensure secret is present and not empty before comparing
    if (envSecret && key && secureCompare(key, envSecret)) {
        return true;
    }

    return false;
}

/**
 * Creates a secure session cookie.
 */
export function createSession(context: APIContext) {
    const username = getAdminUsername();
    const sessionValue = signSession(username);

    context.cookies.set('admin_session', sessionValue, {
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
