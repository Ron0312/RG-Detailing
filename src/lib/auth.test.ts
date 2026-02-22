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
        // Mock context to capture the token
        const cookies = new Map();
        const context = {
            request: { url: 'http://localhost/admin/stats', headers: new Headers() },
            cookies: {
                get: (name: string) => cookies.get(name),
                set: (name: string, value: string, options: any) => cookies.set(name, { value, ...options }),
                delete: (name: string) => cookies.delete(name)
            }
        };

        // Create session (this generates the random token and sets it)
        createSession(context as any);

        // Verify session was set
        expect(cookies.has('admin_session')).toBe(true);
        const sessionValue = cookies.get('admin_session').value;
        expect(sessionValue).toBeDefined();
        expect(sessionValue).not.toBe('61840eb1a5c8ab075562dfb1839f5f5a454a2a482af67438fe7cdaf9f41336ba');

        // Verify authentication works with this session
        expect(isAuthenticated(context as any)).toBe(true);
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

    it('should fail with old password hash cookie', () => {
        // This test confirms that the old "pass-the-hash" vulnerability is fixed
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
