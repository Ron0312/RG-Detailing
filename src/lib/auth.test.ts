import { describe, it, expect, vi } from 'vitest';
import { verifyCredentials, isAuthenticated, createSession, destroySession } from './auth';

describe('Auth Library', () => {
    it('should verify correct credentials in dev fallback', () => {
        vi.stubEnv('DEV', 'true');
        expect(verifyCredentials('admin', 'password')).toBe(true);
        vi.unstubAllEnvs();
    });

    it('should reject incorrect username', () => {
        vi.stubEnv('DEV', 'true');
        expect(verifyCredentials('Admin', 'password')).toBe(false);
        vi.unstubAllEnvs();
    });

    it('should reject incorrect password', () => {
        vi.stubEnv('DEV', 'true');
        expect(verifyCredentials('admin', 'wrongpassword')).toBe(false);
        vi.unstubAllEnvs();
    });

    it('should verify correct credentials with environment variables', () => {
        vi.stubEnv('ADMIN_USERNAME', 'customadmin');
        vi.stubEnv('ADMIN_PASSWORD', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'); // SHA-256 of 'password'
        expect(verifyCredentials('customadmin', 'password')).toBe(true);
        vi.unstubAllEnvs();
    });

    it('should fail closed when not in dev mode without environment variables', () => {
        vi.stubEnv('DEV', '');
        expect(verifyCredentials('admin', 'password')).toBe(false);
        vi.unstubAllEnvs();
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
