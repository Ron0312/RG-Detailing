import { test, expect } from '@playwright/test';

test('verify dampfreinigung images', async ({ page }) => {
  await page.goto('http://localhost:4321/dampfreinigung');

  // Check background image presence (indirectly via screenshot or just checking elements)
  // The background logo is an img with src including dampfdrachen-logo
  // Wait, I changed it to <Image /> which generates /_astro/...

  // Check for the "Integrated Logo in Background"
  const bgLogo = page.locator('img[alt="Dampfdrachen Hintergrund"]');
  await expect(bgLogo).toBeVisible();

  // Check for the "Dampfdrachen im Einsatz" image
  const remoImage = page.locator('img[alt="Dampfreinigung Innenraum RG Detailing"]');
  await expect(remoImage).toBeVisible();

  // Check for the Partner Logo
  const partnerLogo = page.locator('img[alt="Dampfdrachen Logo"]');
  await expect(partnerLogo).toBeVisible();

  await page.screenshot({ path: 'verification/dampfreinigung_images.png', fullPage: true });
});

test('verify index background', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    // Check for the background div with style attribute
    // <div class="..." style={{ backgroundImage: `url(${optimizedAfter.src})` }}></div>
    // It is inside the Media & Insights section

    // We can look for the "Transparenz schafft Vertrauen" section container's children
    // The youtube teaser has the background.

    const youtubeTeaser = page.locator('a[href*="youtube.com"] >> div[style*="background-image"]');
    await expect(youtubeTeaser).toBeVisible();

    await page.screenshot({ path: 'verification/index_background.png' });
});
