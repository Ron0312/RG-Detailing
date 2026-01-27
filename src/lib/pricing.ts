import config from './pricingConfig.json';

export type PackageId = keyof typeof config.packages;
export type SizeId = keyof typeof config.sizes;
export type ConditionId = keyof typeof config.conditions;

interface SizeConfig {
    name: string;
    multiplier: number | null;
    isRequestOnly?: boolean;
}

interface ConditionConfig {
    name: string;
    multiplier: number;
}

interface PackageConfig {
    name: string;
    basePrice: number;
    description: string;
    badge?: string;
    highlight?: boolean;
    hasClubAbo?: boolean;
}

export interface PriceQuote {
    minPrice: number;
    maxPrice: number;
    packageId: PackageId;
    sizeId: SizeId;
    conditionId: ConditionId;
    isRequestOnly: boolean;
}

export function calculatePrice(
    packageId: PackageId,
    sizeId: SizeId,
    conditionId: ConditionId
): PriceQuote {
    // Basic validation
    if (!config.packages[packageId] || !config.sizes[sizeId] || !config.conditions[conditionId]) {
         throw new Error("Invalid selection parameters");
    }

    const pkg = config.packages[packageId] as PackageConfig;
    const size = config.sizes[sizeId] as SizeConfig;
    const cond = config.conditions[conditionId] as ConditionConfig;

    // Check for "Request Only" logic (e.g. Camper)
    if (size.isRequestOnly) {
        return {
            minPrice: 0,
            maxPrice: 0,
            packageId,
            sizeId,
            conditionId,
            isRequestOnly: true
        };
    }

    const sizeMult = size.multiplier as number;
    const condMult = cond.multiplier as number;

    const calculatedBase = pkg.basePrice * sizeMult * condMult;

    // Round to nearest 10
    const minPrice = Math.round(calculatedBase / 10) * 10;

    // Create range +15%
    const maxPrice = Math.round((minPrice * 1.15) / 10) * 10;

    return {
        minPrice,
        maxPrice,
        packageId,
        sizeId,
        conditionId,
        isRequestOnly: false
    };
}
