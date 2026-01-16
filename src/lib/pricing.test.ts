import { describe, it, expect } from 'vitest';
import { calculatePrice } from './pricing';

describe('Price Calculator Logic', () => {
    it('calculates the base price for a small, new car with basic package', () => {
        // 150 * 1.0 * 1.0 = 150
        const result = calculatePrice('basic', 'small', 'new');
        expect(result.minPrice).toBe(150);
        expect(result.maxPrice).toBeGreaterThan(150);
    });

    it('calculates the correct price for a complex scenario (Large SUV, Bad Condition, High End)', () => {
        // 400 * 1.5 * 1.5 = 900
        const result = calculatePrice('high-end', 'large', 'bad');
        expect(result.minPrice).toBe(900);
    });

    it('throws error for invalid parameters', () => {
        // @ts-ignore
        expect(() => calculatePrice('invalid', 'small', 'new')).toThrow();
    });
});
