## 2025-03-03 - [Timing Attack in Authentication]
**Vulnerability:** Found a timing attack vulnerability in `src/lib/auth.ts` where the `STATS_SECRET` string comparison was using strict string equality (`===`).
**Learning:** Checking string equality in authentication logic character by character is susceptible to timing attacks, allowing an attacker to brute force the secret character by character by measuring execution times.
**Prevention:** Use `timingSafeEqual` from `node:crypto` with Buffers for constant-time comparisons of secrets.

## 2025-03-04 - [Hardcoded Secrets]
**Vulnerability:** The API endpoint `submit-quote.ts` contained a hardcoded fallback API key for Web3Forms.
**Learning:** Storing secrets in source code, even as "fallbacks" or public keys, is a security risk as it exposes credentials to anyone with read access to the repository, potentially leading to unauthorized API usage or data breaches.
**Prevention:** Always use environment variables for API keys and secrets, prioritizing `process.env` (runtime) and `import.meta.env` (build time).## 2025-03-09 - [Hardcoded Credentials]
**Vulnerability:** The authentication module (`src/lib/auth.ts`) contained hardcoded credentials (`USERNAME` and `PASSWORD_HASH`) directly in the source code.
**Learning:** Storing secrets in source code is a critical security risk as it exposes credentials to anyone with read access to the repository, potentially leading to unauthorized access to the application. It also prevents easy credential rotation across environments.
**Prevention:** Always use environment variables to supply credentials to the application at runtime or build time, ensuring strict fallback policies (e.g. failing closed in production if not present).
