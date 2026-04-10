// UI Constants — central source of truth for magic values across components.
// Avoids scattered literals in Header, ServiceGrid, MobileStickyBar, ScrollToTop etc.

/** Pixels of scroll past which the header hides on scroll-down. */
export const HEADER_HIDE_THRESHOLD = 100;

/** IntersectionObserver thresholds used across the app. */
export const INTERSECTION_THRESHOLDS = {
  /** ServiceGrid: which service card is the active one while scrolling horizontally. */
  SERVICE_CARD_ACTIVE: 0.6,
  /** Generic lazy-image reveal threshold. */
  LAZY_IMAGE: 0.1,
  /** Sticky bars / ScrollToTop: sentinel visibility threshold. */
  STICKY_REVEAL: 0,
} as const;

/** Sentinel element heights (px) used to gate fixed elements via IntersectionObserver. */
export const SENTINEL_HEIGHTS = {
  /** MobileStickyBar shows once the user scrolls past this many pixels from top. */
  MOBILE_STICKY_BAR: 500,
  /** ScrollToTop button appears once the user scrolls past this many pixels from top. */
  SCROLL_TO_TOP: 500,
} as const;

/** Touch-target minimum (px) — WCAG 2.5.5 / Apple HIG / Material. */
export const MIN_TOUCH_TARGET = 44;
