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
3.  Change the `--color-primary-*` values.

**Example (Blue Theme for Lawyer):**
```css
/* src/styles/global.css */
@theme {
  /* ... */
  --color-primary-500: #0000FF; /* Change Red to Blue */
  /* Update other shades accordingly */
}
```
All buttons, highlights, and accents will instantly turn blue.

## 3. Logos & Images

*   **Logo:** Replace `public/logo.png`. The site automatically uses this file.
*   **Favicon:** Replace `public/favicon.png`.
*   **Hero Image:** Replace `src/assets/hero-workshop.jpg` (or update the import in `src/pages/index.astro`).

## 4. Content & Layout

The main landing page is **`src/pages/index.astro`**.
It is built using modular sections.

*   **To remove a section:** Delete the component or wrap it in a feature flag in `siteConfig`.
*   **To change text:** Most headlines are currently in `src/pages/index.astro`. You can edit them there.
*   **Services:** Edit `src/data/services.ts`.
*   **Reviews:** Edit `src/data/reviews.json` (or `reviews.ts`).

## 5. Deployment

Build the project:
```bash
npm run build
```
The output will be in `dist/`.
