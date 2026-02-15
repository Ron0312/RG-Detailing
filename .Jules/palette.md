## 2025-02-20 - Fix focus trap on hidden ScrollToTop button
**Learning:** Fixed elements hidden with only `opacity-0` remain in the tab order, creating a "focus trap" where users tab into the void. To fix this while keeping transitions, we must also toggle `pointer-events-none`, `tabindex="-1"`, and `aria-hidden="true"`.
**Action:** always check `opacity`-based visibility toggles for keyboard accessibility. Use `inert` or manual attribute toggling.

## 2025-02-21 - Invalid Nested Button Interaction
**Learning:** Found a common anti-pattern where a semantic `<button>` was nested inside a clickable `div` (with `onClick`). This breaks keyboard navigation for the wrapper. The fix involved converting the wrapper to a `<button>` and the inner "button" to a styled `div`. Crucially, `group-hover` and `group-focus-visible` were needed on the inner `div` to maintain the expected visual feedback loop when focusing the parent.
**Action:** When refactoring "Card as a Link/Button", always verify the inner content model. Replace inner interactive elements with non-interactive, styled counterparts to ensure valid HTML and predictable focus behavior.

## 2025-02-24 - Focus Management in Wizards
**Learning:** When wizard steps replace each other in the DOM, keyboard focus is often lost to the `<body>`, forcing users to tab through the entire page again. This is disorienting.
**Action:** Implement `useRef` to manage focus on step changes. programmatically focus the new step's title (using `tabIndex="-1"` and `ref.focus({ preventScroll: true })`) to preserve context and efficient navigation.

## 2025-02-26 - Managing Off-Screen Focus with inert
**Learning:** CSS transforms like `translate-y` do not remove elements from the tab order, creating focus traps where users can tab into invisible content. The `inert` attribute is a perfect solution as it makes the element non-interactive and hides it from the accessibility tree without needing to manage `tabindex` on all children.
**Action:** When animating elements off-screen without `display: none` or `visibility: hidden`, always apply the `inert` attribute (and `aria-hidden="true"`) to prevent focus traps.
