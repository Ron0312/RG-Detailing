// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://rg-detailing.de',
  output: 'static',
  outDir: './dist/client', // Force build output to match Plesk document root
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
});
