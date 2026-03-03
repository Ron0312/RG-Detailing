## 2023-10-27 - [Scroll Event Layout Thrashing]
**Learning:** High-frequency scroll event listeners that read DOM layout properties (like `offsetWidth` or `scrollLeft`) cause severe layout thrashing (synchronous reflows) and drop frames, especially on mobile devices.
**Action:** Replace `scroll` event listeners used for pagination or scroll-spy features with `IntersectionObserver`, which evaluates element visibility asynchronously and avoids blocking the main thread.
