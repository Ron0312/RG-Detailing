import config from './pricingConfig.json';

export type PackageId = keyof typeof config.packages;
export type SizeId = keyof typeof config.sizes;
export type ConditionId = keyof typeof config.conditions;

export interface PriceQuote {
    minPrice: number;
    maxPrice: number;
    packageId: PackageId;
    sizeId: SizeId;
    conditionId: ConditionId;
}

export function calculatePrice(
    packageId: PackageId,
    sizeId: SizeId,
    conditionId: ConditionId
): PriceQuote {
    if (!config.packages[packageId] || !config.sizes[sizeId] || !config.conditions[conditionId]) {
        throw new Error("Invalid selection parameters");
    }

    const pkg = config.packages[packageId];
    const sizeMult = config.sizes[sizeId];
    const condMult = config.conditions[conditionId];

    const calculatedBase = pkg.basePrice * sizeMult * condMult;

    // Round to nearest 10 for cleaner numbers
    const minPrice = Math.round(calculatedBase / 10) * 10;

    // Create a realistic range (e.g., +15-20% buffer for unseen variables)
    const maxPrice = Math.round((minPrice * 1.15) / 10) * 10;

    return {
        minPrice,
        maxPrice,
        packageId,
        sizeId,
        conditionId
    };
}
