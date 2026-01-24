import { POST } from './submit-quote';
import { describe, it, expect } from 'vitest';

describe('API submit-quote', () => {
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

        // Burn through limit (5)
        for (let i = 0; i < 5; i++) {
            await POST({ request: createRequest(), clientAddress } as any);
        }

        // 6th request should fail
        const res = await POST({ request: createRequest(), clientAddress } as any);
        expect(res.status).toBe(429);
    });
});
