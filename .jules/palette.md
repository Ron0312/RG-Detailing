## 2024-05-24 - Accessible Toggle Button in ExpandableText
**Learning:** React expandable components without explicit ARIA associations fail to communicate to screen readers which section of content is changing state.
**Action:** Use `React.useId()` to generate unique IDs for content containers and associate them with the toggle button using `aria-controls`. Ensure buttons include `type="button"` and `focus-visible` utility classes for keyboard accessibility.

## 2024-06-25 - Consistent Keyboard Navigation in Global Header
**Learning:** Global navigation elements (like logo links, desktop nav, and mobile menu items) often lack clear visual focus indicators on dark backgrounds due to browser defaults.
**Action:** Explicitly apply `focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950` to all interactive elements in global navigation components (`Header.astro`) to ensure a clear, accessible focus ring that contrasts well against the dark layout.
