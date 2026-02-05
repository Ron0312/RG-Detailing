export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = function(this: any, ...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func.apply(this, args);
      timeout = null;
    }, wait);
  };

  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
}

/**
 * Sanitizes a string for logging purposes to prevent log injection/forging.
 * Replaces newlines and tabs with space, and removes other control characters.
 */
export function sanitizeForLog(str: any, maxLength = 500): string {
  if (typeof str !== 'string') return '';
  // Replace newlines and tabs with space to flatten the log and prevent forging
  let sanitized = str.replace(/[\r\n\t]+/g, ' ');
  // Remove remaining control characters (including ANSI escape codes 0x00-0x1F and 0x7F)
  sanitized = sanitized.replace(/[\x00-\x1F\x7F]/g, '');
  return sanitized.substring(0, maxLength);
}
