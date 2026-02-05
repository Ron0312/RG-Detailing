## 2024-05-22 - Accessible Focus States on Custom Cards
**Learning:** Custom interactive cards (acting as radio buttons) often lack visible focus indicators. Standard `outline` is often hidden by `overflow-hidden` or looks ugly on rounded corners.
**Action:** Always add `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2` (with appropriate color and offset color) to custom interactive elements to ensure keyboard accessibility. Also add `type="button"` and `aria-pressed` for semantics.
