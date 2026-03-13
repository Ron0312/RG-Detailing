## 2025-02-18 - Semantic HTML for Galleries
**Learning:** Using `div`s with `onClick` for gallery thumbnails makes them inaccessible to keyboard users.
**Action:** Always use `<button type="button">` for interactive elements like image thumbnails, even if they wrap images. Reset default button styles (`p-0`, `border-0`) to maintain the design.
## 2026-03-03 - Focus-visible styles on generic interactive components
**Learning:** Found that generic UI elements (Cookie Banner, Privacy Map, Feedback Widget) were lacking proper keyboard focus indicators (`focus-visible`) and explicit `type="button"` attributes, hindering keyboard navigation accessibility.
**Action:** Always add explicit `type="button"` to standalone buttons and ensure `focus-visible:ring-2` (and associated offset classes) is applied consistently across all interactive UI components, not just main navigation or forms.
## 2026-03-04 - Accessible Accordion Components
**Learning:** Found that the accordion component (`FAQ.jsx`) lacked proper ARIA attributes and focus styles for keyboard accessibility.
**Action:** Always use `type="button"`, `id`, `aria-controls`, and `focus-visible` classes for toggle buttons, and use `id`, `role="region"`, and `aria-labelledby` for content panels in accordion components.
## 2025-03-09 - Added aria-valuetext to BeforeAfterSlider
**Learning:** Adding custom screen-reader-only (`sr-only`) text to explain standard keyboard interactions (like using arrow keys on a `role="slider"`) is an accessibility anti-pattern. Screen readers natively announce how to interact with standard ARIA roles. However, `aria-valuetext` is extremely useful alongside `aria-valuenow` to explicitly communicate the semantic meaning of the slider number to screen readers (e.g., explaining that "50" means "50% Vorher sichtbar").
**Action:** Use `aria-valuetext` to give semantic context to numbers in sliders, but avoid redundantly explaining basic keyboard controls for standard ARIA roles like `slider`.

## 2026-03-13 - Explicit type="button" on standalone generic buttons
**Learning:** Found multiple instances of interactive elements (e.g., pagination dots, category filters, mobile hamburger menus, scroll-to-top buttons) lacking the `type="button"` attribute. Without it, buttons inside forms default to `submit`, and even outside forms, explicit types are a crucial best practice for robust semantic HTML.
**Action:** Always add explicit `type="button"` to standalone generic buttons across all components to prevent accidental form submissions and ensure semantic correctness.
