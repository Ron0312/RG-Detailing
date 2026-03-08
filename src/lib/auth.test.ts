import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { verifyCredentials, isAuthenticated, createSession, destroySession } from './auth';

describe('Auth Library', () => {
    beforeEach(() => {
        vi.unstubAllEnvs();
    });

    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it('should verify correct credentials from env', () => {
        vi.stubEnv('ADMIN_USERNAME', 'Ronni');
        vi.stubEnv('ADMIN_PASSWORD', 'Remo!123#');
        expect(verifyCredentials('Ronni', 'Remo!123#')).toBe(true);
    });

    it('should fail-close if credentials missing', () => {
        // Completely remove any env from process.env explicitly for this test
        const originalUser = process.env.ADMIN_USERNAME;
        const originalPass = process.env.ADMIN_PASSWORD;

        delete process.env.ADMIN_USERNAME;
        delete process.env.ADMIN_PASSWORD;

        // Stub to ensure it returns undefined to getEnv
        vi.stubEnv('ADMIN_USERNAME', undefined as any);
        vi.stubEnv('ADMIN_PASSWORD', undefined as any);

        expect(verifyCredentials('Ronni', 'Remo!123#')).toBe(false);

        if (originalUser !== undefined) process.env.ADMIN_USERNAME = originalUser;
        if (originalPass !== undefined) process.env.ADMIN_PASSWORD = originalPass;
    });

    it('should reject incorrect username', () => {
        vi.stubEnv('ADMIN_USERNAME', 'Ronni');
        vi.stubEnv('ADMIN_PASSWORD', 'Remo!123#');
        expect(verifyCredentials('Admin', 'Remo!123#')).toBe(false);
    });

    it('should reject incorrect password', () => {
        vi.stubEnv('ADMIN_USERNAME', 'Ronni');
        vi.stubEnv('ADMIN_PASSWORD', 'Remo!123#');
        expect(verifyCredentials('Ronni', 'wrongpassword')).toBe(false);
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
