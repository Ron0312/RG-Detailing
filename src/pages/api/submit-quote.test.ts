import { POST } from './submit-quote';
import { describe, it, expect, vi, afterEach } from 'vitest';

describe('API submit-quote', () => {
    afterEach(() => {
        vi.restoreAllMocks();
        delete process.env.WEB3FORMS_ACCESS_KEY;
    });

    it('returns 200 for valid data', async () => {
        const req = new Request('http://localhost/api/submit-quote', {
            method: 'POST',
            body: JSON.stringify({
                email: 'test@example.com',
                size: 'small',
                condition: 'good',
                package: 'wash_interior'
            })
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
            })
        });
        const res = await POST({ request: req, clientAddress: '127.0.0.1' } as any);
        expect(res.status).toBe(400);
    });

    it('returns 429 when rate limit exceeded', async () => {
        const createRequest = () => new Request('http://localhost/api/submit-quote', {
            method: 'POST',
            body: JSON.stringify({})
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
            headers: ipHeader ? { 'x-forwarded-for': ipHeader } : {}
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
            })
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
            })
        });

        const res = await POST({ request: req, clientAddress: '127.0.0.1' } as any);
        expect(res.status).toBe(500);
        const data = await res.json();
        expect(data.error).toContain('Fehler');
    });
});
