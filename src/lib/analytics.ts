export const botRegex = /bot|googlebot|crawler|spider|robot|crawling|bingbot|yandex|baidu|slurp|facebookexternalhit|headless|lighthouse|adsbot|plesk|screenshot|thumb|wget|curl|python|aiohttp|httpx|libwww|http-client|axios|got|node-fetch|mediapartners|scoutjet|w3c_validator|gtmetrix|telegrambot|whatsapp|skype|slack/i;

export const trackEvent = async (eventName: string, data: Record<string, any> = {}) => {
  if (typeof window === 'undefined') return;

  // 1. Bot Check (Global)
  if (botRegex.test(navigator.userAgent)) {
      // console.log('Analytics skipped: Bot detected');
      return;
  }

  // 2. Exclude Admin & Localhost
  const { hostname, pathname } = window.location;
  if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname.endsWith('.local') ||
      pathname.startsWith('/admin') ||
      pathname.startsWith('/keystatic')
  ) {
      console.log('Analytics skipped: Localhost/Admin detected');
      return;
  }

  try {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);
      sessionStorage.setItem('analytics_session_id', sessionId);
    }

    // Persistent Visitor ID (Consent Dependent)
    let visitorId = undefined;
    if (localStorage.getItem('cookie-consent') === 'accepted') {
        visitorId = localStorage.getItem('analytics_visitor_id');
        if (!visitorId) {
            visitorId = Math.random().toString(36).substring(2) + Date.now().toString(36);
            localStorage.setItem('analytics_visitor_id', visitorId);
        }
    }

    // Capture context
    const context = {
        referrer: document.referrer || 'direct',
        screen: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language || 'unknown',
        userAgent: navigator.userAgent
    };

    const payload = {
      eventName,
      url: window.location.href,
      sessionId,
      visitorId,
      data: {
          ...context,
          ...data
      }
    };

    await fetch('/api/log-event', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        keepalive: true
    });
  } catch (err) {
    // Fail silently to not impact user experience
    // console.warn("Analytics tracking failed:", err);
  }
};

// Auto-track exits
if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
            trackEvent('page_exit');
        }
    });
}
