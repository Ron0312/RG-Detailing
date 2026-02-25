
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { verifyCredentials, isAuthenticated, createSession } from './auth';

describe('auth.ts', () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    // Default mock environment
    vi.stubEnv('ADMIN_USERNAME', 'admin');
    vi.stubEnv('ADMIN_PASSWORD', 'securepassword');
    vi.stubEnv('SESSION_SECRET', 'supersecret');
  });

  it('verifyCredentials should return true for correct credentials from env', () => {
    expect(verifyCredentials('admin', 'securepassword')).toBe(true);
  });

  it('verifyCredentials should return false for incorrect credentials', () => {
    expect(verifyCredentials('admin', 'wrongpass')).toBe(false);
    expect(verifyCredentials('wronguser', 'securepassword')).toBe(false);
  });

  it('isAuthenticated should return true with correct signed session cookie', () => {
    const cookies = new Map();
    const mockContext = {
        cookies: {
            set: (key: string, value: string) => cookies.set(key, { value }),
            get: (key: string) => cookies.get(key),
            delete: (key: string) => cookies.delete(key),
        },
        request: {
            url: 'http://localhost/admin',
            headers: { get: vi.fn() }
        }
    };

    // Create session
    createSession(mockContext as any);
    const sessionCookie = cookies.get('admin_session');
    expect(sessionCookie).toBeDefined();

    // Verify authentication
    const authContext = {
        cookies: {
            get: (key: string) => cookies.get(key),
        },
        request: {
            url: 'http://localhost/admin',
            headers: { get: vi.fn() }
        }
    };

    expect(isAuthenticated(authContext as any)).toBe(true);
  });

  it('isAuthenticated should return false with tampered session cookie', () => {
    const mockContext = {
        cookies: {
            get: vi.fn().mockReturnValue({ value: 'admin.invalidsignature' })
        },
        request: {
            url: 'http://localhost/admin',
            headers: { get: vi.fn() }
        }
    };
    expect(isAuthenticated(mockContext as any)).toBe(false);
  });

    it('isAuthenticated should return false with invalid session format', () => {
    const mockContext = {
        cookies: {
            get: vi.fn().mockReturnValue({ value: 'invalidformat' })
        },
        request: {
            url: 'http://localhost/admin',
            headers: { get: vi.fn() }
        }
    };
    expect(isAuthenticated(mockContext as any)).toBe(false);
  });

  it('isAuthenticated should return true with correct API key (STATS_SECRET)', () => {
    vi.stubEnv('STATS_SECRET', 'secret-api-key');
    const mockContext = {
        cookies: { get: vi.fn() },
        request: {
            url: 'http://localhost/admin?key=secret-api-key',
            headers: { get: vi.fn() }
        }
    };
    expect(isAuthenticated(mockContext as any)).toBe(true);
  });

  it('isAuthenticated should return false with incorrect API key', () => {
    vi.stubEnv('STATS_SECRET', 'secret-api-key');
    const mockContext = {
        cookies: { get: vi.fn() },
        request: {
            url: 'http://localhost/admin?key=wrong-key',
            headers: { get: vi.fn() }
        }
    };
    expect(isAuthenticated(mockContext as any)).toBe(false);
  });
});
