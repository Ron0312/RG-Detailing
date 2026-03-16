## 2025-03-03 - [Timing Attack in Authentication]
**Vulnerability:** Found a timing attack vulnerability in `src/lib/auth.ts` where the `STATS_SECRET` string comparison was using strict string equality (`===`).
**Learning:** Checking string equality in authentication logic character by character is susceptible to timing attacks, allowing an attacker to brute force the secret character by character by measuring execution times.
**Prevention:** Use `timingSafeEqual` from `node:crypto` with Buffers for constant-time comparisons of secrets.

## 2025-03-04 - [Hardcoded Secrets]
**Vulnerability:** The API endpoint `submit-quote.ts` contained a hardcoded fallback API key for Web3Forms.
**Learning:** Storing secrets in source code, even as "fallbacks" or public keys, is a security risk as it exposes credentials to anyone with read access to the repository, potentially leading to unauthorized API usage or data breaches.
**Prevention:** Always use environment variables for API keys and secrets, prioritizing `process.env` (runtime) and `import.meta.env` (build time).## 2024-05-24 - Remove Hardcoded Admin Credentials
**Vulnerability:** The admin username and password hash were hardcoded directly in `src/lib/auth.ts`.
**Learning:** Hardcoding credentials in source code exposes them to anyone with access to the repository, leading to unauthorized access.
**Prevention:** Use environment variables (`ADMIN_USERNAME` and `ADMIN_PASSWORD`) to inject sensitive configuration at runtime or build-time. Implement robust fail-closed fallbacks for production environments to deny access if credentials are inadvertently missing.
