import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getAdminSecret } from './secrets';

describe('getAdminSecret', () => {
    let consoleWarnSpy;

    beforeEach(() => {
        consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleWarnSpy.mockRestore();
    });

    it('should return the secret if STATS_SECRET is set', () => {
        const mockEnv = {
            STATS_SECRET: 'my-secret-key',
            PROD: true,
            DEV: false
        };
        expect(getAdminSecret(mockEnv)).toBe('my-secret-key');
    });

    it('should return fallback if STATS_SECRET is missing in DEV', () => {
        const mockEnv = {
            STATS_SECRET: undefined,
            PROD: false,
            DEV: true // In Astro, DEV is true if not PROD
        };
        expect(getAdminSecret(mockEnv)).toBe('RG!123');
        expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('SECURITY WARNING'));
    });

    it('should throw error if STATS_SECRET is missing in PROD', () => {
        const mockEnv = {
            STATS_SECRET: undefined,
            PROD: true,
            DEV: false
        };
        expect(() => getAdminSecret(mockEnv)).toThrowError(/CRITICAL SECURITY ERROR/);
    });

    it('should prioritize STATS_SECRET even in DEV', () => {
        const mockEnv = {
            STATS_SECRET: 'dev-secret',
            PROD: false,
            DEV: true
        };
        expect(getAdminSecret(mockEnv)).toBe('dev-secret');
        expect(consoleWarnSpy).not.toHaveBeenCalled();
    });
});
