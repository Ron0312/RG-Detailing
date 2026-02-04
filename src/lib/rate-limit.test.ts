import { describe, it, expect, vi, beforeEach } from 'vitest';
import { checkRateLimit, hits } from './rate-limit';

describe('Rate Limit', () => {
    beforeEach(() => {
        if (hits) hits.clear();
        vi.useRealTimers();
    });

    it('allows requests under the limit', () => {
        const id = 'user1';
        expect(checkRateLimit(id, 2, 1000)).toBe(true);
        expect(checkRateLimit(id, 2, 1000)).toBe(true);
    });

    it('blocks requests over the limit', () => {
        const id = 'user2';
        expect(checkRateLimit(id, 1, 1000)).toBe(true);
        expect(checkRateLimit(id, 1, 1000)).toBe(false);
    });

    it('resets after window expires', () => {
        vi.useFakeTimers();
        const id = 'user3';
        expect(checkRateLimit(id, 1, 1000)).toBe(true);
        expect(checkRateLimit(id, 1, 1000)).toBe(false);

        vi.advanceTimersByTime(1001);
        expect(checkRateLimit(id, 1, 1000)).toBe(true);
    });

    it('enforces max hits size (memory protection)', () => {
        const MAX_HITS = 10000;
        // Fill the map up to the limit + 100
        for (let i = 0; i < MAX_HITS + 100; i++) {
            checkRateLimit(`attacker_${i}`, 10, 60000);
        }

        expect(hits.size).toBeLessThanOrEqual(MAX_HITS);

        // Verify LRU behavior: The first inserted key should be gone
        expect(hits.has('attacker_0')).toBe(false);
        // The last inserted key should be present
        expect(hits.has(`attacker_${MAX_HITS + 99}`)).toBe(true);
    });
});
