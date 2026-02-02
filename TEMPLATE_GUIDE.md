# Website Template Guide

This project is designed as a modular template that can be adapted for any business (Lawyer, Doctor, Handyman, etc.) in minutes.

## 1. Quick Start (The "Brain")

The entire configuration lives in **`src/config/site.ts`**. This is the first place you should check.

### What you can change here:
*   **Company Info:** Name, Slogan, Address, Phone, Email.
*   **Links:** Social Media, Map Links.
*   **Navigation:** Menu items for Header and Footer.
*   **Features:** Toggle specific sections on/off (e.g., `enableParticles`, `showCalculator`).

**Example:**
```typescript
export const siteConfig = {
  company: {
    name: "Dr. Med. Mustermann",
    slogan: "Ihre Hausarztpraxis",
    // ...
  },
  features: {
    enableParticles: false, // Turn off for serious business
    showCalculator: false,  // Turn off if not needed
  }
}
```

## 2. Design System (The "Skin")

Colors are not hardcoded. They are defined as **Semantic Variables** in **`src/styles/global.css`**.

### How to change the Color Scheme:
1.  Open `src/styles/global.css`.
2.  Find the `@theme` block.
3.  Change the Hex codes for the `--color-primary-*` variables.

**Example (Blue Theme for Lawyer):**
```css
/* src/styles/global.css */
@theme {
  /* ... */
  /* Change the Brand Red to Blue */
  --color-primary-500: #0000FF;
  /* It is recommended to generate a full palette (50-950) for best results. */
  /* Tools like https://uicolors.app/create can help generate these values. */
}
```
All buttons, highlights, and accents will instantly reflect your new color choice.

## 3. Logos & Images

*   **Logo:** The logo path is configured in `src/config/site.ts` (default: `/logo.png`). Replace the file in the `public/` folder or update the config to point to a new file.
*   **Favicon:** Replace `public/favicon.png`.
*   **Hero Image:** Currently located at `src/assets/hero-workshop.jpg`. You can replace this file or update the import in `src/pages/index.astro`.

## 4. Content & Layout

The main landing page is **`src/pages/index.astro`**.
It is built using modular sections.

*   **To remove a section:** Delete the component import or wrap it in a feature flag in `siteConfig`.
*   **To change text:** Most headlines are currently in `src/pages/index.astro`. You can edit them there.
*   **Services:** Edit `src/data/services.ts`.
*   **Reviews:** Edit `src/data/reviews.json`.

## 5. Deployment

Build the project:
```bash
npm run build
```
The output will be in `dist/`.
