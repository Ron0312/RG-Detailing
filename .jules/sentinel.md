## 2025-03-03 - [Timing Attack in Authentication]
**Vulnerability:** Found a timing attack vulnerability in `src/lib/auth.ts` where the `STATS_SECRET` string comparison was using strict string equality (`===`).
**Learning:** Checking string equality in authentication logic character by character is susceptible to timing attacks, allowing an attacker to brute force the secret character by character by measuring execution times.
**Prevention:** Use `timingSafeEqual` from `node:crypto` with Buffers for constant-time comparisons of secrets.

## 2025-03-04 - [Hardcoded Secrets]
**Vulnerability:** The API endpoint `submit-quote.ts` contained a hardcoded fallback API key for Web3Forms.
**Learning:** Storing secrets in source code, even as "fallbacks" or public keys, is a security risk as it exposes credentials to anyone with read access to the repository, potentially leading to unauthorized API usage or data breaches.
**Prevention:** Always use environment variables for API keys and secrets, prioritizing `process.env` (runtime) and `import.meta.env` (build time).

## 2025-02-14 - Fix Hardcoded Admin Credentials and Prevent Timing Attacks
**Vulnerability:** Hardcoded admin username ("Ronni") and SHA-256 password hash in `src/lib/auth.ts`.
**Learning:** Hardcoded credentials even if hashed are insecure, especially since the hash could be brute-forced or the code exposed. In addition, secrets were compared using `===`, which is vulnerable to timing attacks. Relying on default credentials in production should be strictly prohibited (fail-closed policy).
**Prevention:** Always use environment variables for sensitive credentials (`ADMIN_USERNAME` and `ADMIN_PASSWORD`). Default credentials ('admin'/'password') should ONLY be allowed if `import.meta.env.DEV` is true. Compare hashed secrets using `crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b))` to prevent timing attacks.
