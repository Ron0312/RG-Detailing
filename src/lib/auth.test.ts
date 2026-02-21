import { describe, it, expect } from 'vitest';
import { verifyCredentials, isAuthenticated } from './auth';

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
        const context = {
            request: { url: 'http://localhost/admin/stats', headers: new Headers() },
            cookies: {
                get: (name) => name === 'admin_session' ? { value: '61840eb1a5c8ab075562dfb1839f5f5a454a2a482af67438fe7cdaf9f41336ba' } : undefined
            }
        };
        // @ts-ignore
        expect(isAuthenticated(context)).toBe(true);
    });

    it('should fail with invalid cookie', () => {
        const context = {
            request: { url: 'http://localhost/admin/stats', headers: new Headers() },
            cookies: {
                get: (name) => name === 'admin_session' ? { value: 'badhash' } : undefined
            }
        };
        // @ts-ignore
        expect(isAuthenticated(context)).toBe(false);
    });
});
