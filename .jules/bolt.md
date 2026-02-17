## 2024-05-23 - Canvas Batch Rendering
**Learning:** HTML5 Canvas performance is heavily impacted by the number of draw calls (e.g., `ctx.fill()`, `ctx.stroke()`) and state changes (e.g., `ctx.fillStyle`, `ctx.globalAlpha`).
**Action:** Always look for opportunities to batch similar shapes. When drawing multiple disconnected shapes (like particles) in a single path, use `ctx.moveTo()` to lift the pen between shapes to avoid connecting lines. Grouping by state (like opacity) allows setting context properties once per group.
