import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';
import type { AnalyticsEvent } from '../../types/analytics';

// CSV Escaping: Wrap in quotes if contains comma or quotes, and double quotes
const escapeCsv = (str: string | undefined | null) => {
    if (str === null || str === undefined) return '';
    const s = String(str);
    if (s.includes('"') || s.includes(',') || s.includes('\n')) {
        return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
};

export const GET: APIRoute = async ({ request, url }) => {
    // Auth Check
    const key = url.searchParams.get('key');
    const secret = import.meta.env.STATS_SECRET || 'RG!123';

    if (key !== secret) {
        return new Response('Unauthorized. Access Denied.', { status: 401 });
    }

    const logDir = path.resolve('logs');
    const logFile = path.join(logDir, 'events.jsonl');

    try {
        await fs.access(logFile);
    } catch {
        return new Response('No data found.', { status: 404 });
    }

    const content = await fs.readFile(logFile, 'utf-8');
    const events: AnalyticsEvent[] = content.trim().split('\n').map(line => {
        try { return JSON.parse(line); } catch(e) { return null; }
    }).filter((e): e is AnalyticsEvent => !!e && !e.url?.includes('/admin') && !e.url?.includes('/keystatic'));

    // Headers
    const csvRows = [
        'Timestamp,Event,URL,SessionID,VisitorID,Device,Browser,OS,Referrer,Actions'
    ];

    events.forEach(e => {
        // Format date to local-friendly ISO (YYYY-MM-DD HH:mm:ss)
        const date = new Date(e.timestamp).toLocaleString('de-DE').replace(',', '');

        // Extract useful fields
        const row = [
            escapeCsv(date),
            escapeCsv(e.event),
            escapeCsv(e.url),
            escapeCsv(e.sessionId),
            escapeCsv(e.visitorId),
            escapeCsv(e.data?.device || 'Desktop'),
            escapeCsv(e.browser),
            escapeCsv(e.os),
            escapeCsv(e.data?.referrer || 'Direct'),
            // Add custom data as JSON string for context
            escapeCsv(JSON.stringify(e.data))
        ];
        csvRows.push(row.join(','));
    });

    const csvContent = csvRows.join('\n');
    const filename = `analytics-export-${new Date().toISOString().slice(0, 10)}.csv`;

    return new Response(csvContent, {
        status: 200,
        headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': `attachment; filename="${filename}"`
        }
    });
};
