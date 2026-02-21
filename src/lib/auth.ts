import { createHash } from 'node:crypto';
import type { APIContext } from 'astro';

const USERNAME = 'Ronni';
// SHA-256 of "Remo!123#"
const PASSWORD_HASH = '61840eb1a5c8ab075562dfb1839f5f5a454a2a482af67438fe7cdaf9f41336ba';

/**
 * Verifies the username and password against the hardcoded credentials.
 */
export function verifyCredentials(username: string, password: string): boolean {
    if (username !== USERNAME) return false;
    const hash = createHash('sha256').update(password).digest('hex');
    return hash === PASSWORD_HASH;
}

/**
 * Checks if the request is authenticated via session cookie or API key.
 */
export function isAuthenticated(context: APIContext): boolean {
    // 1. Check Session Cookie
    const session = context.cookies.get('admin_session');
    if (session && session.value === PASSWORD_HASH) {
        return true;
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
    context.cookies.set('admin_session', PASSWORD_HASH, {
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
