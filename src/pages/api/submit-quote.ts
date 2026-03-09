import type { APIRoute } from 'astro';
import { z } from 'zod';
import fs from 'node:fs/promises';
import path from 'node:path';
import nodemailer from 'nodemailer';
import { calculatePrice, type PackageId, type SizeId, type ConditionId } from '../../lib/pricing';
import config from '../../lib/pricingConfig.json';
import { checkRateLimit } from '../../lib/rate-limit';

const PackageEnum = z.enum(Object.keys(config.packages) as [string, ...string[]]);
const SizeEnum = z.enum(Object.keys(config.sizes) as [string, ...string[]]);
const ConditionEnum = z.enum(Object.keys(config.conditions) as [string, ...string[]]);

const QuoteSchema = z.object({
    name: z.string().min(2).max(100),
    phone: z.string().max(30).optional().or(z.literal('')),
    email: z.string().email().max(100),
    package: PackageEnum,
    size: SizeEnum,
    condition: ConditionEnum,
    camperLength: z.number().optional(),
    callbackTime: z.string().max(100).optional(),
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
            name: body.name,
            phone: body.phone,
            email: body.email,
            package: body.package, // client sends 'package', 'size', 'condition'
            size: body.size,
            condition: body.condition,
            camperLength: body.camperLength,
            callbackTime: body.callbackTime,
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
                <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
                <p><strong>Telefon:</strong> ${data.phone ? `<a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a>` : '<i>Nicht angegeben</i>'}</p>
                ${data.callbackTime ? `<p><strong>Wunsch-Anrufzeit:</strong> ${escapeHtml(data.callbackTime)}</p>` : ''}
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
                    Diese E-Mail wurde automatisch von rg-detailing.de gesendet.
                </p>
            </div>
        `;

        // Configure Nodemailer transporter
        // Prioritize Runtime Env (process.env) -> Build Env (import.meta.env)
        const getEnv = (key: string) => {
            if (typeof process !== 'undefined' && process.env[key]) {
                return process.env[key];
            }
            if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
                return import.meta.env[key];
            }
            return undefined;
        };

        const smtpHost = getEnv('SMTP_HOST') || 'smtp.goneo.de';
        const smtpPort = parseInt(getEnv('SMTP_PORT') || '465', 10);
        const smtpUser = getEnv('SMTP_USER') || 'kontakt@rg-detailing.de';
        const smtpPass = getEnv('SMTP_PASS');

        if (!smtpPass) {
            console.error(">>> CRITICAL: No SMTP_PASS available!");
            return new Response(JSON.stringify({ error: "E-Mail-Konfiguration fehlt auf dem Server." }), { status: 500 });
        }

        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465, // true for 465, false for other ports
            auth: {
                user: smtpUser,
                pass: smtpPass,
            },
        });

        try {
            await transporter.sendMail({
                from: `"RG Detailing Rechner" <${smtpUser}>`,
                to: smtpUser, // Send to the owner
                replyTo: data.email, // Reply to the customer
                subject: subject,
                html: htmlContent,
            });

            console.log(`>>> Email sent successfully via SMTP (Ref: ${maskEmail(data.email)})`);

            return new Response(JSON.stringify({
                success: true,
                message: "Anfrage erhalten",
                quote: priceQuote,
                emailStatus: 'sent'
            }), { status: 200 });

        } catch (err) {
            console.error(">>> Failed to send email via SMTP:", err);
            return new Response(JSON.stringify({ error: "Fehler beim Senden der E-Mail." }), { status: 500 });
        }

    } catch (e) {
        console.error("Unhandled error in submit-quote:", e);
        return new Response(JSON.stringify({ error: "Interner Serverfehler" }), { status: 500 });
    }
}
