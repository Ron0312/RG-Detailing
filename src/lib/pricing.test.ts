import { describe, it, expect } from 'vitest';
import { calculatePrice } from './pricing';

describe('Price Calculator Logic', () => {
    it('calculates the base price for a small, good condition car with wash_interior package', () => {
        // 350 * 1.0 * 1.0 = 350
        const result = calculatePrice('wash_interior', 'small', 'good');
        expect(result.minPrice).toBe(350);
        // maxPrice is usually 10-20% higher depending on logic, just check it exists
        expect(result.maxPrice).toBeGreaterThan(350);
    });

    it('calculates the correct price for a complex scenario (Large SUV, Bad Condition, Full Detailing)', () => {
        // 950 * 1.4 * 1.3 = 1729 -> rounded to 1730
        // maxPrice = 1730 * 1.10 = 1903 -> rounded to 1900
        const result = calculatePrice('full_detailing', 'large', 'bad');
        expect(result.minPrice).toBe(1730);
        expect(result.maxPrice).toBe(1900);
    });

    it('returns request only for camper', () => {
        const result = calculatePrice('wash_interior', 'camper', 'good');
        expect(result.isRequestOnly).toBe(true);
        expect(result.minPrice).toBe(0);
        expect(result.maxPrice).toBe(0);
    });

    it('throws error for invalid parameters', () => {
        // @ts-ignore
        expect(() => calculatePrice('invalid', 'small', 'good')).toThrow();
    });

    it('calculates 700 base price for Premium Aufbereitung (all_in_one) with small car', () => {
        // 700 * 1.0 * 1.0 = 700
        const result = calculatePrice('all_in_one', 'small', 'good');
        expect(result.minPrice).toBe(700);
    });
});
