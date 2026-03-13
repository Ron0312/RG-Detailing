import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { verifyCredentials, isAuthenticated, createSession, destroySession } from './auth';

describe('Auth Library', () => {
    beforeEach(() => {
        vi.stubEnv('ADMIN_USERNAME', 'Ronni');
        // SHA-256 of "Remo!123#"
        vi.stubEnv('ADMIN_PASSWORD', '61840eb1a5c8ab075562dfb1839f5f5a454a2a482af67438fe7cdaf9f41336ba');
        vi.stubEnv('DEV', 'false'); // Assuming DEV is false by default in tests, but let's be explicit

        // Setup import.meta.env for testing since Vitest might not fully support mocking it via stubEnv
        // if it uses the process.env directly underneath or has its own shim
        // However, vi.stubEnv often maps to process.env and Vitest bridges it.
        // To be safe, we also can just set process.env, but vi.stubEnv is standard.
        // In Vite/Vitest, import.meta.env is tied to process.env for these tests usually.
        // We'll trust vi.stubEnv based on the instructions.
    });

    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it('should verify correct credentials from environment', () => {
        expect(verifyCredentials('Ronni', 'Remo!123#')).toBe(true);
    });

    it('should reject incorrect username', () => {
        expect(verifyCredentials('Admin', 'Remo!123#')).toBe(false);
    });

    it('should reject incorrect password', () => {
        expect(verifyCredentials('Ronni', 'wrongpassword')).toBe(false);
    });

    it('should fallback to admin/password in DEV if no env vars are set', () => {
        vi.unstubAllEnvs();
        vi.stubEnv('DEV', 'true');

        // With DEV=true and no credentials, should allow 'admin'/'password'
        expect(verifyCredentials('admin', 'password')).toBe(true);
        expect(verifyCredentials('admin', 'wrongpassword')).toBe(false);
        expect(verifyCredentials('wrongadmin', 'password')).toBe(false);
    });

    it('should fail-closed in production if no env vars are set', () => {
        vi.unstubAllEnvs();
        vi.stubEnv('PROD', 'true');
        vi.stubEnv('DEV', 'false');

        // No credentials set, should reject everything
        expect(verifyCredentials('admin', 'password')).toBe(false);
        expect(verifyCredentials('Ronni', 'Remo!123#')).toBe(false);
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
