import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { z } from 'zod';
import { checkRateLimit } from '../../lib/rate-limit';

const EventSchema = z.object({
    eventName: z.string().min(1).max(50),
    url: z.string().optional(),
    sessionId: z.string().optional(),
    visitorId: z.string().optional(),
    data: z.record(z.any()).optional()
});

// Helper for UA Parsing (Lightweight Regex)
const parseUserAgent = (ua: string) => {
    let browser = 'Unknown';
    if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Chrome')) browser = 'Chrome';
    else if (ua.includes('Safari')) browser = 'Safari';
    else if (ua.includes('Edge')) browser = 'Edge';

    let os = 'Unknown';
    if (ua.includes('Win')) os = 'Windows';
    else if (ua.includes('Mac')) os = 'MacOS';
    else if (ua.includes('Linux')) os = 'Linux';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

    return { browser, os };
};

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    const rawIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || clientAddress || 'unknown';
    // Validate IP to prevent key bloating
    const ip = z.string().ip().safeParse(rawIp).success ? rawIp : 'unknown';

    // Rate limit: 20 events per minute per IP (generous for interaction tracking)
    if (!checkRateLimit(`log-event:${ip}`, 20, 60000)) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded" }), { status: 429 });
    }

    // Security: Check Content-Type to prevent CSRF via Simple Requests
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
        return new Response(JSON.stringify({ error: "Unsupported Media Type" }), { status: 415 });
    }

    // Security: Check Content-Length (10KB limit)
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 10240) {
        return new Response(JSON.stringify({ error: "Payload too large" }), { status: 413 });
    }

    let body;
    try {
        body = await request.json();
    } catch (e) {
        return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
    }

    const result = EventSchema.safeParse(body);
    if (!result.success) {
        return new Response(JSON.stringify({ error: "Invalid event data" }), { status: 400 });
    }

    const { eventName, url, sessionId, visitorId, data } = result.data;

    // Sanitize URL
    let sanitizedUrl = (url || '').substring(0, 200);
    try {
        // Redact query params and normalize
        if (sanitizedUrl.startsWith('http')) {
             const u = new URL(sanitizedUrl);
             u.search = '';
             u.hash = '';
             // Remove trailing slash if present (except root)
             if (u.pathname.length > 1 && u.pathname.endsWith('/')) {
                 u.pathname = u.pathname.slice(0, -1);
             }
             sanitizedUrl = u.pathname;
        } else if (sanitizedUrl.includes('?')) {
             sanitizedUrl = sanitizedUrl.split('?')[0];
        }

        if (sanitizedUrl.length > 1 && sanitizedUrl.endsWith('/')) {
            sanitizedUrl = sanitizedUrl.slice(0, -1);
        }
    } catch (e) {
        // Fallback
    }

    // Advanced Tracking Logic
    const userAgent = data?.userAgent || request.headers.get('user-agent') || '';
    const { browser, os } = parseUserAgent(userAgent);

    // Privacy-Friendly Unique Visitor Hash (Daily Salt)
    // Allows counting unique visitors per day without persistent cookies.
    const dateSalt = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const dailyHash = crypto.createHash('sha256').update(`${ip}-${userAgent}-${dateSalt}`).digest('hex').substring(0, 16);

    // Construct log entry
    const entry = {
        timestamp: new Date().toISOString(),
        event: eventName,
        url: sanitizedUrl,
        sessionId: sessionId ? sessionId.substring(0, 50) : undefined,
        visitorId: visitorId ? visitorId.substring(0, 50) : undefined, // Persistent ID if consent given
        dailyHash, // Anonymous daily ID
        browser,
        os,
        data: data
    };

    const logLine = JSON.stringify(entry) + '\n';
    const logDir = path.resolve('logs');
    const logFile = path.join(logDir, 'events.jsonl');

    // Attempt to write to file
    try {
        await fs.mkdir(logDir, { recursive: true });

        try {
            // Log Rotation: Check if file exceeds 5MB
            const stats = await fs.stat(logFile);
            if (stats.size > 5 * 1024 * 1024) {
                    await fs.rename(logFile, path.join(logDir, 'events.jsonl.old'));
            }
        } catch (err) {
            // File likely doesn't exist yet
        }
        await fs.appendFile(logFile, logLine);
    } catch (fsError) {
        console.warn('Could not write to local log file:', fsError);
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error logging event:', error);
    return new Response(JSON.stringify({ error: 'Failed to log' }), { status: 500 });
  }
};
