/**
 * Retrieves the admin secret (STATS_SECRET) from environment variables.
 *
 * @returns {string} The admin secret.
 * @throws {Error} If STATS_SECRET is not set in production.
 */
export function getAdminSecret(): string {
    const secret = import.meta.env.STATS_SECRET;

    if (secret) {
        return secret;
    }

    if (import.meta.env.DEV) {
        console.warn("⚠️  [SECURITY WARNING] STATS_SECRET is not set. Using default 'RG!123' for development.");
        return 'RG!123';
    }

    // CRITICAL: In production, do NOT fallback to a hardcoded secret.
    console.error("🚨 [CRITICAL SECURITY ERROR] STATS_SECRET is missing in production environment!");
    throw new Error("Server Configuration Error: STATS_SECRET is missing.");
}
