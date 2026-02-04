import fs from 'node:fs/promises';
import path from 'node:path';
import { c as checkRateLimit } from './rate-limit_C0t0j2yj.mjs';

const POST = async ({ request, clientAddress }) => {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || clientAddress || "unknown";
    if (!checkRateLimit(`log-404:${ip}`, 60, 6e4)) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded" }), { status: 429 });
    }
    const data = await request.json();
    const sanitize = (str) => {
      if (typeof str !== "string") return "";
      return str.replace(/[\r\n]+/g, " ").substring(0, 500);
    };
    const url = sanitize(data.url);
    const referrer = sanitize(data.referrer);
    const userAgent = sanitize(data.userAgent);
    console.log(`[404 TRACKING] URL: ${url} | Referrer: ${referrer || "Direct"} | UA: ${userAgent}`);
    const logEntry = `[${(/* @__PURE__ */ new Date()).toISOString()}] 404: ${url} (Referrer: ${referrer || "Direct"}) - UA: ${userAgent}
`;
    const logDir = path.resolve("logs");
    const logFile = path.join(logDir, "404.log");
    fs.mkdir(logDir, { recursive: true }).then(() => fs.appendFile(logFile, logEntry)).catch((fsError) => {
      console.warn("Could not write to local log file (likely read-only filesystem):", fsError);
    });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error logging 404:", error);
    return new Response(JSON.stringify({ error: "Failed to log" }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

export { POST as P, _page as _ };
