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

## 2025-03-05 - Carousel Navigation Accessibility
**Learning:** Mobile pagination dots are often implemented as static `div`s, making them inaccessible to keyboard users and screen readers. Converting them to `<button>` elements with `aria-label` and `aria-current="step"` (instead of `role="tab"` for simple cases) provides a much better experience. `aria-current` is particularly useful for indicating the active item in a set of related elements like carousel slides or wizard steps.
**Action:** Always check if visual indicators like dots or steps are interactive. If they control navigation, they must be buttons with appropriate labels and state indicators.

## 2025-03-07 - Visible Focus on Sticky Elements
**Learning:** Sticky or fixed-position buttons (like "Scroll to Top" or "WhatsApp") often have their default focus rings clipped or removed to "clean up" the design. This makes them invisible to keyboard users.
**Action:** Always add explicit `focus-visible:ring` styles to fixed elements. Ensure the ring has high contrast against the background and doesn't get cut off by `overflow: hidden` containers.

## 2025-03-08 - Mobile Menu Focus Loop
**Learning:** Opening a mobile menu without managing focus leaves keyboard users stranded in the main content or tabbing through hidden elements. The critical UX detail is not just moving focus *into* the menu (to the Close button), but crucially returning it *back* to the toggle button when closed.
**Action:** Always pair `aria-expanded` toggles with `element.focus()` calls: focus Close button on open, focus Toggle button on close.
