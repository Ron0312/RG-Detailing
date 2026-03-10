## 2025-03-03 - [Timing Attack in Authentication]
**Vulnerability:** Found a timing attack vulnerability in `src/lib/auth.ts` where the `STATS_SECRET` string comparison was using strict string equality (`===`).
**Learning:** Checking string equality in authentication logic character by character is susceptible to timing attacks, allowing an attacker to brute force the secret character by character by measuring execution times.
**Prevention:** Use `timingSafeEqual` from `node:crypto` with Buffers for constant-time comparisons of secrets.

## 2025-03-04 - [Hardcoded Secrets]
**Vulnerability:** The API endpoint `submit-quote.ts` contained a hardcoded fallback API key for Web3Forms.
**Learning:** Storing secrets in source code, even as "fallbacks" or public keys, is a security risk as it exposes credentials to anyone with read access to the repository, potentially leading to unauthorized API usage or data breaches.
**Prevention:** Always use environment variables for API keys and secrets, prioritizing `process.env` (runtime) and `import.meta.env` (build time).
## 2025-02-17 - Hardcoded Admin Credentials
**Vulnerability:** The admin username and password hash were hardcoded directly into `src/lib/auth.ts`, creating a critical risk where source code access equals full admin access.
**Learning:** Hardcoding credentials, even if hashed, exposes them to anyone who can view the repository or final bundle. A secure fallback for development is useful but should be restricted only to development mode via `import.meta.env.DEV` to avoid deploying default credentials. Furthermore, `crypto.timingSafeEqual` prevents timing attacks when comparing password hashes.
**Prevention:** Use environment variables for all sensitive configuration (like `ADMIN_USERNAME` and `ADMIN_PASSWORD`) and implement strict fail-closed policies in production when secrets are missing.
