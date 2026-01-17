import type { APIRoute } from 'astro';
import { z } from 'zod';
import { calculatePrice, type PackageId, type SizeId, type ConditionId } from '../../lib/pricing';
import config from '../../lib/pricingConfig.json';

const PackageEnum = z.enum(Object.keys(config.packages) as [string, ...string[]]);
const SizeEnum = z.enum(Object.keys(config.sizes) as [string, ...string[]]);
const ConditionEnum = z.enum(Object.keys(config.conditions) as [string, ...string[]]);

const QuoteSchema = z.object({
    email: z.string().email(),
    package: PackageEnum,
    size: SizeEnum,
    condition: ConditionEnum,
    camperLength: z.number().optional()
});

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();

        // Validate input
        const result = QuoteSchema.safeParse({
            email: body.email,
            package: body.package, // client sends 'package', 'size', 'condition'
            size: body.size,
            condition: body.condition,
            camperLength: body.camperLength
        });

        if (!result.success) {
            return new Response(JSON.stringify({
                error: "Invalid data",
                details: result.error.format()
            }), { status: 400 });
        }

        const data = result.data;

        // Recalculate price server-side
        const priceQuote = calculatePrice(
            data.package as PackageId,
            data.size as SizeId,
            data.condition as ConditionId
        );

        // MOCK EMAIL SENDING LOGIC
        console.log(">>> [MOCK EMAIL] To: owner@rg-detailing.de");
        console.log(`>>> Subject: Neue Anfrage von ${data.email}`);
        let bodyText = `Fahrzeug ${data.size}, Zustand ${data.condition}, Paket ${data.package}.`;

        if (data.size === 'camper' && data.camperLength) {
            bodyText += ` Länge: ${data.camperLength}m. (Kunde hat Camper-Flow genutzt).`;
        }

        bodyText += ` Preis-Range: ${priceQuote.minPrice}-${priceQuote.maxPrice}€`;

        console.log(`>>> Body: ${bodyText}`);

        console.log(">>> [MOCK EMAIL] To: " + data.email);
        console.log(`>>> Subject: Ihre Anfrage bei RG Detailing`);
        console.log(`>>> Body: Danke! Ihre Anfrage ist eingegangen. Wir melden uns.`);

        return new Response(JSON.stringify({
            success: true,
            message: "Quote received",
            quote: priceQuote
        }), { status: 200 });

    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
    }
}
