## 2025-03-03 - [Timing Attack in Authentication]
**Vulnerability:** Found a timing attack vulnerability in `src/lib/auth.ts` where the `STATS_SECRET` string comparison was using strict string equality (`===`).
**Learning:** Checking string equality in authentication logic character by character is susceptible to timing attacks, allowing an attacker to brute force the secret character by character by measuring execution times.
**Prevention:** Use `timingSafeEqual` from `node:crypto` with Buffers for constant-time comparisons of secrets.

## 2025-03-04 - [Hardcoded Secrets]
**Vulnerability:** The API endpoint `submit-quote.ts` contained a hardcoded fallback API key for Web3Forms.
**Learning:** Storing secrets in source code, even as "fallbacks" or public keys, is a security risk as it exposes credentials to anyone with read access to the repository, potentially leading to unauthorized API usage or data breaches.
**Prevention:** Always use environment variables for API keys and secrets, prioritizing `process.env` (runtime) and `import.meta.env` (build time).
## 2025-03-15 - [Hardcoded Credentials in Auth]
**Vulnerability:** The admin authentication logic in `src/lib/auth.ts` used a hardcoded username and password hash (`const USERNAME = 'Ronni'`, `const PASSWORD_HASH = '61840eb1a5c8ab075562dfb1839f5f5a454a2a482af67438fe7cdaf9f41336ba'`).
**Learning:** Hardcoding credentials, even if hashed, exposes administrative access to anyone who can read the source code. It also prevents easy credential rotation and environment-specific logins.
**Prevention:** Use environment variables (like `ADMIN_USERNAME` and `ADMIN_PASSWORD`) to provide credentials at build or runtime. Ensure secure fail-closed behavior if credentials are missing in production environments.
