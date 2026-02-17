## 2025-05-23 - Canvas Animation Optimization
**Learning:** Object key iteration (`for...in`) in 60fps canvas animation loops creates unnecessary overhead compared to iterating pre-allocated arrays. Grouping entities by property (like opacity) using an array of layers is significantly more efficient than dynamic object buckets.
**Action:** Use fixed-size arrays for grouping entities in high-frequency loops instead of dynamic objects.
