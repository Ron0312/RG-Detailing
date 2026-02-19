export interface AnalyticsEvent {
    timestamp: string;
    event: string;
    url?: string;
    sessionId?: string;
    visitorId?: string; // Persistent if consented
    dailyHash?: string; // Anonymous daily unique
    browser?: string;
    os?: string;
    data?: Record<string, any>;
}
