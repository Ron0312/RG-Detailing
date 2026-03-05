## 2025-03-03 - [Timing Attack in Authentication]
**Vulnerability:** Found a timing attack vulnerability in `src/lib/auth.ts` where the `STATS_SECRET` string comparison was using strict string equality (`===`).
**Learning:** Checking string equality in authentication logic character by character is susceptible to timing attacks, allowing an attacker to brute force the secret character by character by measuring execution times.
**Prevention:** Use `timingSafeEqual` from `node:crypto` with Buffers for constant-time comparisons of secrets.

## 2025-03-04 - [Hardcoded Secrets]
**Vulnerability:** The API endpoint `submit-quote.ts` contained a hardcoded fallback API key for Web3Forms.
**Learning:** Storing secrets in source code, even as "fallbacks" or public keys, is a security risk as it exposes credentials to anyone with read access to the repository, potentially leading to unauthorized API usage or data breaches.
**Prevention:** Always use environment variables for API keys and secrets, prioritizing `process.env` (runtime) and `import.meta.env` (build time).## 2025-02-28 - Removed Hardcoded Credentials in Authentication Library
**Vulnerability:** The authentication system (`src/lib/auth.ts`) contained hardcoded credentials (`USERNAME = 'Ronni'` and `PASSWORD_HASH`). Additionally, `SESSION_SECRET` was dynamically created at runtime (`randomBytes(32)`), causing sessions to drop on every server restart.
**Learning:** Hardcoded credentials within the application core bypass environmental security isolation and make configuration rigid. The runtime secret generation, while seemingly secure, leads to poor UX by invalidating active administrative sessions constantly. Using raw buffer length comparisons without constant-time equality checks could also introduce timing attacks during password validation.
**Prevention:** Always externalize credentials and session secrets to environment variables (`ADMIN_USERNAME`, `ADMIN_PASSWORD`, `SESSION_SECRET`). Use `crypto.timingSafeEqual` with explicitly imported `node:buffer` for secure secret comparisons, and ensure a "fail-closed" default in production (rejecting authentication if secrets are missing) rather than relying on weak hardcoded fallbacks.
