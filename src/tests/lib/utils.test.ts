import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { debounce } from '../../lib/utils';

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
