import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  // Security Headers
  response.headers.delete('X-Powered-By');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com https://maps.googleapis.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https://rg-detailing.de https://*.rg-detailing.de https://maps.gstatic.com https://maps.googleapis.com https://*.googleusercontent.com",
    "font-src 'self' data:",
    "connect-src 'self' https://maps.googleapis.com",
    "frame-src 'self' https://www.google.com https://maps.google.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "upgrade-insecure-requests"
  ];

  response.headers.set('Content-Security-Policy', csp.join('; '));

  return response;
});
