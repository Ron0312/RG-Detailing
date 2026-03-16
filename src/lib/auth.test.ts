import { describe, it, expect, vi } from 'vitest';
import { verifyCredentials, isAuthenticated, createSession, destroySession } from './auth';

describe('Auth Library', () => {
    it('should verify correct credentials from env', () => {
        vi.stubEnv('ADMIN_USERNAME', 'customAdmin');
        vi.stubEnv('ADMIN_PASSWORD', 'superSecurePass');

        expect(verifyCredentials('customAdmin', 'superSecurePass')).toBe(true);
        expect(verifyCredentials('customAdmin', 'wrongpassword')).toBe(false);
        expect(verifyCredentials('wrongAdmin', 'superSecurePass')).toBe(false);

        vi.unstubAllEnvs();
    });

    it('should default to admin/password in dev mode when missing env vars', () => {
        vi.stubEnv('VITE_DEV', 'true');

        expect(verifyCredentials('admin', 'password')).toBe(true);
        expect(verifyCredentials('admin', 'wrongpass')).toBe(false);

        vi.unstubAllEnvs();
    });

    it('should fail-closed in production mode when missing env vars', () => {
        vi.stubEnv('VITE_DEV', 'false');
        vi.stubEnv('VITE_PROD', 'true'); // Used to override the vitest meta env config in our logic

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
