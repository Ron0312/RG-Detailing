## 2025-02-18 - Semantic HTML for Galleries
**Learning:** Using `div`s with `onClick` for gallery thumbnails makes them inaccessible to keyboard users.
**Action:** Always use `<button type="button">` for interactive elements like image thumbnails, even if they wrap images. Reset default button styles (`p-0`, `border-0`) to maintain the design.
## 2026-03-03 - Focus-visible styles on generic interactive components
**Learning:** Found that generic UI elements (Cookie Banner, Privacy Map, Feedback Widget) were lacking proper keyboard focus indicators (`focus-visible`) and explicit `type="button"` attributes, hindering keyboard navigation accessibility.
**Action:** Always add explicit `type="button"` to standalone buttons and ensure `focus-visible:ring-2` (and associated offset classes) is applied consistently across all interactive UI components, not just main navigation or forms.
## 2026-03-04 - Accessible Accordion Components
**Learning:** Found that the accordion component (`FAQ.jsx`) lacked proper ARIA attributes and focus styles for keyboard accessibility.
**Action:** Always use `type="button"`, `id`, `aria-controls`, and `focus-visible` classes for toggle buttons, and use `id`, `role="region"`, and `aria-labelledby` for content panels in accordion components.
## 2024-03-06 - Interactive images need button wrappers
**Learning:** In Astro/React components, images or divs that act as triggers (e.g. for a lightbox) are inaccessible to keyboard users and screen readers if they only use `onClick`.
**Action:** Always wrap interactive images in a `<button type="button">` with an appropriate `aria-label` and `focus-visible` ring classes to ensure they are focusable and announce their purpose to screen readers. Apply styling directly to the button wrapper and add `overflow-hidden` to prevent child hover transforms from breaking the button's boundary.
