import { describe, it, expect } from 'vitest';
import config from './pricingConfig.json';
import { priceFaqAnswer, startingPrices } from './priceFacts';
import { brutto, euro, euroBrutto, euroNetto, preisText, PREISHINWEIS } from './priceFormat';

const nbsp = String.fromCodePoint(0x00a0);

describe('priceFacts', () => {
    it('nennt in der FAQ genau die Einstiegspreise des Preisrechners', () => {
        const answer = priceFaqAnswer('/#rechner');
        for (const pkg of Object.values(config.packages)) {
            expect(answer).toContain(euroNetto(pkg.basePrice));
        }
        expect(answer).toContain('href="/#rechner"');
    });

    it('nennt jeden Einstiegspreis zuerst inkl. MwSt. und dahinter netto', () => {
        const answer = priceFaqAnswer('/#rechner');
        for (const pkg of Object.values(config.packages)) {
            expect(answer).toContain(`ab ${preisText(pkg.basePrice)}`);
        }
        expect(answer).toContain(PREISHINWEIS);
    });

    it('rechnet 19 % MwSt. centgenau auf', () => {
        expect(brutto(350)).toBe(416.5);
        expect(brutto(700)).toBe(833);
        expect(brutto(770)).toBe(916.3);
        expect(brutto(1730)).toBe(2058.7);
        expect(brutto(25)).toBe(29.75);
    });

    it('formatiert Beträge deutsch mit Tausenderpunkt und geschütztem Leerzeichen', () => {
        expect(euro(950)).toBe(`950${nbsp}€`);
        expect(euro(1730)).toBe(`1.730${nbsp}€`);
        expect(euro(416.5)).toBe(`416,50${nbsp}€`);
        expect(euro(2058.7)).toBe(`2.058,70${nbsp}€`);
        expect(euroNetto(350)).toBe(`350${nbsp}€ netto`);
        expect(euroBrutto(350)).toBe(`416,50${nbsp}€ inkl. MwSt.`);
        expect(preisText(350)).toBe(`416,50${nbsp}€ inkl. MwSt. (350${nbsp}€ netto)`);
    });

    it('startet beim guenstigsten Paket', () => {
        const min = Math.min(...Object.values(config.packages).map((p) => p.basePrice));
        expect(startingPrices.basis).toBe(min);
    });
});
