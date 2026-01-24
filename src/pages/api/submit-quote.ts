import type { APIRoute } from 'astro';
import { z } from 'zod';
import { calculatePrice, type PackageId, type SizeId, type ConditionId } from '../../lib/pricing';
import config from '../../lib/pricingConfig.json';
import { checkRateLimit } from '../../lib/rate-limit';

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

export const POST: APIRoute = async ({ request, clientAddress }) => {
    try {
        const ip = clientAddress || request.headers.get('x-forwarded-for') || 'unknown';
        if (!checkRateLimit(`submit-quote:${ip}`, 5, 60 * 60 * 1000)) { // 5 requests per hour
            return new Response(JSON.stringify({ error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut." }), { status: 429 });
        }

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

        // Prepare email content
        const sizeName = config.sizes[data.size]?.name || data.size;
        const conditionName = config.conditions[data.condition]?.name || data.condition;
        const packageName = config.packages[data.package]?.name || data.package;

        const subject = `Neue Preisanfrage: ${sizeName} - ${packageName}`;

        // HTML Body for the email
        const htmlContent = `
            <div style="font-family: sans-serif; color: #333;">
                <h2 style="color: #D80000;">Neue Anfrage über Preisrechner</h2>
                <p>Ein Kunde hat eine Kalkulation durchgeführt und um Kontaktaufnahme gebeten.</p>

                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />

                <h3>Kunde</h3>
                <p><strong>E-Mail:</strong> <a href="mailto:${data.email}">${data.email}</a></p>

                <h3>Fahrzeug & Zustand</h3>
                <ul>
                    <li><strong>Fahrzeuggröße:</strong> ${sizeName}</li>
                    <li><strong>Zustand:</strong> ${conditionName}</li>
                    <li><strong>Camper Länge:</strong> ${data.camperLength ? data.camperLength + 'm' : 'N/A'}</li>
                </ul>

                <h3>Gewähltes Paket</h3>
                <p><strong>${packageName}</strong></p>

                <h3>Kalkulation</h3>
                <p style="font-size: 1.2em; font-weight: bold;">
                    Geschätzter Preis: ${priceQuote.minPrice}€ - ${priceQuote.maxPrice}€
                </p>

                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                <p style="font-size: 0.8em; color: #888;">
                    Diese E-Mail wurde automatisch von rg-detailing.de gesendet via Web3Forms.
                </p>
            </div>
        `;

        // Send via Web3Forms if Key is present
        const apiKey = import.meta.env.WEB3FORMS_ACCESS_KEY;

        if (apiKey) {
            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        access_key: apiKey,
                        subject: subject,
                        email: data.email, // Reply-To address
                        from_name: "RG Detailing Rechner",
                        message: htmlContent,
                        // Additional metadata fields
                        "Fahrzeug": sizeName,
                        "Paket": packageName,
                        "Preis_Min": priceQuote.minPrice,
                        "Preis_Max": priceQuote.maxPrice
                    })
                });

                const apiResult = await response.json();

                if (apiResult.success) {
                    console.log(`>>> Email sent successfully to owner via Web3Forms (Ref: ${data.email})`);
                } else {
                    console.error(">>> Web3Forms API Error:", apiResult);
                }
            } catch (err) {
                console.error(">>> Failed to send email via Web3Forms:", err);
            }
        } else {
            console.log(">>> [MOCK EMAIL] WEB3FORMS_ACCESS_KEY missing. Printing to console:");
            console.log(`To: owner@rg-detailing.de | Subject: ${subject}`);
            console.log(`Data: ${JSON.stringify(data)}`);
        }

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
