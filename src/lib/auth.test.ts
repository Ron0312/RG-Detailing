import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { verifyCredentials, isAuthenticated, createSession, destroySession, hashPassword } from './auth';

describe('Auth Library', () => {
    const testPassword = 'TestPass!456#';
    let originalEnv: Record<string, string | undefined>;

    beforeEach(() => {
        originalEnv = {
            ADMIN_USERNAME: process.env.ADMIN_USERNAME,
            ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH,
        };
        // Set up test credentials with scrypt hash
        process.env.ADMIN_USERNAME = 'TestAdmin';
        process.env.ADMIN_PASSWORD_HASH = hashPassword(testPassword);
    });

    afterEach(() => {
        process.env.ADMIN_USERNAME = originalEnv.ADMIN_USERNAME;
        process.env.ADMIN_PASSWORD_HASH = originalEnv.ADMIN_PASSWORD_HASH;
    });

    it('should verify correct credentials', () => {
        expect(verifyCredentials('TestAdmin', testPassword)).toBe(true);
    });

    it('should reject incorrect username', () => {
        expect(verifyCredentials('WrongUser', testPassword)).toBe(false);
    });

    it('should reject incorrect password', () => {
        expect(verifyCredentials('TestAdmin', 'wrongpassword')).toBe(false);
    });

    it('should reject login when ADMIN_PASSWORD_HASH is not set', () => {
        delete process.env.ADMIN_PASSWORD_HASH;
        expect(verifyCredentials('TestAdmin', testPassword)).toBe(false);
    });

    it('should support legacy SHA-256 hash format', () => {
        const { createHash } = require('node:crypto');
        const sha256 = createHash('sha256').update('legacyPass').digest('hex');
        process.env.ADMIN_PASSWORD_HASH = sha256;
        expect(verifyCredentials('TestAdmin', 'legacyPass')).toBe(true);
        expect(verifyCredentials('TestAdmin', 'wrongPass')).toBe(false);
    });

    it('should generate valid scrypt hashes', () => {
        const hash = hashPassword('somePassword');
        expect(hash).toMatch(/^scrypt:[0-9a-f]+:[0-9a-f]+$/);
        process.env.ADMIN_PASSWORD_HASH = hash;
        expect(verifyCredentials('TestAdmin', 'somePassword')).toBe(true);
    });

    it('should authenticate with valid session cookie', () => {
        const cookies = new Map();
        const context: any = {
            request: { url: 'http://localhost/admin/stats', headers: new Headers() },
            cookies: {
                get: (name: string) => cookies.get(name),
                set: (name: string, value: string, options: any) => cookies.set(name, { value, ...options }),
                delete: (name: string) => cookies.delete(name)
            }
        };

        createSession(context);
        expect(cookies.has('admin_session')).toBe(true);
        expect(isAuthenticated(context)).toBe(true);
    });

    it('should fail with invalid signature', () => {
        const cookies = new Map();
        const context: any = {
            request: { url: 'http://localhost/admin/stats', headers: new Headers() },
            cookies: {
                get: (name: string) => cookies.get(name),
                set: (name: string, value: string) => cookies.set(name, { value }),
            }
        };

        // Create valid session first to get format
        createSession(context);
        const validCookie = cookies.get('admin_session').value;
        const [payload, signature] = validCookie.split('.');

        // Tamper with signature
        cookies.set('admin_session', { value: `${payload}.badsignature` });
        expect(isAuthenticated(context)).toBe(false);

        // Tamper with payload
        cookies.set('admin_session', { value: `badpayload.${signature}` });
        expect(isAuthenticated(context)).toBe(false);
    });

    it('should fail with expired session', () => {
        const cookies = new Map();
        const context: any = {
            request: { url: 'http://localhost/admin/stats', headers: new Headers() },
            cookies: {
                get: (name: string) => cookies.get(name),
                set: (name: string, value: string) => cookies.set(name, { value }),
            }
        };

        createSession(context);
        expect(isAuthenticated(context)).toBe(true);

        // Advance time by 8 days (7 days is expiry)
        const originalNow = Date.now;
        const futureTime = originalNow() + 8 * 24 * 60 * 60 * 1000;

        try {
            // Mock Date.now inside the test scope
            vi.spyOn(Date, 'now').mockReturnValue(futureTime);
            expect(isAuthenticated(context)).toBe(false);
        } finally {
            vi.restoreAllMocks();
        }
    });

    it('should destroy session', () => {
        const cookies = new Map();
        const context: any = {
            cookies: {
                delete: (name: string) => cookies.delete(name),
                set: (name: string, value: string) => cookies.set(name, { value })
            }
        };

        createSession(context);
        expect(cookies.has('admin_session')).toBe(true);

        destroySession(context);
        expect(cookies.has('admin_session')).toBe(false);
    });
});
