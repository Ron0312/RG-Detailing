import { describe, it, expect, vi, afterEach } from 'vitest';
import { POST } from './log-404';
import * as fs from 'node:fs/promises';

// Mock fs.appendFile to be slow
vi.mock('node:fs/promises', async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    default: {
      ...actual.default,
      mkdir: vi.fn().mockResolvedValue(undefined),
      appendFile: vi.fn().mockImplementation(async () => {
        await new Promise(resolve => setTimeout(resolve, 100)); // 100ms delay
      }),
    },
  };
});

describe('POST /api/log-404 performance', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should measure response time with slow fs', async () => {
        const req = new Request('http://localhost/api/log-404', {
            method: 'POST',
            body: JSON.stringify({ url: '/foo', referrer: '', userAgent: 'test' }),
            headers: { 'Content-Type': 'application/json' }
        });

        const start = performance.now();
        // Use a unique IP to avoid potential rate limit collisions
        const response = await POST({ request: req, clientAddress: '127.0.0.99' } as any);
        const end = performance.now();

        const duration = end - start;
        console.log(`[Perf] Request Duration: ${duration.toFixed(2)}ms`);

        expect(response.status).toBe(200);
        // We return the duration so we can assert on it in the next step,
        // or just rely on console log for manual verification.
        // For the baseline, we expect it to be slow.
    });
});
