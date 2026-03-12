## 2025-03-03 - [Timing Attack in Authentication]
**Vulnerability:** Found a timing attack vulnerability in `src/lib/auth.ts` where the `STATS_SECRET` string comparison was using strict string equality (`===`).
**Learning:** Checking string equality in authentication logic character by character is susceptible to timing attacks, allowing an attacker to brute force the secret character by character by measuring execution times.
**Prevention:** Use `timingSafeEqual` from `node:crypto` with Buffers for constant-time comparisons of secrets.

## 2025-03-04 - [Hardcoded Secrets]
**Vulnerability:** The API endpoint `submit-quote.ts` contained a hardcoded fallback API key for Web3Forms.
**Learning:** Storing secrets in source code, even as "fallbacks" or public keys, is a security risk as it exposes credentials to anyone with read access to the repository, potentially leading to unauthorized API usage or data breaches.
**Prevention:** Always use environment variables for API keys and secrets, prioritizing `process.env` (runtime) and `import.meta.env` (build time).
## 2026-03-12 - [Hardcoded Admin Credentials]
**Vulnerability:** The authentication logic in `src/lib/auth.ts` contained a hardcoded admin username and password hash.
**Learning:** Hardcoding credentials, even if hashed, in the source code allows anyone with access to the repository to potentially compromise the system. The hash could be cracked or the codebase could accidentally be leaked.
**Prevention:** Use environment variables (e.g., `ADMIN_USERNAME` and `ADMIN_PASSWORD`) to securely inject credentials across environments and utilize fallback defaults solely for development (`isDev`).
