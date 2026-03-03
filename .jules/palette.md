## 2025-02-18 - Semantic HTML for Galleries
**Learning:** Using `div`s with `onClick` for gallery thumbnails makes them inaccessible to keyboard users.
**Action:** Always use `<button type="button">` for interactive elements like image thumbnails, even if they wrap images. Reset default button styles (`p-0`, `border-0`) to maintain the design.
## 2026-03-03 - Focus-visible styles on generic interactive components
**Learning:** Found that generic UI elements (Cookie Banner, Privacy Map, Feedback Widget) were lacking proper keyboard focus indicators (`focus-visible`) and explicit `type="button"` attributes, hindering keyboard navigation accessibility.
**Action:** Always add explicit `type="button"` to standalone buttons and ensure `focus-visible:ring-2` (and associated offset classes) is applied consistently across all interactive UI components, not just main navigation or forms.
