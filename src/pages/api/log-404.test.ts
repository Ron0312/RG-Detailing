import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './log-404';

// Mock fs.appendFile
const appendFileMock = vi.fn().mockResolvedValue(undefined);
const mkdirMock = vi.fn().mockResolvedValue(undefined);

vi.mock('node:fs/promises', () => ({
  default: {
    appendFile: (...args: any[]) => appendFileMock(...args),
    mkdir: (...args: any[]) => mkdirMock(...args),
  },
}));

describe('POST /api/log-404 Security Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Reset rate limit for tests - handled by using unique IPs or mocking rate-limit
        // Since rate-limit is stateful in-memory, we might hit it.
        // We can mock the rate-limit module too.
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

        expect(appendFileMock).toHaveBeenCalled();
        const loggedContent = appendFileMock.mock.calls[0][1];

        // Check that ANSI codes are NOT present
        expect(loggedContent).not.toContain('\x1b[31m');
        expect(loggedContent).toContain('/fooBAD'); // Should verify what remains
    });
});
