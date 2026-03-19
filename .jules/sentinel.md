## 2025-03-03 - [Timing Attack in Authentication]
**Vulnerability:** Found a timing attack vulnerability in `src/lib/auth.ts` where the `STATS_SECRET` string comparison was using strict string equality (`===`).
**Learning:** Checking string equality in authentication logic character by character is susceptible to timing attacks, allowing an attacker to brute force the secret character by character by measuring execution times.
**Prevention:** Use `timingSafeEqual` from `node:crypto` with Buffers for constant-time comparisons of secrets.

## 2025-03-04 - [Hardcoded Secrets]
**Vulnerability:** The API endpoint `submit-quote.ts` contained a hardcoded fallback API key for Web3Forms.
**Learning:** Storing secrets in source code, even as "fallbacks" or public keys, is a security risk as it exposes credentials to anyone with read access to the repository, potentially leading to unauthorized API usage or data breaches.
**Prevention:** Always use environment variables for API keys and secrets, prioritizing `process.env` (runtime) and `import.meta.env` (build time).
## 2026-03-19 - [Hardcoded Admin Credentials]
**Vulnerability:** Found hardcoded admin username and password hash in `src/lib/auth.ts`.
**Learning:** Hardcoding application credentials in code exposes sensitive information to anyone with access to the source code repository. Furthermore, direct length-dependent comparison of inputs prior to hashing in `timingSafeEqual` could lead to length-leakage attacks via unhandled exceptions.
**Prevention:** Move sensitive credentials to environment variables. Apply timing-safe hashing to both sides of the comparison to ensure identical buffer lengths (e.g. 32 bytes for SHA-256) when using `crypto.timingSafeEqual` to completely eliminate timing and length leakage attacks. Implement a strict fail-closed policy in production environments if environment variables are missing.
