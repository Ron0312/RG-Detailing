## 2025-05-20 - [Hardcoded Admin Secret]
**Vulnerability:** A hardcoded administrative password (`RG!123`) was used as a fallback in `src/pages/admin/stats.astro` and API routes if the `STATS_SECRET` environment variable was missing.
**Learning:** Fallback secrets intended for development can inadvertently become production vulnerabilities if not strictly guarded by environment checks (e.g., `import.meta.env.PROD`).
**Prevention:** Centralized secret management in `src/lib/secrets.ts` that enforces "Fail Closed" logic in production (throwing an error if the secret is missing) and "Fail Open" (with warning) only in development.

## 2025-05-21 - [Hardcoded Admin Credentials]
**Vulnerability:** The administrative username and password hash were hardcoded in `src/lib/auth.ts`, exposing the application to unauthorized access if the source code is leaked.
**Learning:** Hardcoding credentials, even as hashed values, creates a persistent vulnerability that is difficult to rotate without code changes.
**Prevention:** Credentials should be loaded from environment variables (`ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`), allowing for secure configuration and rotation without redeployment.
