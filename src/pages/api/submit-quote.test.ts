import { POST, escapeHtml } from './submit-quote';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { hits } from '../../lib/rate-limit';

describe('API submit-quote', () => {
    afterEach(() => {
        vi.restoreAllMocks();
        delete process.env.WEB3FORMS_ACCESS_KEY;
        hits.clear();
    });

    it('escapes HTML special characters correctly', () => {
        const input = '<script>alert("XSS")</script> & \'quote\'';
        const expected = '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt; &amp; &#039;quote&#039;';
        expect(escapeHtml(input)).toBe(expected);
    });

    it('falls back to "unknown" for invalid IPs to share rate limit', async () => {
        const createRequest = (ipHeader: string) => new Request('http://localhost/api/submit-quote', {
            method: 'POST',
            body: JSON.stringify({}),
            headers: {
                'x-forwarded-for': ipHeader,
                'Content-Type': 'application/json'
            }
        });
        const clientAddress = '127.0.0.1';

        // 1. Send 10 requests with an INVALID IP "bad-ip-1"
        // This should map to "unknown"
        for (let i = 0; i < 10; i++) {
            await POST({ request: createRequest('bad-ip-1'), clientAddress } as any);
        }

        // 2. Send 11th request with DIFFERENT INVALID IP "bad-ip-2"
        // If logic is correct, this also maps to "unknown" and hits the limit (10)
        const resBlocked = await POST({ request: createRequest('bad-ip-2'), clientAddress } as any);
        expect(resBlocked.status).toBe(429);
    });

    it('returns 200 for valid data', async () => {
        global.fetch = vi.fn(() => Promise.resolve({
            json: () => Promise.resolve({ success: true }),
            ok: true
        })) as any;

        const req = new Request('http://localhost/api/submit-quote', {
            method: 'POST',
            body: JSON.stringify({
                email: 'test@example.com',
                size: 'small',
                condition: 'good',
                package: 'wash_interior'
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const res = await POST({ request: req, clientAddress: '127.0.0.1' } as any);
        expect(res.status).toBe(200);
        const data = await res.json();
        expect(data.success).toBe(true);
    });

    it('returns 400 for invalid data', async () => {
         const req = new Request('http://localhost/api/submit-quote', {
            method: 'POST',
            body: JSON.stringify({
                email: 'not-an-email',
                size: 'invalid',
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const res = await POST({ request: req, clientAddress: '127.0.0.1' } as any);
        expect(res.status).toBe(400);
    });

    it('returns 429 when rate limit exceeded', async () => {
        const createRequest = () => new Request('http://localhost/api/submit-quote', {
            method: 'POST',
            body: JSON.stringify({}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const clientAddress = '10.0.0.1';

        // Burn through limit (10)
        for (let i = 0; i < 10; i++) {
            await POST({ request: createRequest(), clientAddress } as any);
        }

        // 11th request should fail
        const res = await POST({ request: createRequest(), clientAddress } as any);
        expect(res.status).toBe(429);
    });

    it('prioritizes x-forwarded-for header for rate limiting', async () => {
        const createRequest = (ipHeader?: string) => new Request('http://localhost/api/submit-quote', {
            method: 'POST',
            body: JSON.stringify({}),
            headers: {
                ...(ipHeader ? { 'x-forwarded-for': ipHeader } : {}),
                'Content-Type': 'application/json'
            }
        });

        // This IP will be rate limited
        const forwardedIp = '203.0.113.1';
        // This IP is the direct client (e.g. proxy) and should NOT be limited
        const clientAddress = '127.0.0.1';

        // Burn through limit (10) for forwardedIp
        for (let i = 0; i < 10; i++) {
            await POST({ request: createRequest(forwardedIp), clientAddress } as any);
        }

        // 11th request from forwardedIp should fail with 429
        const resBlocked = await POST({ request: createRequest(forwardedIp), clientAddress } as any);
        expect(resBlocked.status).toBe(429);

        // Request from SAME clientAddress but DIFFERENT forwarded-for should succeed
        const resAllowed = await POST({ request: createRequest('203.0.113.2'), clientAddress } as any);
        expect(resAllowed.status).not.toBe(429);
    });

    it('returns 500 when Web3Forms API fails', async () => {
        // Set API key to trigger Web3Forms logic
        process.env.WEB3FORMS_ACCESS_KEY = 'test-key';

        // Mock fetch to return success: false
        global.fetch = vi.fn(() => Promise.resolve({
            json: () => Promise.resolve({ success: false, message: 'Invalid key' }),
            ok: true
        })) as any;

        const req = new Request('http://localhost/api/submit-quote', {
            method: 'POST',
            body: JSON.stringify({
                email: 'test@example.com',
                size: 'small',
                condition: 'good',
                package: 'wash_interior'
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const res = await POST({ request: req, clientAddress: '127.0.0.1' } as any);
        expect(res.status).toBe(500);
        const data = await res.json();
        expect(data.error).toContain('Fehler');
    });

    it('returns 500 when Web3Forms fetch throws', async () => {
        // Set API key to trigger Web3Forms logic
        process.env.WEB3FORMS_ACCESS_KEY = 'test-key';

        // Mock fetch to throw error
        global.fetch = vi.fn(() => Promise.reject(new Error('Network Error'))) as any;

        const req = new Request('http://localhost/api/submit-quote', {
            method: 'POST',
            body: JSON.stringify({
                email: 'test@example.com',
                size: 'small',
                condition: 'good',
                package: 'wash_interior'
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const res = await POST({ request: req, clientAddress: '127.0.0.1' } as any);
        expect(res.status).toBe(500);
        const data = await res.json();
        expect(data.error).toContain('Fehler');
    });

    it('does not leak sensitive details in error response', async () => {
        process.env.WEB3FORMS_ACCESS_KEY = 'test-key';
        global.fetch = vi.fn(() => Promise.reject(new Error('Sensitive Internal Error'))) as any;

        const req = new Request('http://localhost/api/submit-quote', {
            method: 'POST',
            body: JSON.stringify({
                email: 'test@example.com',
                size: 'small',
                condition: 'good',
                package: 'wash_interior'
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const res = await POST({ request: req, clientAddress: '127.0.0.1' } as any);
        const data = await res.json();

        expect(res.status).toBe(500);
        expect(data.details).toBeUndefined();
    });

    it('uses hardcoded Web3Forms key if environment variables are missing', async () => {
        delete process.env.WEB3FORMS_ACCESS_KEY;
        global.fetch = vi.fn(() => Promise.resolve({
            json: () => Promise.resolve({ success: true }),
            ok: true
        })) as any;

        const req = new Request('http://localhost/api/submit-quote', {
            method: 'POST',
            body: JSON.stringify({
                email: 'test@example.com',
                size: 'small',
                condition: 'good',
                package: 'wash_interior'
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        const res = await POST({ request: req, clientAddress: '127.0.0.1' } as any);
        expect(res.status).toBe(200);
        expect(global.fetch).toHaveBeenCalledWith(
            'https://api.web3forms.com/submit',
            expect.objectContaining({
                body: expect.stringContaining('51d8133f-baec-4504-ab1e-ea740b15dc8b')
            })
        );
    });

    // NEW SECURITY TESTS

    it('returns 413 Payload Too Large if Content-Length exceeds limit', async () => {
        const req = new Request('http://localhost/api/submit-quote', {
            method: 'POST',
            body: JSON.stringify({ email: 'test@example.com' }),
            headers: {
                'content-length': '10241', // 10KB + 1 byte
                'Content-Type': 'application/json'
            }
        });
        const res = await POST({ request: req, clientAddress: '127.0.0.1' } as any);
        expect(res.status).toBe(413);
        const data = await res.json();
        expect(data.error).toBe("Payload too large");
    });

    it('returns 400 Bad Request if email is too long', async () => {
        const longEmail = 'a'.repeat(101) + '@example.com';
        const req = new Request('http://localhost/api/submit-quote', {
            method: 'POST',
            body: JSON.stringify({
                email: longEmail,
                size: 'small',
                condition: 'good',
                package: 'wash_interior'
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const res = await POST({ request: req, clientAddress: '127.0.0.1' } as any);
        expect(res.status).toBe(400);
    });

    it('returns 415 Unsupported Media Type if Content-Type is not application/json', async () => {
        const req = new Request('http://localhost/api/submit-quote', {
            method: 'POST',
            body: JSON.stringify({
                email: 'test@example.com',
                size: 'small',
                condition: 'good',
                package: 'wash_interior'
            }),
            headers: {
                'Content-Type': 'text/plain'
            }
        });
        const res = await POST({ request: req, clientAddress: '127.0.0.1' } as any);
        expect(res.status).toBe(415);
        const data = await res.json();
        expect(data.error).toBe("Unsupported Media Type");
    });
});
