// Analytics wrapper that forwards events to Umami (self-hosted, cookieless)
// Umami is running at https://analytics.rg-detailing.de
// All previous API endpoints (/api/log-event) have been removed.

export const botRegex = /bot|googlebot|crawler|spider|robot|crawling|bingbot|yandex|baidu|slurp|facebookexternalhit|headless|lighthouse|adsbot|plesk|screenshot|thumb|wget|curl|python|aiohttp|httpx|libwww|http-client|axios|got|node-fetch|mediapartners|scoutjet|w3c_validator|gtmetrix|telegrambot|whatsapp|skype|slack/i;

declare global {
  interface Window {
    umami?: {
      track: (eventName?: string, eventData?: Record<string, any>) => void;
      identify?: (userId: string, data?: Record<string, any>) => void;
    };
    trackEvent?: typeof trackEvent;
  }
}

/**
 * Track a custom event via Umami.
 * Safe to call on server-side (no-op) and when Umami hasn't loaded yet.
 * Returns a resolved promise for backwards compatibility with code that awaits it.
 */
export const trackEvent = async (eventName: string, data: Record<string, any> = {}) => {
  if (typeof window === 'undefined') return;

  // Bot filter (Umami also filters bots server-side, this is extra safety)
  if (botRegex.test(navigator.userAgent)) return;

  // Exclude localhost and admin paths
  const { hostname, pathname } = window.location;
  if (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname.endsWith('.local') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/keystatic')
  ) {
    return;
  }

  // Forward to Umami — fails silently if Umami script hasn't loaded yet
  try {
    window.umami?.track(eventName, data);
  } catch {
    // swallow
  }
};
