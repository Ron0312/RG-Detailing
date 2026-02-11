
export const hits = new Map<string, { count: number; expiry: number }>();
const MAX_HITS = 10000;

/**
 * Checks if an identifier (IP + Action) has exceeded the rate limit.
 * Implements a fixed window counter with memory protection and LRU eviction.
 *
 * @param identifier Unique key (e.g., "127.0.0.1:submit-quote")
 * @param limit Max requests allowed in the window
 * @param windowMs Time window in milliseconds
 * @returns true if allowed, false if limit exceeded
 */
export function checkRateLimit(identifier: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const record = hits.get(identifier);

  // If no record or expired, reset
  if (!record || now > record.expiry) {
    // If it was an expired record, remove it first so we can re-insert at the end (LRU)
    // and to ensure size check is accurate.
    if (record) {
        hits.delete(identifier);
    }

    // Memory protection: Evict oldest entry (LRU) if limit reached
    if (hits.size >= MAX_HITS) {
      const oldestKey = hits.keys().next().value;
      if (oldestKey !== undefined) {
        hits.delete(oldestKey);
      }
    }
    hits.set(identifier, { count: 1, expiry: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  // Update record and move to end of Map (LRU)
  hits.delete(identifier);
  record.count++;
  hits.set(identifier, record);

  return true;
}

// Periodic cleanup of expired entries to prevent memory leaks
// Only runs if the environment supports intervals (Node.js/Browser)
if (typeof setInterval !== 'undefined') {
    // Run every 5 minutes
    setInterval(() => {
        const now = Date.now();
        for (const [key, record] of hits) {
            if (now > record.expiry) {
                hits.delete(key);
            }
        }
    }, 5 * 60 * 1000).unref?.(); // .unref() if available to not hold process open
}
