import { d as defineMiddleware, s as sequence } from './chunks/index_3vuqfxzo.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_BCsP7UtC.mjs';
import 'piccolore';
import './chunks/astro/server_BFEvG0-X.mjs';
import 'clsx';

const onRequest$1 = defineMiddleware(async (context, next) => {
  const response = await next();
  if (response.headers.get("Content-Type")?.includes("text/html")) {
    response.headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
  }
  response.headers.delete("X-Powered-By");
  response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
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
  response.headers.set("Content-Security-Policy", csp.join("; "));
  return response;
});

const onRequest = sequence(

	onRequest$1

);

export { onRequest };
