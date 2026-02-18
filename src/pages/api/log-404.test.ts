import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './log-404';

// Mock fs methods
const appendFileMock = vi.fn().mockResolvedValue(undefined);
const mkdirMock = vi.fn().mockResolvedValue(undefined);
const statMock = vi.fn().mockResolvedValue({ size: 100 });
const renameMock = vi.fn().mockResolvedValue(undefined);

vi.mock('node:fs/promises', () => ({
  default: {
    appendFile: (...args: any[]) => appendFileMock(...args),
    mkdir: (...args: any[]) => mkdirMock(...args),
    stat: (...args: any[]) => statMock(...args),
    rename: (...args: any[]) => renameMock(...args),
  },
}));

// Mock rate-limit
const checkRateLimitMock = vi.hoisted(() => vi.fn().mockReturnValue(true));
vi.mock('../../lib/rate-limit', () => ({
  checkRateLimit: checkRateLimitMock,
}));

const flushPromises = () => new Promise(resolve => setTimeout(resolve, 10));

describe('POST /api/log-404 Security Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        checkRateLimitMock.mockReturnValue(true);
        // Default small size
        statMock.mockResolvedValue({ size: 100 });
    });

    it('should use "unknown" as rate limit key when IP is invalid/bloated', async () => {
        const hugeIp = 'A'.repeat(1000); // Invalid IP, potential DoS vector
        const req = new Request('http://localhost/api/log-404', {
            method: 'POST',
            body: JSON.stringify({ url: '/foo' }),
            headers: {
                'Content-Type': 'application/json',
                'X-Forwarded-For': hugeIp
            }
        });

        await POST({ request: req, clientAddress: '127.0.0.1' } as any);

        // Should call checkRateLimit with sanitized key, NOT the huge IP
        expect(checkRateLimitMock).toHaveBeenCalledWith(
            expect.stringContaining('log-404:unknown'),
            expect.any(Number),
            expect.any(Number)
        );
        // Ensure it was NOT called with the huge IP
        expect(checkRateLimitMock).not.toHaveBeenCalledWith(
            expect.stringContaining(hugeIp),
            expect.any(Number),
            expect.any(Number)
        );
    });

    it('should reject non-JSON Content-Type', async () => {
        const req = new Request('http://localhost/api/log-404', {
            method: 'POST',
            body: JSON.stringify({ url: '/foo' }),
            headers: { 'Content-Type': 'text/plain' }
        });

        const response = await POST({ request: req, clientAddress: '127.0.0.1' } as any);
        // Current behavior: 200 (Vulnerable)
        // Desired behavior: 415
        expect(response.status).toBe(415);
    });

    it('should reject large payloads (Content-Length > 5KB)', async () => {
        const req = new Request('http://localhost/api/log-404', {
            method: 'POST',
            body: JSON.stringify({ url: '/foo' }),
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': '6000'
            }
        });

        const response = await POST({ request: req, clientAddress: '127.0.0.2' } as any);
        // Current behavior: 200 (Vulnerable)
        // Desired behavior: 413
        expect(response.status).toBe(413);
    });

    it('should sanitize ANSI control characters from logs', async () => {
        const maliciousUrl = '/foo\x1b[31mBAD\x1b[0m';
        const req = new Request('http://localhost/api/log-404', {
            method: 'POST',
            body: JSON.stringify({ url: maliciousUrl, referrer: '', userAgent: 'test' }),
            headers: { 'Content-Type': 'application/json' }
        });

        const response = await POST({ request: req, clientAddress: '127.0.0.3' } as any);
        expect(response.status).toBe(200);

        await flushPromises();

        expect(appendFileMock).toHaveBeenCalled();
        const loggedContent = appendFileMock.mock.calls[0][1];

        // Check that ANSI codes are NOT present
        expect(loggedContent).not.toContain('\x1b[31m');
        expect(loggedContent).toContain('/fooBAD'); // Should verify what remains
    });

    it('should redact query parameters to prevent PII leakage', async () => {
        const sensitiveUrl = 'https://rg-detailing.de/reset-password?token=VERY_SECRET_TOKEN&email=user@example.com';
        const req = new Request('http://localhost/api/log-404', {
            method: 'POST',
            body: JSON.stringify({ url: sensitiveUrl, referrer: '', userAgent: 'test' }),
            headers: { 'Content-Type': 'application/json' }
        });

        // Use a unique client address to avoid rate limiting issues
        const response = await POST({ request: req, clientAddress: '127.0.0.100' } as any);
        expect(response.status).toBe(200);

        await flushPromises();

        expect(appendFileMock).toHaveBeenCalled();
        const loggedContent = appendFileMock.mock.lastCall?.[1] || '';

        // Should NOT contain the token or email
        expect(loggedContent).not.toContain('VERY_SECRET_TOKEN');
        expect(loggedContent).not.toContain('user@example.com');
        // Should contain the path
        expect(loggedContent).toContain('/reset-password');
    });

    it('should rotate log file if it exceeds 5MB', async () => {
        // Setup: Mock file size to be 6MB
        statMock.mockResolvedValueOnce({ size: 6 * 1024 * 1024 });

        const req = new Request('http://localhost/api/log-404', {
            method: 'POST',
            body: JSON.stringify({ url: '/foo', referrer: '', userAgent: 'test' }),
            headers: { 'Content-Type': 'application/json' }
        });

        const response = await POST({ request: req, clientAddress: '127.0.0.50' } as any);
        expect(response.status).toBe(200);

        await flushPromises();

        // Verify that rename was called
        expect(renameMock).toHaveBeenCalled();
        const renameArgs = renameMock.mock.calls[0];
        expect(renameArgs[0]).toContain('404.log');
        expect(renameArgs[1]).toContain('404.log.old');
    });

    it('should NOT rotate log file if it is small', async () => {
        // Setup: Mock file size to be 1MB
        statMock.mockResolvedValueOnce({ size: 1 * 1024 * 1024 });

        const req = new Request('http://localhost/api/log-404', {
            method: 'POST',
            body: JSON.stringify({ url: '/foo', referrer: '', userAgent: 'test' }),
            headers: { 'Content-Type': 'application/json' }
        });

        const response = await POST({ request: req, clientAddress: '127.0.0.51' } as any);
        expect(response.status).toBe(200);

        await flushPromises();

        // Verify that rename was NOT called
        expect(renameMock).not.toHaveBeenCalled();
    });
});
