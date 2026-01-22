import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { url, referrer, userAgent } = data;

    // Log to console (stdout) for container/serverless environments
    console.log(`[404 TRACKING] URL: ${url} | Referrer: ${referrer || 'Direct'} | UA: ${userAgent}`);

    const logEntry = `[${new Date().toISOString()}] 404: ${url} (Referrer: ${referrer || 'Direct'}) - UA: ${userAgent}\n`;
    const logDir = path.resolve('logs');
    const logFile = path.join(logDir, '404.log');

    // Attempt to write to file, but don't crash if it fails (e.g. read-only FS)
    try {
        await fs.mkdir(logDir, { recursive: true });
        await fs.appendFile(logFile, logEntry);
    } catch (fsError) {
        console.warn('Could not write to local log file (likely read-only filesystem):', fsError);
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error logging 404:', error);
    return new Response(JSON.stringify({ error: 'Failed to log' }), { status: 500 });
  }
};
