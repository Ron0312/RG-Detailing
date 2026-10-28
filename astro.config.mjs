// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://rg-detailing.de',
  output: 'server',
  build: {
    inlineStylesheets: 'always',
  },
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: node({
    mode: 'standalone'
  }),
  trailingSlash: 'always',
  redirects: {
    '/datenschutzerklaerung-eu': '/datenschutz/',
    '/cookie-richtlinie-eu': '/datenschutz/',
    // Legacy WordPress URLs. Sie ranken weiterhin und bekommen Klicks,
    // liefen aber bis 2026-07 in einen 404.
    '/preisrechner': '/',
    '/preisrechner-2': '/',
    '/referenzen': '/galerie/',
    '/haftungsausschluss': '/impressum/',
    // Alte Doppelseiten der Stadtseiten. Der Canonical allein reichte nicht:
    // Google zeigte sie 10/2026 weiter auf Position 20 bis 26 an.
    '/autoaufbereitung-neumuenster': '/fahrzeugaufbereitung-neumuenster/',
    '/autoaufbereitung-bad-segeberg': '/fahrzeugaufbereitung-bad-segeberg/'
  },
  security: {
    checkOrigin: true
  }
});
