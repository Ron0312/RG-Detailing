import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';
import { z } from 'zod';
import { checkRateLimit } from '../../lib/rate-limit';

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    const rawIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || clientAddress || 'unknown';
    // Validate IP to prevent key bloating / memory exhaustion
    const ip = z.string().ip().safeParse(rawIp).success ? rawIp : 'unknown';

    if (!checkRateLimit(`log-404:${ip}`, 60, 60000)) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded" }), { status: 429 });
    }

    // Security: Check Content-Type to prevent CSRF via Simple Requests
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
        return new Response(JSON.stringify({ error: "Unsupported Media Type" }), { status: 415 });
    }

    // Security: Check Content-Length to prevent large payloads (DoS protection)
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 5120) { // 5KB limit
        return new Response(JSON.stringify({ error: "Payload too large" }), { status: 413 });
    }

    let data;
    try {
        data = await request.json();
    } catch (e) {
        return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
    }

    const sanitize = (str: any) => {
        if (typeof str !== 'string') return '';
        return str
            .replace(/[\r\n]+/g, ' ') // Replace newlines with space
            // eslint-disable-next-line no-control-regex
            .replace(/\x1B\[[0-9;]*[a-zA-Z]/g, '') // Remove ANSI sequences
            // eslint-disable-next-line no-control-regex
            .replace(/[\x00-\x1F\x7F]/g, '') // Remove control characters
            .substring(0, 500);
    };

    let url = sanitize(data.url);
    const referrer = sanitize(data.referrer);
    const userAgent = sanitize(data.userAgent);

    // Security: Redact query parameters to prevent PII leakage (e.g. ?token=...)
    try {
        // Use a dummy base to allow parsing relative URLs (e.g. "/foo")
        const urlObj = new URL(url, 'http://localhost');
        urlObj.search = '';
        urlObj.hash = '';
        // If the original URL was absolute, return the full redacted URL.
        // Otherwise, return just the pathname.
        if (url.startsWith('http')) {
            url = urlObj.toString();
        } else {
            url = urlObj.pathname;
        }
    } catch (e) {
        // Fallback for malformed URLs
        url = url.split('?')[0].split('#')[0];
    }

    // Log to console (stdout) for container/serverless environments
    console.log(`[404 TRACKING] URL: ${url} | Referrer: ${referrer || 'Direct'} | UA: ${userAgent}`);

    const logEntry = `[${new Date().toISOString()}] 404: ${url} (Referrer: ${referrer || 'Direct'}) - UA: ${userAgent}\n`;
    const logDir = path.resolve('logs');
    const logFile = path.join(logDir, '404.log');

    // Attempt to write to file, but don't crash if it fails (e.g. read-only FS)
    // Non-blocking fire-and-forget to avoid delaying the response
    fs.mkdir(logDir, { recursive: true })
        .then(() => fs.appendFile(logFile, logEntry))
        .catch((fsError) => {
            console.warn('Could not write to local log file (likely read-only filesystem):', fsError);
        });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error logging 404:', error);
    return new Response(JSON.stringify({ error: 'Failed to log' }), { status: 500 });
  }
};
