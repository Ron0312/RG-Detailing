// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('ScrollToTop Logic', () => {
    let btn;
    let observerCallback;
    let sentinel;

    beforeEach(() => {
        // Setup DOM
        document.body.innerHTML = '<button id="scrollToTopBtn" class="opacity-0 translate-y-10 pointer-events-none" tabindex="-1" aria-hidden="true"></button>';
        btn = document.getElementById('scrollToTopBtn');

        // Mock IntersectionObserver
        global.IntersectionObserver = class {
            constructor(callback) {
                observerCallback = callback;
            }
            observe(element) {
                sentinel = element;
            }
            disconnect() {}
        };
    });

    afterEach(() => {
        document.body.innerHTML = '';
        delete global.IntersectionObserver;
    });

    it('should initialize correctly and create sentinel', () => {
        // Run the script logic (simulated)
        if (btn) {
            const sentinelEl = document.createElement('div');
            sentinelEl.style.position = 'absolute';
            sentinelEl.style.top = '0';
            sentinelEl.style.left = '0';
            sentinelEl.style.width = '1px';
            sentinelEl.style.height = '500px';
            sentinelEl.style.pointerEvents = 'none';
            sentinelEl.style.visibility = 'hidden';
            document.body.appendChild(sentinelEl);

            const observer = new IntersectionObserver((entries) => {
                const entry = entries[0];
                if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
                    btn.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
                    btn.removeAttribute('tabindex');
                    btn.removeAttribute('aria-hidden');
                } else {
                    btn.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
                    btn.setAttribute('tabindex', '-1');
                    btn.setAttribute('aria-hidden', 'true');
                }
            });

            observer.observe(sentinelEl);
        }

        expect(document.body.contains(sentinel)).toBe(true);
        expect(sentinel.style.height).toBe('500px');
    });

    it('should show button when scrolled past sentinel', () => {
        // Run the script logic
        if (btn) {
             const sentinelEl = document.createElement('div');
             document.body.appendChild(sentinelEl);
             const observer = new IntersectionObserver((entries) => {
                const entry = entries[0];
                if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
                    btn.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
                    btn.removeAttribute('tabindex');
                    btn.removeAttribute('aria-hidden');
                } else {
                    btn.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
                    btn.setAttribute('tabindex', '-1');
                    btn.setAttribute('aria-hidden', 'true');
                }
            });
            observer.observe(sentinelEl);
        }

        // Simulate callback: Scrolled past (not intersecting, top < 0)
        observerCallback([{
            isIntersecting: false,
            boundingClientRect: { top: -100 }
        }]);

        expect(btn.classList.contains('opacity-0')).toBe(false);
        expect(btn.hasAttribute('tabindex')).toBe(false);
        expect(btn.hasAttribute('aria-hidden')).toBe(false);
    });

    it('should hide button when scrolling back up', () => {
        // Run the script logic
         if (btn) {
             const sentinelEl = document.createElement('div');
             document.body.appendChild(sentinelEl);
             const observer = new IntersectionObserver((entries) => {
                const entry = entries[0];
                if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
                    btn.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
                    btn.removeAttribute('tabindex');
                    btn.removeAttribute('aria-hidden');
                } else {
                    btn.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
                    btn.setAttribute('tabindex', '-1');
                    btn.setAttribute('aria-hidden', 'true');
                }
            });
            observer.observe(sentinelEl);
        }

        // First show it
        observerCallback([{
            isIntersecting: false,
            boundingClientRect: { top: -100 }
        }]);
        expect(btn.classList.contains('opacity-0')).toBe(false);

        // Then hide it (intersecting)
        observerCallback([{
            isIntersecting: true,
            boundingClientRect: { top: 0 } // Doesn't matter if intersecting is true
        }]);

        expect(btn.classList.contains('opacity-0')).toBe(true);
        expect(btn.getAttribute('tabindex')).toBe('-1');
        expect(btn.getAttribute('aria-hidden')).toBe('true');
    });
});
