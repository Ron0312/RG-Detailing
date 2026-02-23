import { describe, it, expect, vi } from 'vitest';
import { verifyCredentials, isAuthenticated, createSession } from './auth';

describe('Auth Library', () => {
    it('should verify correct credentials', () => {
        const username = 'Ronni';
        const password = 'Remo!123#';
        expect(verifyCredentials(username, password)).toBe(true);
    });

    it('should reject incorrect username', () => {
        expect(verifyCredentials('Admin', 'Remo!123#')).toBe(false);
    });

    it('should reject incorrect password', () => {
        expect(verifyCredentials('Ronni', 'wrongpassword')).toBe(false);
    });

    it('should authenticate with valid cookie', () => {
        // Mock cookies.set to capture the session token
        let sessionToken = '';
        const mockSet = vi.fn((name, value, options) => {
            if (name === 'admin_session') {
                sessionToken = value;
            }
        });

        const setupContext = {
            cookies: {
                set: mockSet
            }
        };

        // Create a session to generate the token
        // @ts-ignore
        createSession(setupContext);

        expect(sessionToken).toBeTruthy();
        expect(sessionToken).not.toBe('61840eb1a5c8ab075562dfb1839f5f5a454a2a482af67438fe7cdaf9f41336ba'); // Should not be the raw hash anymore

        // Now verify authentication using the generated token
        const context = {
            request: { url: 'http://localhost/admin/stats', headers: new Headers() },
            cookies: {
                get: (name: string) => name === 'admin_session' ? { value: sessionToken } : undefined
            }
        };
        // @ts-ignore
        expect(isAuthenticated(context)).toBe(true);
    });

    it('should fail with invalid cookie', () => {
        const context = {
            request: { url: 'http://localhost/admin/stats', headers: new Headers() },
            cookies: {
                get: (name: string) => name === 'admin_session' ? { value: 'badhash' } : undefined
            }
        };
        // @ts-ignore
        expect(isAuthenticated(context)).toBe(false);
    });

    it('should fail with raw password hash as cookie (old vulnerability)', () => {
        // This ensures the old bypass method no longer works
        const context = {
            request: { url: 'http://localhost/admin/stats', headers: new Headers() },
            cookies: {
                get: (name: string) => name === 'admin_session' ? { value: '61840eb1a5c8ab075562dfb1839f5f5a454a2a482af67438fe7cdaf9f41336ba' } : undefined
            }
        };
        // @ts-ignore
        expect(isAuthenticated(context)).toBe(false);
    });
});
