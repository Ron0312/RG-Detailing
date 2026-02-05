## 2025-05-15 - Hardcoded Web3Forms API Key
**Vulnerability:** A hardcoded `fallbackKey` for Web3Forms was found in `src/pages/api/submit-quote.ts`. This key was used if environment variables were missing.
**Learning:** Developers often add "fallbacks" for local development ease, which then get committed to production.
**Prevention:** Strictly enforce "secrets in env only" policy. Use `.env.example` for local setups and fail fast if required secrets are missing in production.

## 2026-02-05 - Log Injection in File Logging
**Vulnerability:** The API route `src/pages/api/log-404.ts` was writing user-controlled input (`url`, `userAgent`) directly to a local log file with insufficient sanitization (only stripping newlines). This could allow attackers to forge log entries or inject terminal control characters (Log Injection / Terminal Injection).
**Learning:** Even internal logging mechanisms must treat all input as untrusted. Simple newline replacement is often insufficient against more sophisticated injection or terminal exploits.
**Prevention:** Use a dedicated sanitization function (`sanitizeForLog`) that aggressively strips control characters (`\x00-\x1F`, `\x7F`) and flattens newlines/tabs before writing to any log.
