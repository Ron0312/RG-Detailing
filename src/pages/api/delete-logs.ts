import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';

export const POST: APIRoute = async ({ request, url }) => {
    // Auth Check
    const key = url.searchParams.get('key');
    const secret = import.meta.env.STATS_SECRET || 'RG!123';

    if (key !== secret) {
        return new Response('Unauthorized', { status: 401 });
    }

    const logDir = path.resolve('logs');
    const logFile = path.join(logDir, 'events.jsonl');
    const errorLogFile = path.join(logDir, '404.log');

    let deleted = 0;

    try {
        await fs.unlink(logFile);
        deleted++;
    } catch(e) {}

    try {
        await fs.unlink(errorLogFile);
        deleted++;
    } catch(e) {}

    return new Response(JSON.stringify({ success: true, deleted }), { status: 200 });
}
