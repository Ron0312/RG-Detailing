## 2025-02-18 - Semantic HTML for Galleries
**Learning:** Using `div`s with `onClick` for gallery thumbnails makes them inaccessible to keyboard users.
**Action:** Always use `<button type="button">` for interactive elements like image thumbnails, even if they wrap images. Reset default button styles (`p-0`, `border-0`) to maintain the design.
## 2026-03-03 - Focus-visible styles on generic interactive components
**Learning:** Found that generic UI elements (Cookie Banner, Privacy Map, Feedback Widget) were lacking proper keyboard focus indicators (`focus-visible`) and explicit `type="button"` attributes, hindering keyboard navigation accessibility.
**Action:** Always add explicit `type="button"` to standalone buttons and ensure `focus-visible:ring-2` (and associated offset classes) is applied consistently across all interactive UI components, not just main navigation or forms.
## 2026-03-04 - Accessible Accordion Components
**Learning:** Found that the accordion component (`FAQ.jsx`) lacked proper ARIA attributes and focus styles for keyboard accessibility.
**Action:** Always use `type="button"`, `id`, `aria-controls`, and `focus-visible` classes for toggle buttons, and use `id`, `role="region"`, and `aria-labelledby` for content panels in accordion components.
## 2026-03-08 - Accessible Image Thumbnails for Galleries
**Learning:** Found that using `<img>` tags directly with `onClick` handlers or wrapped in a `<div>` (e.g., in `Certificates.jsx`) makes image thumbnails inaccessible to keyboard users and screen readers. They cannot be focused or activated via keyboard.
**Action:** Always wrap interactive image thumbnails in semantic `<button type="button">` elements with an appropriate `aria-label`. Apply structural and hover styles (like borders, rounded corners, overflow, and scale) to the button itself, and ensure proper `focus-visible` styles are included for keyboard navigation.
