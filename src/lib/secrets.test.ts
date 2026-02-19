import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getAdminSecret } from './secrets';

describe('getAdminSecret', () => {
    // We need to store the original implementation to restore it later
    // However, import.meta.env is tricky to mock directly in ESM.
    // We will rely on vi.stubEnv if available, or just modify the object if it's mutable in the test env.

    const originalEnv = process.env;

    beforeEach(() => {
        vi.resetModules();
        // In this environment, we might be able to rely on process.env or just mock the module behavior if we extracted env access.
        // But since we access import.meta.env directly, we have to try to stub it.
    });

    it('returns STATS_SECRET if set', () => {
        // Since we can't easily mock import.meta.env in a compiled test without a bundler transform,
        // we might have to rely on the fact that we can't easily change import.meta.env.
        // BUT, we can use vi.mock to mock the whole module if we re-import it.

        // Let's try a different approach: modifying the property if allowed.
        // @ts-ignore
        import.meta.env.STATS_SECRET = 'secure-secret';
        expect(getAdminSecret()).toBe('secure-secret');
    });

    it('returns default RG!123 in DEV if STATS_SECRET is missing', () => {
        // @ts-ignore
        import.meta.env.STATS_SECRET = '';
        // @ts-ignore
        import.meta.env.DEV = true;

        const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

        expect(getAdminSecret()).toBe('RG!123');
        expect(consoleSpy).toHaveBeenCalled();
    });

    it('throws error in PROD if STATS_SECRET is missing', () => {
        // @ts-ignore
        import.meta.env.STATS_SECRET = '';
        // @ts-ignore
        import.meta.env.DEV = false;

        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        expect(() => getAdminSecret()).toThrow("Server Configuration Error: STATS_SECRET is missing.");
        expect(consoleSpy).toHaveBeenCalled();
    });
});
