import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { debounce, sanitizeForLog } from '../../lib/utils';

describe('debounce', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should execute the function after the specified wait time', () => {
        const func = vi.fn();
        const debouncedFunc = debounce(func, 100);

        debouncedFunc();
        expect(func).not.toHaveBeenCalled();

        vi.advanceTimersByTime(50);
        expect(func).not.toHaveBeenCalled();

        vi.advanceTimersByTime(50);
        expect(func).toHaveBeenCalledTimes(1);
    });

    it('should reset the timer if called again within the wait time', () => {
        const func = vi.fn();
        const debouncedFunc = debounce(func, 100);

        debouncedFunc();
        vi.advanceTimersByTime(50);
        debouncedFunc(); // Reset timer

        vi.advanceTimersByTime(60);
        expect(func).not.toHaveBeenCalled(); // Should not have been called yet (reset at 50, new target 150)

        vi.advanceTimersByTime(40); // Reach 150
        expect(func).toHaveBeenCalledTimes(1);
    });

    it('should pass arguments to the debounced function', () => {
        const func = vi.fn();
        const debouncedFunc = debounce(func, 100);

        debouncedFunc('hello', 42);
        vi.advanceTimersByTime(100);
        expect(func).toHaveBeenCalledWith('hello', 42);
    });

    it('should cancel the execution', () => {
        const func = vi.fn();
        const debouncedFunc = debounce(func, 100);

        debouncedFunc();
        debouncedFunc.cancel();

        vi.advanceTimersByTime(150);
        expect(func).not.toHaveBeenCalled();
    });
});

describe('sanitizeForLog', () => {
    it('should return empty string for non-string inputs', () => {
        expect(sanitizeForLog(null)).toBe('');
        expect(sanitizeForLog(undefined)).toBe('');
        expect(sanitizeForLog(123)).toBe('');
    });

    it('should replace newlines and tabs with space', () => {
        expect(sanitizeForLog('Line1\nLine2')).toBe('Line1 Line2');
        expect(sanitizeForLog('Line1\r\nLine2')).toBe('Line1 Line2');
        expect(sanitizeForLog('Col1\tCol2')).toBe('Col1 Col2');
    });

    it('should remove control characters', () => {
        // \x1b is ESC. Stripping it breaks ANSI codes like \x1b[31m
        const input = 'Hello\x00World\x1b[31mError\x1b[0m';
        expect(sanitizeForLog(input)).toBe('HelloWorld[31mError[0m');
    });

    it('should truncate to maxLength', () => {
        const longStr = 'a'.repeat(600);
        expect(sanitizeForLog(longStr, 10)).toBe('aaaaaaaaaa');
        expect(sanitizeForLog(longStr)).toHaveLength(500);
    });
});
