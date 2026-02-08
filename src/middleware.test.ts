import { describe, it, expect, vi } from 'vitest';

// Create a mock for defineMiddleware BEFORE importing the middleware file
vi.mock('astro:middleware', () => ({
  defineMiddleware: (fn: any) => fn
}));

// Now import the middleware which uses the mock
import { onRequest } from './middleware';

describe('Middleware Security Headers', () => {
  it('sets strict CSP headers without unsafe-eval', async () => {
    const context = {};
    // Mock the 'next' function to return a Response object with headers
    const next = vi.fn().mockResolvedValue(new Response('<html></html>', {
        headers: { 'Content-Type': 'text/html' }
    }));

    // call the middleware function
    // @ts-ignore - type mismatch for context/next mocks is expected in test
    const response = await onRequest(context, next);

    const csp = response.headers.get('Content-Security-Policy');

    expect(csp).toBeDefined();
    // Verify default-src is present
    expect(csp).toContain("default-src 'self'");
    // Verify script-src does NOT contain unsafe-eval
    expect(csp).not.toContain("'unsafe-eval'");
  });
});
