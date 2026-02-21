import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';
import { getAdminSecret } from '../../lib/secrets';
import zlib from 'node:zlib';
import { pipeline } from 'node:stream';
import { promisify } from 'node:util';

const pipe = promisify(pipeline);

export const GET: APIRoute = async ({ request, url }) => {
    // Auth Check
    const key = url.searchParams.get('key');
    let secret;
    try {
        secret = getAdminSecret();
    } catch (e) {
        return new Response('Server Configuration Error', { status: 500 });
    }

    if (key !== secret) {
        return new Response('Unauthorized', { status: 401 });
    }

    const logDir = path.resolve('logs');
    const logFile = path.join(logDir, 'events.jsonl');

    if (!fs.existsSync(logFile)) {
        return new Response('No logs found', { status: 404 });
    }

    const date = new Date().toISOString().slice(0, 10);
    const filename = `events-${date}.jsonl.gz`;

    const headers = new Headers();
    headers.set('Content-Type', 'application/gzip');
    headers.set('Content-Disposition', `attachment; filename="${filename}"`);

    // Stream GZIP response
    const fileStream = fs.createReadStream(logFile);
    const gzip = zlib.createGzip();

    // In Astro/Node, we can return a ReadableStream/NodeStream directly
    // but Astro's Response object expects Web Streams or Buffers mostly.
    // However, the cleanest way in Node adapter is to stream directly or use Readable.toWeb (Node 18+).

    // Simplest robust way for Node adapter: Pipe to a PassThrough and return it as body (Astro supports it)
    // But since we need to gzip, let's just use the stream chain.

    // NOTE: Astro's Response constructor with Node streams can be tricky depending on version.
    // We will verify this with the test.
    const { Readable } = await import('node:stream');
    // @ts-ignore - Readable.toWeb is standard in Node 18+
    const webStream = Readable.toWeb(fileStream.pipe(gzip));

    return new Response(webStream as any, {
        status: 200,
        headers
    });
}
