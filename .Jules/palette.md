## 2025-02-20 - Fix focus trap on hidden ScrollToTop button
**Learning:** Fixed elements hidden with only `opacity-0` remain in the tab order, creating a "focus trap" where users tab into the void. To fix this while keeping transitions, we must also toggle `pointer-events-none`, `tabindex="-1"`, and `aria-hidden="true"`.
**Action:** always check `opacity`-based visibility toggles for keyboard accessibility. Use `inert` or manual attribute toggling.
