
// Exported for testing purposes to verify memory limits
export const hits = new Map<string, { count: number; expiry: number }>();

const MAX_HITS = 10000;

/**
 * Checks if an identifier (IP + Action) has exceeded the rate limit.
 * Implements a fixed window counter.
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
    // Memory Protection: Prevent map from growing indefinitely (DoS protection)
    if (hits.size >= MAX_HITS) {
        // Simple LRU-like eviction: Remove the oldest inserted entry
        // Map keys are iterated in insertion order
        const oldestKey = hits.keys().next().value;
        if (oldestKey) {
            hits.delete(oldestKey);
        }
    }

    hits.set(identifier, { count: 1, expiry: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count++;
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
