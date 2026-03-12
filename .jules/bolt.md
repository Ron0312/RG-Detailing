## 2023-10-27 - [Scroll Event Layout Thrashing]
**Learning:** High-frequency scroll event listeners that read DOM layout properties (like `offsetWidth` or `scrollLeft`) cause severe layout thrashing (synchronous reflows) and drop frames, especially on mobile devices.
**Action:** Replace `scroll` event listeners used for pagination or scroll-spy features with `IntersectionObserver`, which evaluates element visibility asynchronously and avoids blocking the main thread.
## 2026-03-04 - [ScrollSpy DOM Thrashing]\n**Learning:** Continuously updating DOM classes via `classList.add/remove` within a scroll listener or `requestAnimationFrame` causes unnecessary layout recalculations and repaints, even if the class values haven't logically changed. This degrades mobile scrolling performance.\n**Action:** Always cache the currently active state (e.g., `lastActiveId`) and strictly wrap DOM manipulations in an `if (newState !== lastState)` condition to skip redundant writes.

## 2023-10-27 - Preventing Layout Thrashing in Scroll Listeners
**Learning:** In highly interactive components like `ScrollProgress.jsx`, reading layout properties like `scrollHeight` and `clientHeight` directly inside a `scroll` event handler forces the browser to recalculate layout (reflow), even if wrapped in `requestAnimationFrame`. This leads to significant performance degradation (layout thrashing) on scroll.
**Action:** Use a `useRef` to cache static or slow-changing dimensions. Update these cached values only during initial render, window `resize` events, or by using a `ResizeObserver` on the target element. Keep the `scroll` event handler lean by reading only the fast `scrollTop` property and pairing event listeners with `{ passive: true }`.

## 2026-03-04 - Preventing Layout Thrashing in Vanilla JS
**Learning:** High-frequency scroll event listeners that read DOM layout properties (like `document.documentElement.scrollHeight` or `window.innerHeight`) cause severe layout thrashing (synchronous reflows) and drop frames, especially on mobile devices. This is true even if the read operations are wrapped in `requestAnimationFrame`.
**Action:** In vanilla JS components (like `PageTracker.astro`), cache layout properties in variables outside the scroll handler and recalculate them only on `resize` events or using a `ResizeObserver` on the `document.body`.
