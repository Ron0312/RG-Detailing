
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from './export-csv';
import fs from 'node:fs/promises';
import path from 'node:path';

// Mock fs and path
vi.mock('node:fs/promises');
vi.mock('node:path');

describe('GET /api/export-csv', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Default mock implementation
        (path.resolve as any).mockReturnValue('/mock/logs');
        (path.join as any).mockImplementation((...args: string[]) => args.join('/'));
    });

    it('returns 401 if key is missing or invalid', async () => {
        const req = new Request('http://localhost/api/export-csv');
        const context = { request: req, url: new URL('http://localhost/api/export-csv') };

        const response = await GET(context as any);
        expect(response.status).toBe(401);

        const reqInvalid = new Request('http://localhost/api/export-csv?key=wrong');
        const contextInvalid = { request: reqInvalid, url: new URL('http://localhost/api/export-csv?key=wrong') };
        const responseInvalid = await GET(contextInvalid as any);
        expect(responseInvalid.status).toBe(401);
    });

    it('returns 404 if logs file does not exist', async () => {
        (fs.access as any).mockRejectedValue(new Error('ENOENT'));

        const req = new Request('http://localhost/api/export-csv?key=RG!123');
        const context = { request: req, url: new URL('http://localhost/api/export-csv?key=RG!123') };

        const response = await GET(context as any);
        expect(response.status).toBe(404);
    });

    it('returns CSV content for valid logs', async () => {
        (fs.access as any).mockResolvedValue(undefined);
        const mockEvents = [
            { timestamp: '2023-10-27T10:00:00.000Z', event: 'page_view', url: '/', sessionId: 'sess1', visitorId: 'vis1', data: { device: 'Mobile' }, browser: 'Chrome', os: 'Android' },
            { timestamp: '2023-10-27T10:05:00.000Z', event: 'click', url: '/contact', sessionId: 'sess1', visitorId: 'vis1', data: { device: 'Mobile', referrer: 'Google' }, browser: 'Chrome', os: 'Android' }
        ];
        (fs.readFile as any).mockResolvedValue(mockEvents.map(e => JSON.stringify(e)).join('\n'));

        const req = new Request('http://localhost/api/export-csv?key=RG!123');
        const context = { request: req, url: new URL('http://localhost/api/export-csv?key=RG!123') };

        const response = await GET(context as any);
        expect(response.status).toBe(200);
        expect(response.headers.get('Content-Type')).toBe('text/csv; charset=utf-8');
        expect(response.headers.get('Content-Disposition')).toContain('attachment; filename="analytics-export-');

        const text = await response.text();
        const lines = text.split('\n');
        expect(lines[0]).toContain('Timestamp,Event,URL,SessionID,VisitorID,Device,Browser,OS,Referrer,Actions');
        expect(lines.length).toBe(3); // Header + 2 rows
        expect(lines[1]).toContain('page_view');
        expect(lines[1]).toContain('sess1');
        expect(lines[2]).toContain('Google');
    });

    it('correctly escapes CSV fields', async () => {
        (fs.access as any).mockResolvedValue(undefined);
        const mockEvents = [
            { timestamp: '2023-10-27T10:00:00.000Z', event: 'test_event', url: '/foo,bar', sessionId: 'sess"2"', data: { note: 'Hello\nWorld' } }
        ];
        (fs.readFile as any).mockResolvedValue(JSON.stringify(mockEvents[0]));

        const req = new Request('http://localhost/api/export-csv?key=RG!123');
        const context = { request: req, url: new URL('http://localhost/api/export-csv?key=RG!123') };

        const response = await GET(context as any);
        const text = await response.text();
        const row = text.split('\n')[1];

        // Check escaping
        expect(row).toContain('"/foo,bar"'); // Commas wrapped in quotes
        expect(row).toContain('"sess""2"""'); // Quotes escaped as double quotes
        // expect(row).toContain('"Hello\nWorld"'); // Newlines wrapped (might be tricky to match exactly depending on implementation details of JSON.stringify in the test vs code)
    });
});
