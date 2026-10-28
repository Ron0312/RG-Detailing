// Entry point for Plesk/Phusion Passenger
// Loads .env before starting the Astro SSR server
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import http from 'node:http';

const __dirname = dirname(fileURLToPath(import.meta.url));

try {
    const envPath = resolve(__dirname, '.env');
    const content = readFileSync(envPath, 'utf-8');
    for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx === -1) continue;
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
        if (!process.env[key]) process.env[key] = val;
    }
} catch {
    // .env file is optional — ENV vars can come from Plesk/system
}

// Vorgerenderte Seiten und Assets laufen nicht durch src/middleware.ts.
// Deshalb hier fuer jede Antwort die Sicherheitsheader setzen, falls sie fehlen.
// Fehlt security-headers.mjs auf dem Server, startet die App trotzdem.
// Kein top-level await: Passenger laedt app.js per require(), das scheitert
// an ESM mit top-level await (ERR_REQUIRE_ASYNC_MODULE).
import('./security-headers.mjs')
    .then(({ securityHeaders }) => {
        const originalWriteHead = http.ServerResponse.prototype.writeHead;
        http.ServerResponse.prototype.writeHead = function (...args) {
            if (!this.headersSent) {
                for (const [name, value] of Object.entries(securityHeaders)) {
                    if (!this.hasHeader(name)) this.setHeader(name, value);
                }
            }
            return originalWriteHead.apply(this, args);
        };
    })
    .catch((err) => console.error('Sicherheitsheader nicht geladen:', err))
    .then(() => import('./dist/server/entry.mjs'));
