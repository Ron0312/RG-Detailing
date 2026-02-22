// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import React from 'react';
import WhyUs from './WhyUs';

// Mock scrollTo
const scrollToMock = vi.fn();
Element.prototype.scrollTo = scrollToMock;

describe('WhyUs Component', () => {
    let observerCallback;
    let observeMock;
    let unobserveMock;
    let disconnectMock;

    beforeEach(() => {
        observeMock = vi.fn();
        unobserveMock = vi.fn();
        disconnectMock = vi.fn();

        // Mock IntersectionObserver as a class
        window.IntersectionObserver = class IntersectionObserver {
            constructor(cb) {
                observerCallback = cb;
            }
            observe(element) { observeMock(element); }
            unobserve(element) { unobserveMock(element); }
            disconnect() { disconnectMock(); }
        };
    });

    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    it('renders the component with correct content', () => {
        render(<WhyUs />);
        expect(screen.getByText('Warum RG Detailing?')).toBeDefined();
        expect(screen.getByText('Zertifizierte Keramikversiegelung')).toBeDefined();
    });

    it('renders pagination dots as interactive buttons', () => {
        render(<WhyUs />);
        const buttons = screen.getAllByRole('button', { name: /Gehe zu Slide/i });
        expect(buttons).toHaveLength(3);
    });

    it('triggers scroll on button click', () => {
        render(<WhyUs />);
        const buttons = screen.getAllByRole('button', { name: /Gehe zu Slide/i });
        const secondButton = buttons[1];

        fireEvent.click(secondButton);
        expect(scrollToMock).toHaveBeenCalled();
    });

    it('updates active state when intersection occurs', () => {
        render(<WhyUs />);

        const buttons = screen.getAllByRole('button', { name: /Gehe zu Slide/i });

        // Initial state: first button active
        expect(buttons[0].getAttribute('aria-current')).toBe('step');
        expect(buttons[1].getAttribute('aria-current')).toBeNull();

        // Simulate intersection on index 1
        act(() => {
            if (observerCallback) {
                observerCallback([
                    {
                        isIntersecting: true,
                        target: { getAttribute: () => '1' } // Mock target
                    }
                ]);
            }
        });

        // Now second button should be active
        expect(buttons[1].getAttribute('aria-current')).toBe('step');
        expect(buttons[0].getAttribute('aria-current')).toBeNull();
    });
});
