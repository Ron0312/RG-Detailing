## 2025-05-15 - Hardcoded Web3Forms API Key
**Vulnerability:** A hardcoded `fallbackKey` for Web3Forms was found in `src/pages/api/submit-quote.ts`. This key was used if environment variables were missing.
**Learning:** Developers often add "fallbacks" for local development ease, which then get committed to production.
**Prevention:** Strictly enforce "secrets in env only" policy. Use `.env.example` for local setups and fail fast if required secrets are missing in production.
