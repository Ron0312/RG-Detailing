import type { APIRoute } from 'astro';
import { z } from 'zod';
import fs from 'node:fs/promises';
import path from 'node:path';
import { calculatePrice, type PackageId, type SizeId, type ConditionId } from '../../lib/pricing';
import config from '../../lib/pricingConfig.json';
import { checkRateLimit } from '../../lib/rate-limit';

const PackageEnum = z.enum(Object.keys(config.packages) as [string, ...string[]]);
const SizeEnum = z.enum(Object.keys(config.sizes) as [string, ...string[]]);
const ConditionEnum = z.enum(Object.keys(config.conditions) as [string, ...string[]]);

const QuoteSchema = z.object({
    email: z.string().email().max(100),
    package: PackageEnum,
    size: SizeEnum,
    condition: ConditionEnum,
    camperLength: z.number().optional(),
    botcheck: z.boolean().optional()
});

export const escapeHtml = (unsafe: string): string => {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

const maskEmail = (email: string): string => {
    const parts = email.split('@');
    if (parts.length !== 2) return '***';
    const [name, domain] = parts;
    return `${name.substring(0, 3)}***@${domain}`;
};

export const POST: APIRoute = async ({ request, clientAddress }) => {
    try {
        const rawIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || clientAddress || 'unknown';
        // Validate IP to prevent key bloating / memory exhaustion
        const ip = z.string().ip().safeParse(rawIp).success ? rawIp : 'unknown';

        if (!checkRateLimit(`submit-quote:${ip}`, 10, 60 * 60 * 1000)) { // 10 requests per hour
            return new Response(JSON.stringify({ error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut." }), { status: 429 });
        }

        // Check Content-Type to prevent CSRF via Simple Requests (text/plain, etc.)
        const contentType = request.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
            return new Response(JSON.stringify({ error: "Unsupported Media Type" }), { status: 415 });
        }

        // Check Content-Length to prevent large payloads (DoS protection)
        const contentLength = request.headers.get('content-length');
        if (contentLength && parseInt(contentLength) > 10240) { // 10KB limit
            return new Response(JSON.stringify({ error: "Payload too large" }), { status: 413 });
        }

        let body;
        try {
            body = await request.json();
        } catch (e) {
            return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
        }

        // Validate input
        const result = QuoteSchema.safeParse({
            email: body.email,
            package: body.package, // client sends 'package', 'size', 'condition'
            size: body.size,
            condition: body.condition,
            camperLength: body.camperLength,
            botcheck: body.botcheck
        });

        if (!result.success) {
            return new Response(JSON.stringify({
                error: "Invalid data",
                details: result.error.format()
            }), { status: 400 });
        }

        const data = result.data;

        // Honeypot check: If botcheck is true, it's a bot.
        if (data.botcheck) {
            // Return fake success to mislead bot
            return new Response(JSON.stringify({
                success: true,
                message: "Anfrage erhalten"
            }), { status: 200 });
        }

        // Recalculate price server-side
        const priceQuote = calculatePrice(
            data.package as PackageId,
            data.size as SizeId,
            data.condition as ConditionId
        );

        // Log to local file (Fail-safe)
        try {
            const logDir = path.join(process.cwd(), 'logs');
            await fs.mkdir(logDir, { recursive: true });

            const logEntry = {
                timestamp: new Date().toISOString(),
                ip,
                ...data,
                quote: priceQuote
            };

            await fs.appendFile(
                path.join(logDir, 'quotes.jsonl'),
                JSON.stringify(logEntry) + '\n',
                'utf-8'
            );
            console.log(`>>> Quote logged locally for ${maskEmail(data.email)}`);
        } catch (logError) {
            console.error(">>> Failed to log quote locally:", logError);
            // Continue execution to try sending email
        }

        // Prepare email content
        const sizeName = config.sizes[data.size as keyof typeof config.sizes]?.name || data.size;
        const conditionName = config.conditions[data.condition as keyof typeof config.conditions]?.name || data.condition;
        const packageName = config.packages[data.package as keyof typeof config.packages]?.name || data.package;

        const subject = `Neue Preisanfrage: ${sizeName} - ${packageName}`;

        // HTML Body for the email
        const htmlContent = `
            <div style="font-family: sans-serif; color: #333;">
                <h2 style="color: #D80000;">Neue Anfrage über Preisrechner</h2>
                <p>Ein Kunde hat eine Kalkulation durchgeführt und um Kontaktaufnahme gebeten.</p>

                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />

                <h3>Kunde</h3>
                <p><strong>E-Mail:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>

                <h3>Fahrzeug & Zustand</h3>
                <ul>
                    <li><strong>Fahrzeuggröße:</strong> ${sizeName}</li>
                    <li><strong>Zustand:</strong> ${conditionName}</li>
                    <li><strong>Camper Länge:</strong> ${data.camperLength ? escapeHtml(data.camperLength.toString()) + 'm' : 'N/A'}</li>
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
        // Prioritize Runtime Env (process.env) -> Build Env (import.meta.env)
        const runtimeKey = typeof process !== 'undefined' ? process.env.WEB3FORMS_ACCESS_KEY : undefined;
        const buildKey = import.meta.env.WEB3FORMS_ACCESS_KEY;
        const hardcodedKey = '51d8133f-baec-4504-ab1e-ea740b15dc8b';

        const apiKey = runtimeKey || buildKey || hardcodedKey;
        const keySource = runtimeKey ? "Runtime Env" : (buildKey ? "Build Env" : (hardcodedKey ? "Hardcoded" : "None"));

        console.log(`>>> Sending email using Web3Forms Key from: ${keySource}`);

        let emailSent = false;

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
                    console.log(`>>> Email sent successfully to owner via Web3Forms (Ref: ${maskEmail(data.email)})`);
                    emailSent = true;
                } else {
                    console.error(">>> Web3Forms API Error:", apiResult);
                    // Don't fail the request if logging succeeded, just log the error
                }
            } catch (err) {
                console.error(">>> Failed to send email via Web3Forms:", err);
            }
        } else {
            // In Production, missing key is a critical error but we should not fail the user experience if we logged it locally
            if (import.meta.env.PROD) {
                console.error(">>> CRITICAL: WEB3FORMS_ACCESS_KEY is missing in production environment!");
            } else {
                console.log(">>> [MOCK EMAIL] WEB3FORMS_ACCESS_KEY missing. Printing to console:");
                console.log(`To: owner@rg-detailing.de | Subject: ${subject}`);
                console.log(`Data: ${JSON.stringify({ ...data, email: maskEmail(data.email) })}`);
                emailSent = true; // Pretend sent in dev
            }
        }

        // Always return success if we reached this point (data is valid and likely logged)
        // This prevents the 0% conversion issue due to email service failures
        if (!emailSent) {
             return new Response(JSON.stringify({ error: "Fehler beim Senden der E-Mail" }), { status: 500 });
        }

        return new Response(JSON.stringify({
            success: true,
            message: "Anfrage erhalten",
            quote: priceQuote,
            emailStatus: emailSent ? 'sent' : 'queued'
        }), { status: 200 });

    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
    }
}
