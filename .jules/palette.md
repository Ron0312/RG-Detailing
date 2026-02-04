## 2024-05-23 - Testing React Components in Vitest
**Learning:** `vitest` runs in Node environment by default. React component tests needing DOM require `// @vitest-environment jsdom` at the top of the file. Also, `jest-dom` matchers (like `toBeInTheDocument`, `toHaveAttribute`) are not globally available; use standard `expect` with DOM properties (e.g., `getAttribute`).
**Action:** Always add the environment comment and use standard assertions for new component tests unless config is updated.
