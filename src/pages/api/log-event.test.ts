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

    it('should ignore HeadlessChrome via header', async () => {
        const req = new Request('http://localhost/api/log-event', {
            method: 'POST',
            body: JSON.stringify({ eventName: 'test_event' }),
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/145.0.0.0 Safari/537.36'
            }
        });

        const response = await POST({ request: req, clientAddress: '127.0.0.1' } as any);
        expect(response.status).toBe(200);
        const json = await response.json();
        expect(json.ignored).toBe(true);
        expect(appendFileMock).not.toHaveBeenCalled();
    });

    it('should ignore AdsBot via payload even if header is clean', async () => {
        const req = new Request('http://localhost/api/log-event', {
            method: 'POST',
            body: JSON.stringify({
                eventName: 'test_event',
                data: {
                    userAgent: 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.7559.132 Mobile Safari/537.36 (compatible; AdsBot-Google-Mobile; +http://www.google.com/mobile/adsbot.html)'
                }
            }),
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124' // Clean header
            }
        });

        const response = await POST({ request: req, clientAddress: '127.0.0.1' } as any);
        expect(response.status).toBe(200);
        const json = await response.json();
        expect(json.ignored).toBe(true);
        expect(appendFileMock).not.toHaveBeenCalled();
    });

    it('should ignore Plesk screenshot bot via payload', async () => {
        const req = new Request('http://localhost/api/log-event', {
            method: 'POST',
            body: JSON.stringify({
                eventName: 'page_view',
                data: {
                    userAgent: 'Plesk screenshot bot https://support.plesk.com/hc/en-us/articles/10301006946066'
                }
            }),
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124'
            }
        });

        const response = await POST({ request: req, clientAddress: '127.0.0.1' } as any);
        expect(response.status).toBe(200);
        const json = await response.json();
        expect(json.ignored).toBe(true);
        expect(appendFileMock).not.toHaveBeenCalled();
    });
});
