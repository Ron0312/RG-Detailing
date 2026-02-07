## 2025-02-18 - Semantic HTML for Interactive Elements
**Learning:** Found critical accessibility blocker in `GalleryLightbox.jsx` where images were clickable `div`s, preventing keyboard access.
**Action:** When auditing interactive components (galleries, sliders), always verify keyboard operability first. Refactor `div` with `onClick` to `<button type="button">` to gain native focus and key handling for free.
