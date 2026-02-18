export const trackEvent = async (eventName: string, data: Record<string, any> = {}) => {
  if (typeof window === 'undefined') return;

  try {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);
      sessionStorage.setItem('analytics_session_id', sessionId);
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
