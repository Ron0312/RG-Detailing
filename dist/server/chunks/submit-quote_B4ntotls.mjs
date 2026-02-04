import { z } from 'zod';
import { c as config, a as calculatePrice } from './pricing_7cSATyqx.mjs';
import { c as checkRateLimit } from './rate-limit_C0t0j2yj.mjs';

const PackageEnum = z.enum(Object.keys(config.packages));
const SizeEnum = z.enum(Object.keys(config.sizes));
const ConditionEnum = z.enum(Object.keys(config.conditions));
const QuoteSchema = z.object({
  email: z.string().email(),
  package: PackageEnum,
  size: SizeEnum,
  condition: ConditionEnum,
  camperLength: z.number().optional(),
  botcheck: z.boolean().optional()
});
const POST = async ({ request, clientAddress }) => {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || clientAddress || "unknown";
    if (!checkRateLimit(`submit-quote:${ip}`, 10, 60 * 60 * 1e3)) {
      return new Response(JSON.stringify({ error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut." }), { status: 429 });
    }
    const body = await request.json();
    const result = QuoteSchema.safeParse({
      email: body.email,
      package: body.package,
      // client sends 'package', 'size', 'condition'
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
    if (data.botcheck) {
      return new Response(JSON.stringify({
        success: true,
        message: "Anfrage erhalten"
      }), { status: 200 });
    }
    const priceQuote = calculatePrice(
      data.package,
      data.size,
      data.condition
    );
    const sizeName = config.sizes[data.size]?.name || data.size;
    const conditionName = config.conditions[data.condition]?.name || data.condition;
    const packageName = config.packages[data.package]?.name || data.package;
    const subject = `Neue Preisanfrage: ${sizeName} - ${packageName}`;
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
                    <li><strong>Camper Länge:</strong> ${data.camperLength ? data.camperLength + "m" : "N/A"}</li>
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
    const runtimeKey = typeof process !== "undefined" ? process.env.WEB3FORMS_ACCESS_KEY : void 0;
    const buildKey = undefined                                    ;
    const apiKey = runtimeKey || buildKey;
    const keySource = runtimeKey ? "Runtime Env" : buildKey ? "Build Env" : "None";
    const maskedKey = apiKey ? `${apiKey.slice(0, 4)}...${apiKey.slice(-4)}` : "NONE";
    console.log(`>>> Sending email using Web3Forms Key from: ${keySource} (${maskedKey})`);
    if (apiKey) {
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            access_key: apiKey,
            subject,
            email: data.email,
            // Reply-To address
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
      message: "Anfrage erhalten",
      quote: priceQuote
    }), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

export { POST as P, _page as _ };
