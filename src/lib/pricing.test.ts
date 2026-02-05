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
        // 800 * 1.4 * 1.3 = 1456
        const result = calculatePrice('full_detailing', 'large', 'bad');
        // Rounding might be involved, check logic in pricing.ts if it rounds
        // Assuming implementation does simple multiplication
        // 800 * 1.4 = 1120. 1120 * 1.3 = 1456.
        // Logic rounds to nearest 10: 1456 -> 1460
        expect(result.minPrice).toBe(1460);
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

    it('calculates 500 base price for Premium Aufbereitung (all_in_one) with small car', () => {
        // 500 * 1.0 * 1.0 = 500
        const result = calculatePrice('all_in_one', 'small', 'good');
        expect(result.minPrice).toBe(500);
    });
});
