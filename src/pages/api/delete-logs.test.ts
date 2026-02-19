import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './delete-logs';

// Mock fs
const unlinkMock = vi.fn().mockResolvedValue(undefined);

vi.mock('node:fs/promises', () => ({
    default: {
        unlink: (...args: any[]) => unlinkMock(...args),
    }
}));

describe('POST /api/delete-logs', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should require authentication', async () => {
        const req = new Request('http://localhost/api/delete-logs', { method: 'POST' });
        const response = await POST({ request: req, url: new URL(req.url) } as any);
        expect(response.status).toBe(401);
    });

    it('should delete logs if authenticated', async () => {
        const req = new Request('http://localhost/api/delete-logs?key=RG!123', { method: 'POST' });
        const response = await POST({ request: req, url: new URL(req.url) } as any);
        expect(response.status).toBe(200);

        // Should attempt to delete both log files
        expect(unlinkMock).toHaveBeenCalledTimes(2);
    });
});
