## 2025-03-03 - [Timing Attack in Authentication]
**Vulnerability:** Found a timing attack vulnerability in `src/lib/auth.ts` where the `STATS_SECRET` string comparison was using strict string equality (`===`).
**Learning:** Checking string equality in authentication logic character by character is susceptible to timing attacks, allowing an attacker to brute force the secret character by character by measuring execution times.
**Prevention:** Use `timingSafeEqual` from `node:crypto` with Buffers for constant-time comparisons of secrets.

## 2025-03-04 - [Hardcoded Secrets]
**Vulnerability:** The API endpoint `submit-quote.ts` contained a hardcoded fallback API key for Web3Forms.
**Learning:** Storing secrets in source code, even as "fallbacks" or public keys, is a security risk as it exposes credentials to anyone with read access to the repository, potentially leading to unauthorized API usage or data breaches.
**Prevention:** Always use environment variables for API keys and secrets, prioritizing `process.env` (runtime) and `import.meta.env` (build time).
## 2025-03-05 - [XSS via dangerouslySetInnerHTML]
**Vulnerability:** Found `dangerouslySetInnerHTML` being used in `src/components/FAQ.jsx` without prior HTML sanitization, allowing potential Cross-Site Scripting (XSS) if the input (`item.answer`) is controlled by or can be influenced by users.
**Learning:** React's built-in protections against XSS do not apply when using `dangerouslySetInnerHTML`. Relying on it without sanitizing inputs exposes the application to severe XSS risks, even if the current data appears static, since the data source might change in the future.
**Prevention:** Always sanitize any HTML before passing it to `dangerouslySetInnerHTML`. Use established sanitization libraries like `DOMPurify` (or `isomorphic-dompurify` for SSR/Astro context) to strip malicious scripts and payloads.
