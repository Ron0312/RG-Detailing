import { createHash, randomBytes, createHmac, timingSafeEqual } from 'node:crypto';
import { Buffer } from 'node:buffer';
import type { APIContext } from 'astro';

const USERNAME = 'Ronni';
// SHA-256 of "Remo!123#"
const PASSWORD_HASH = '61840eb1a5c8ab075562dfb1839f5f5a454a2a482af67438fe7cdaf9f41336ba';

// Use a session secret. In production, this should be an env var.
// If not set, generate a random one (invalidates sessions on restart).
// Note: import.meta.env is build-time, process.env is runtime (Node adapter)
const SESSION_SECRET = process.env.SESSION_SECRET || import.meta.env.SESSION_SECRET || randomBytes(32).toString('hex');

/**
 * Verifies the username and password against the hardcoded credentials.
 */
export function verifyCredentials(username: string, password: string): boolean {
    if (username !== USERNAME) return false;
    const hash = createHash('sha256').update(password).digest('hex');

    const hashBuffer = Buffer.from(hash, 'hex');
    const targetBuffer = Buffer.from(PASSWORD_HASH, 'hex');

    if (hashBuffer.length !== targetBuffer.length) return false;
    return timingSafeEqual(hashBuffer, targetBuffer);
}

/**
 * Checks if the request is authenticated via session cookie or API key.
 */
export function isAuthenticated(context: APIContext): boolean {
    // 1. Check Session Cookie
    const session = context.cookies.get('admin_session');
    if (session && session.value) {
        if (verifySession(session.value)) {
            return true;
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
 * Creates a signed session cookie.
 */
export function createSession(context: APIContext) {
    const token = generateSessionToken();
    context.cookies.set('admin_session', token, {
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

// Internal helper to generate a signed token
function generateSessionToken(): string {
    // Payload: timestamp
    const payload = Date.now().toString();
    const signature = createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
    return `${payload}.${signature}`;
}

// Internal helper to verify a signed token
function verifySession(token: string): boolean {
    const parts = token.split('.');
    if (parts.length !== 2) return false;

    const [payload, signature] = parts;
    if (!payload || !signature) return false;

    // Check expiration (optional, but good practice - 7 days matching cookie)
    const timestamp = parseInt(payload);
    if (isNaN(timestamp)) return false;

    const now = Date.now();
    const maxAge = 7 * 24 * 60 * 60 * 1000;
    if (now - timestamp > maxAge) return false;

    const expectedSignature = createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');

    const signatureBuffer = Buffer.from(signature, 'hex');
    const expectedBuffer = Buffer.from(expectedSignature, 'hex');

    if (signatureBuffer.length !== expectedBuffer.length) return false;
    return timingSafeEqual(signatureBuffer, expectedBuffer);
}
