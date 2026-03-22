## 2024-05-24 - Accessible Toggle Button in ExpandableText
**Learning:** React expandable components without explicit ARIA associations fail to communicate to screen readers which section of content is changing state.
**Action:** Use `React.useId()` to generate unique IDs for content containers and associate them with the toggle button using `aria-controls`. Ensure buttons include `type="button"` and `focus-visible` utility classes for keyboard accessibility.
