## 2024-05-22 - Rate Limit Memory Exhaustion
**Vulnerability:** In-memory rate limiting map lacked a maximum size cap, allowing attackers to cause OOM crashes by flooding with unique identifiers.
**Learning:** Simple Map-based caches in long-running processes are DoS vectors if unbounded.
**Prevention:** Always enforce a `MAX_SIZE` on in-memory caches and use eviction policies (FIFO/LRU).

## 2024-05-22 - XSS in Transactional Emails
**Vulnerability:** User input was interpolated directly into HTML email bodies, creating a potential XSS vector if input validation was bypassed or insufficient.
**Learning:** Even with strict validation (Zod), Defense in Depth requires output encoding/escaping when generating HTML content.
**Prevention:** Always escape user-controlled data before inserting it into HTML templates, regardless of upstream validation.

## 2024-05-22 - Rate Limit Key Bloating
**Vulnerability:** Unbounded string length in rate limit keys (from `X-Forwarded-For`) could allow memory exhaustion via large payloads.
**Learning:** Untrusted input used as map keys must be validated for length and format to prevent resource exhaustion attacks.
**Prevention:** Validate and sanitize identifiers (like IPs) before using them as keys in internal data structures.

## 2026-02-16 - PII Leakage in 404 Logs
**Vulnerability:** The 404 logging endpoint logged the full URL including query parameters, which could expose sensitive tokens or PII (e.g. `?token=...`, `?email=...`).
**Learning:** Logging `window.location.href` or request URLs directly is a common PII leak source, as developers often forget that sensitive data can be passed in query params.
**Prevention:** Always parse and sanitize URLs before logging. Strip query parameters or redact sensitive keys, especially in error or access logs.

## 2026-02-18 - Uncontrolled Log File Growth
**Vulnerability:** The 404 logging endpoint (`/api/log-404`) appended logs to a local file indefinitely without checking size limits, leading to potential disk exhaustion (DoS).
**Learning:** Appending to files in a long-running server environment requires strict resource management (rotation/limits) to prevent DoS.
**Prevention:** Always implement log rotation or size checks before writing to local files, or use a managed logging service.
