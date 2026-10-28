import { describe, it, expect } from 'vitest';
import config from './pricingConfig.json';
import { priceFaqAnswer, startingPrices } from './priceFacts';

describe('priceFacts', () => {
    it('nennt in der FAQ genau die Einstiegspreise des Preisrechners', () => {
        const answer = priceFaqAnswer('/#rechner');
        for (const pkg of Object.values(config.packages)) {
            expect(answer).toContain(`ab ${pkg.basePrice} €`);
        }
        expect(answer).toContain('href="/#rechner"');
    });

    it('startet beim guenstigsten Paket', () => {
        const min = Math.min(...Object.values(config.packages).map((p) => p.basePrice));
        expect(startingPrices.basis).toBe(min);
    });
});
