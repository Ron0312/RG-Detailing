// Gemeinsame Sicherheitsheader fuer src/middleware.ts (SSR-Seiten) und app.js
// (alle Antworten, auch vorgerenderte Seiten und Assets, die der Node-Adapter
// an der Middleware vorbei ausliefert).

const csp = [
  "default-src 'self'",
  // analytics.rg-detailing.de: selbst gehostetes Umami (Tracker-Skript und Events)
  "script-src 'self' 'unsafe-inline' https://analytics.rg-detailing.de https://www.google.com https://www.gstatic.com https://maps.googleapis.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://rg-detailing.de https://*.rg-detailing.de https://maps.gstatic.com https://maps.googleapis.com https://*.googleusercontent.com",
  "font-src 'self' data:",
  "connect-src 'self' https://analytics.rg-detailing.de https://maps.googleapis.com",
  "frame-src 'self' https://www.google.com https://maps.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests"
];

export const securityHeaders = {
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': csp.join('; ')
};
