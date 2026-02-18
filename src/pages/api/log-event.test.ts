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

    it('should log a valid event with calculated dailyHash', async () => {
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
        expect(content.dailyHash).toBeDefined(); // Check if hash is generated
        expect(content.dailyHash).toHaveLength(16);
    });

    it('should parse browser and OS from userAgent', async () => {
        const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
        const req = new Request('http://localhost/api/log-event', {
            method: 'POST',
            body: JSON.stringify({
                eventName: 'page_view',
                url: '/home',
                data: { userAgent: ua }
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        await POST({ request: req, clientAddress: '127.0.0.1' } as any);
        await flushPromises();

        const content = JSON.parse(appendFileMock.mock.calls[0][1].trim());
        expect(content.browser).toBe('Chrome');
        expect(content.os).toBe('Windows');
    });

    it('should accept visitorId if provided', async () => {
        const req = new Request('http://localhost/api/log-event', {
            method: 'POST',
            body: JSON.stringify({
                eventName: 'page_view',
                visitorId: 'vis_abc123'
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        await POST({ request: req, clientAddress: '127.0.0.1' } as any);
        await flushPromises();

        const content = JSON.parse(appendFileMock.mock.calls[0][1].trim());
        expect(content.visitorId).toBe('vis_abc123');
    });
});
