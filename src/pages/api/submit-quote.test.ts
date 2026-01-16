import { POST } from './submit-quote';
import { describe, it, expect } from 'vitest';

describe('API submit-quote', () => {
    it('returns 200 for valid data', async () => {
        const req = new Request('http://localhost/api/submit-quote', {
            method: 'POST',
            body: JSON.stringify({
                email: 'test@example.com',
                size: 'small',
                condition: 'new',
                package: 'basic'
            })
        });
        const res = await POST({ request: req } as any);
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
        const res = await POST({ request: req } as any);
        expect(res.status).toBe(400);
    });
});
