
/**
 * Retrieves the STATS_SECRET for the admin panel.
 *
 * SECURITY:
 * - In Production: FAILS CLOSED. If STATS_SECRET is not set, it throws an error.
 * - In Development: FAILS OPEN (with warning). If STATS_SECRET is not set, it uses a default key 'RG!123'.
 *
 * @param env - Optional environment object for testing (defaults to import.meta.env)
 */
export function getAdminSecret(env: any = import.meta.env): string {
    const secret = env.STATS_SECRET;

    if (secret) {
        return secret;
    }

    if (env.PROD) {
        throw new Error("CRITICAL SECURITY ERROR: STATS_SECRET environment variable is not set in production. Admin access is disabled.");
    }

    // In Development, use fallback but warn
    console.warn("SECURITY WARNING: STATS_SECRET is not set. Using default 'RG!123' for development only.");
    return 'RG!123';
}
