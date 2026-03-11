import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { verifyCredentials, isAuthenticated, createSession, destroySession } from './auth';

describe('Auth Library', () => {
    beforeEach(() => {
        vi.stubEnv('ADMIN_USERNAME', 'Ronni');
        vi.stubEnv('ADMIN_PASSWORD', '61840eb1a5c8ab075562dfb1839f5f5a454a2a482af67438fe7cdaf9f41336ba');
    });

    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it('should verify correct credentials', () => {
        expect(verifyCredentials('Ronni', 'Remo!123#')).toBe(true);
    });

    it('should reject incorrect username', () => {
        expect(verifyCredentials('Admin', 'Remo!123#')).toBe(false);
    });

    it('should reject incorrect password', () => {
        expect(verifyCredentials('Ronni', 'wrongpassword')).toBe(false);
    });

    it('should use fallback dev credentials when env is missing and DEV is true', () => {
        vi.unstubAllEnvs();
        vi.stubGlobal('import.meta', { env: { DEV: true } });
        expect(verifyCredentials('admin', 'password')).toBe(true);
        expect(verifyCredentials('Ronni', 'Remo!123#')).toBe(false);
        vi.unstubAllGlobals();
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
