import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './log-event';

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

describe('POST /api/log-event', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        checkRateLimitMock.mockReturnValue(true);
        statMock.mockResolvedValue({ size: 100 });
    });

    it('should log a valid event', async () => {
        const req = new Request('http://localhost/api/log-event', {
            method: 'POST',
            body: JSON.stringify({ eventName: 'test_event', url: '/home', sessionId: 'sess_123' }),
            headers: { 'Content-Type': 'application/json' }
        });

        const response = await POST({ request: req, clientAddress: '127.0.0.1' } as any);
        expect(response.status).toBe(200);

        await flushPromises();

        expect(appendFileMock).toHaveBeenCalled();
        const content = JSON.parse(appendFileMock.mock.calls[0][1].trim());
        expect(content.event).toBe('test_event');
        expect(content.url).toBe('/home');
        expect(content.sessionId).toBe('sess_123');
        expect(content.timestamp).toBeDefined();
    });

    it('should reject non-JSON content type', async () => {
        const req = new Request('http://localhost/api/log-event', {
            method: 'POST',
            body: JSON.stringify({ eventName: 'test' }),
            headers: { 'Content-Type': 'text/plain' }
        });

        const response = await POST({ request: req, clientAddress: '127.0.0.1' } as any);
        expect(response.status).toBe(415);
    });

    it('should reject invalid schema (missing eventName)', async () => {
        const req = new Request('http://localhost/api/log-event', {
            method: 'POST',
            body: JSON.stringify({ url: '/home' }),
            headers: { 'Content-Type': 'application/json' }
        });

        const response = await POST({ request: req, clientAddress: '127.0.0.1' } as any);
        expect(response.status).toBe(400);
    });

    it('should sanitize URL (remove query params)', async () => {
        const req = new Request('http://localhost/api/log-event', {
            method: 'POST',
            body: JSON.stringify({ eventName: 'test', url: 'https://site.com/page?token=secret' }),
            headers: { 'Content-Type': 'application/json' }
        });

        const response = await POST({ request: req, clientAddress: '127.0.0.1' } as any);
        expect(response.status).toBe(200);

        await flushPromises();

        const content = JSON.parse(appendFileMock.mock.calls[0][1].trim());
        expect(content.url).toBe('https://site.com/page');
        expect(content.url).not.toContain('secret');
    });

    it('should rotate log file if > 5MB', async () => {
        statMock.mockResolvedValueOnce({ size: 6 * 1024 * 1024 });

        const req = new Request('http://localhost/api/log-event', {
            method: 'POST',
            body: JSON.stringify({ eventName: 'test' }),
            headers: { 'Content-Type': 'application/json' }
        });

        await POST({ request: req, clientAddress: '127.0.0.1' } as any);
        await flushPromises();

        expect(renameMock).toHaveBeenCalled();
    });
});
