import config from './pricingConfig.json';

// Einstiegspreise direkt aus dem Preisrechner, damit FAQ, Schema und llms.txt
// nie von den Rechnerpreisen abweichen.
const p = config.packages;

export const startingPrices = {
    basis: p.wash_interior.basePrice,
    leasing: p.leasing.basePrice,
    premium: p.all_in_one.basePrice,
    highEnd: p.full_detailing.basePrice,
};

const pct = (factor: number) => Math.round((factor - 1) * 100);
export const sizeMarkupText =
    `Limousine und Kombi liegen etwa ${pct(config.sizes.medium.multiplier)} % darüber, ` +
    `SUV und Bus etwa ${pct(config.sizes.large.multiplier)} %.`;

export const priceFaqAnswer = (rechnerHref: string): string =>
    `Der Preis hängt von Fahrzeuggröße und Zustand ab. Richtwerte für einen Kleinwagen in gutem Zustand: ` +
    `Basis-Aufbereitung (Innenraum-Tiefenreinigung und Außenwäsche) ab ${startingPrices.basis} €, ` +
    `Leasing-Rückgabe ab ${startingPrices.leasing} €, ` +
    `Premium-Aufbereitung mit Politur und Versiegelung ab ${startingPrices.premium} €, ` +
    `High-End Detailing mit Lackkorrektur und Keramikversiegelung ab ${startingPrices.highEnd} €. ` +
    `${sizeMarkupText} ` +
    `Ihren Preis zeigt der <a href="${rechnerHref}" class="text-red-500 hover:underline">Preisrechner</a> in drei Klicks.`;
