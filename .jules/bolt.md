
## 2026-02-03 - [Component Extraction in React]
**Learning:** Defining components inside the render function (or main component body) causes them to be recreated on every render, forcing unnecessary unmounts and remounts of the entire subtree.
**Action:** Always define helper components at the module level or in separate files, passing necessary data via props.
