## 2025-03-03 - [Timing Attack in Authentication]
**Vulnerability:** Found a timing attack vulnerability in `src/lib/auth.ts` where the `STATS_SECRET` string comparison was using strict string equality (`===`).
**Learning:** Checking string equality in authentication logic character by character is susceptible to timing attacks, allowing an attacker to brute force the secret character by character by measuring execution times.
**Prevention:** Use `timingSafeEqual` from `node:crypto` with Buffers for constant-time comparisons of secrets.
