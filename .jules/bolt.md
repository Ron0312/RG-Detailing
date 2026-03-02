## 2025-05-23 - Canvas Animation Optimization
**Learning:** Object key iteration (`for...in`) in 60fps canvas animation loops creates unnecessary overhead compared to iterating pre-allocated arrays. Grouping entities by property (like opacity) using an array of layers is significantly more efficient than dynamic object buckets.
**Action:** Use fixed-size arrays for grouping entities in high-frequency loops instead of dynamic objects.

## 2025-05-23 - Vitest Environment Constraints
**Learning:** The `vitest` setup in this environment lacks `@testing-library/jest-dom` matchers (e.g., `toBeInTheDocument`) by default. Tests must rely on standard Chai/Jest assertions (e.g., `toBeDefined()`, `toHaveLength()`) or generic checks.
**Action:** Avoid `jest-dom` specific matchers in new tests; use standard assertions or check for existence/nullity directly.

## 2025-02-09 - Async file system checks in backup-logs endpoint
**Learning:** Node.js synchronous fs operations (`fs.existsSync`) in the `backup-logs.ts` endpoint can stall requests during high concurrency environments, because the API routes execute in the Node.js event loop.
**Action:** Use the async alternative `await fs.promises.access(logFile, fs.constants.F_OK)` inside a `try...catch` block to avoid blocking the single thread.
