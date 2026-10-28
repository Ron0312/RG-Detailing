import { defineMiddleware } from 'astro:middleware';
import { securityHeaders } from '../security-headers.mjs';

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  // HTML Caching Strategy: Ensure users always get the latest version
  if (response.headers.get('Content-Type')?.includes('text/html')) {
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
  }

  // Security Headers (Liste in security-headers.mjs, app.js setzt sie auch fuer statische Dateien)
  response.headers.delete('X-Powered-By');
  for (const [name, value] of Object.entries(securityHeaders)) {
    response.headers.set(name, value);
  }

  return response;
});
