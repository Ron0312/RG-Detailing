
# AGENTS.md

This file provides context and instructions for AI agents working on the **RG Detailing** project.

## 🎨 Design & Corporate Identity (CI)

**CRITICAL: The corporate identity color is RED.**

*   **Primary Accent:** `red-500` to `red-700` (Tailwind CSS).
*   **Backgrounds:** `zinc-900` to `black`. Glassmorphism effects often use `bg-zinc-900/50` or `bg-black/50` with `backdrop-blur`.
*   **Forbidden Colors:** Do **NOT** use arbitrary page-specific accent colors like Blue, Cyan, Purple, Orange, etc. for main UI elements (buttons, icons, headings).
*   **Exceptions:**
    *   **Green:** Allowed for "Success" states, Checkmarks, Cost Savings (`text-green-500`), and WhatsApp buttons (`bg-green-600`).
    *   **Brand Colors:** Allowed for specific external brand logos (e.g., Pink for Instagram, specific Red for YouTube).

**Design Consistency:**
*   **Subpages:** Must follow the homepage aesthetic: Full-screen Hero images with gradient overlays, `glass-panel` cards, `ScrollReveal` animations, and no breadcrumbs.
*   **Icons:** Use `lucide-react`. Ensure `className` (not `class`) is used in `.astro` files when rendering React components.

## 🛠️ Tech Stack & Environment

*   **Framework:** Astro
*   **UI Library:** React (for interactive components like Swipers, Calculators)
*   **Styling:** Tailwind CSS
*   **Testing:** Vitest (Unit), Playwright (E2E/Verification)

## ⚠️ Important Instructions

1.  **React in Astro:** When using React components in `.astro` files, remember to pass `client:visible` (or `client:load`, etc.) if interaction is needed.
2.  **Linting:** Use `npx astro check` to verify types and syntax. `pnpm lint` is not available.
3.  **Verification:** Always verify frontend changes visually using a temporary Playwright script before submitting.
4.  **Security:** Validate API inputs (Zod) and prevent PII leakage in logs.
