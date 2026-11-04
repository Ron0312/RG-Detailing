import { describe, it, expect } from 'vitest';
import config from './pricingConfig.json';
import { priceFaqAnswer, startingPrices } from './priceFacts';
import { euro, euroNetto, PREISHINWEIS } from './priceFormat';

describe('priceFacts', () => {
    it('nennt in der FAQ genau die Einstiegspreise des Preisrechners', () => {
        const answer = priceFaqAnswer('/#rechner');
        for (const pkg of Object.values(config.packages)) {
            expect(answer).toContain(`ab ${euro(pkg.basePrice)}`);
        }
        expect(answer).toContain('href="/#rechner"');
    });

    it('kennzeichnet jeden Einstiegspreis als netto', () => {
        const answer = priceFaqAnswer('/#rechner');
        for (const pkg of Object.values(config.packages)) {
            expect(answer).toContain(`ab ${euroNetto(pkg.basePrice)}`);
        }
        expect(answer).toContain(PREISHINWEIS);
    });

    it('formatiert Beträge deutsch mit Tausenderpunkt und geschütztem Leerzeichen', () => {
        const nbsp = String.fromCodePoint(0x00a0);
        expect(euro(950)).toBe(`950${nbsp}€`);
        expect(euro(1730)).toBe(`1.730${nbsp}€`);
        expect(euroNetto(350)).toBe(`350${nbsp}€ netto`);
    });

    it('startet beim guenstigsten Paket', () => {
        const min = Math.min(...Object.values(config.packages).map((p) => p.basePrice));
        expect(startingPrices.basis).toBe(min);
    });
});
