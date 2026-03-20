## 2025-03-03 - [Timing Attack in Authentication]
**Vulnerability:** Found a timing attack vulnerability in `src/lib/auth.ts` where the `STATS_SECRET` string comparison was using strict string equality (`===`).
**Learning:** Checking string equality in authentication logic character by character is susceptible to timing attacks, allowing an attacker to brute force the secret character by character by measuring execution times.
**Prevention:** Use `timingSafeEqual` from `node:crypto` with Buffers for constant-time comparisons of secrets.

## 2025-03-04 - [Hardcoded Secrets]
**Vulnerability:** The API endpoint `submit-quote.ts` contained a hardcoded fallback API key for Web3Forms.
**Learning:** Storing secrets in source code, even as "fallbacks" or public keys, is a security risk as it exposes credentials to anyone with read access to the repository, potentially leading to unauthorized API usage or data breaches.
**Prevention:** Always use environment variables for API keys and secrets, prioritizing `process.env` (runtime) and `import.meta.env` (build time).
## 2026-03-20 - [Timing Attack: Length Leakage in Authentication]
**Vulnerability:** Found length-leakage timing attacks in `src/lib/auth.ts` where `timingSafeEqual` was checking buffer lengths, and early returns in username checking allowed user enumeration.
**Learning:** Using `timingSafeEqual` on variable-length inputs throws an error if lengths differ, leaking the expected length to an attacker. Returning early on an invalid username leaks whether a username exists in the system based on response time.
**Prevention:** Always hash both inputs (e.g., using SHA-256) before passing them to `timingSafeEqual` to guarantee identical buffer lengths, preventing length leakage. Avoid early returns in authentication functions to ensure constant-time execution regardless of valid/invalid inputs.
