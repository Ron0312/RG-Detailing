import { createHash, randomBytes, createHmac, timingSafeEqual } from 'node:crypto';
import { Buffer } from 'node:buffer';
import type { APIContext } from 'astro';

const USERNAME = 'Ronni';
// SHA-256 of "Remo!123#"
const PASSWORD_HASH = '61840eb1a5c8ab075562dfb1839f5f5a454a2a482af67438fe7cdaf9f41336ba';

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
    // Security: Prevent user enumeration via timing attacks by computing hashes
    // regardless of whether the username is correct or not.
    const isUsernameMatch = username === USERNAME;

    const expectedHashBuf = Buffer.from(PASSWORD_HASH, 'hex');
    const inputHashBuf = createHash('sha256').update(password).digest();

    const isPasswordMatch = timingSafeEqual(inputHashBuf, expectedHashBuf);

    return isUsernameMatch && isPasswordMatch;
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

            // Security: Hash both strings before timingSafeEqual to prevent length-leakage
            // and guarantee identical buffer sizes (32 bytes for SHA-256).
            const signatureHashBuf = createHash('sha256').update(signature).digest();
            const expectedHashBuf = createHash('sha256').update(expectedSignature).digest();

            if (timingSafeEqual(signatureHashBuf, expectedHashBuf)) {
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
        // Security: Hash both strings before timingSafeEqual to prevent length-leakage
        const keyHashBuf = createHash('sha256').update(key).digest();
        const secretHashBuf = createHash('sha256').update(envSecret).digest();

        if (timingSafeEqual(keyHashBuf, secretHashBuf)) {
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
