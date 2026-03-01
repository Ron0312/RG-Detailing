## 2025-05-23 - Canvas Animation Optimization
**Learning:** Object key iteration (`for...in`) in 60fps canvas animation loops creates unnecessary overhead compared to iterating pre-allocated arrays. Grouping entities by property (like opacity) using an array of layers is significantly more efficient than dynamic object buckets.
**Action:** Use fixed-size arrays for grouping entities in high-frequency loops instead of dynamic objects.

## 2025-05-23 - Vitest Environment Constraints
**Learning:** The `vitest` setup in this environment lacks `@testing-library/jest-dom` matchers (e.g., `toBeInTheDocument`) by default. Tests must rely on standard Chai/Jest assertions (e.g., `toBeDefined()`, `toHaveLength()`) or generic checks.
**Action:** Avoid `jest-dom` specific matchers in new tests; use standard assertions or check for existence/nullity directly.

## 2024-05-19 - [React Memoization Anti-Patterns & The Latest-Ref Pattern]
**Learning:** In React architectures (like `PriceCalculator.jsx`), attempting to optimize list renders by wrapping children in `React.memo` and the parent's handler in `useCallback` fails if the handler relies on state. Using a functional state updater (`setState(prev => ...)`) to keep the callback stable is an anti-pattern if it contains side-effects (like triggering other state changes or analytics). The side-effects execute unpredictably.
**Action:** Use the "latest-ref" pattern (`const stateRef = useRef(state); useEffect(() => { stateRef.current = state; }, [state]);`) to access current state inside a stable `useCallback([])`. This ensures child memoization works correctly without violating React's pure function requirements for state updaters.
