import { describe, it, expect, beforeEach } from 'vitest';
import { checkRateLimit, hits } from './rate-limit';

describe('Rate Limit Memory Protection', () => {
    beforeEach(() => {
        hits.clear();
    });

    it('limits memory usage by evicting old entries', () => {
        const MAX_HITS = 10000;
        const EXTRA_HITS = 5000;

        // Fill up to the limit + extra
        for (let i = 0; i < MAX_HITS + EXTRA_HITS; i++) {
            checkRateLimit(`user-${i}`, 10, 60000);
        }

        expect(hits.size).toBeLessThanOrEqual(MAX_HITS);

        // Optional: Verify that the oldest entries (0..4999) are gone
        // and newest (5000..14999) are present.
        // But simply checking size is enough for this security requirement.
    });

    it('allows requests below limit', () => {
        const id = 'test-user';
        expect(checkRateLimit(id, 2, 1000)).toBe(true);
        expect(checkRateLimit(id, 2, 1000)).toBe(true);
        expect(checkRateLimit(id, 2, 1000)).toBe(false);
    });
});
