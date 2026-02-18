// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import WhyUs from './WhyUs';

// Mock scrollTo
const scrollToMock = vi.fn();
Element.prototype.scrollTo = scrollToMock;

describe('WhyUs Component', () => {
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

        // This will check if there are buttons with aria-labels for navigation
        // Currently, this should fail because they are divs
        const buttons = screen.getAllByRole('button', { name: /Gehe zu Slide/i });
        expect(buttons).toHaveLength(3);
    });

    it('updates active state on click and scrolls', () => {
        render(<WhyUs />);

        const buttons = screen.getAllByRole('button', { name: /Gehe zu Slide/i });
        const secondButton = buttons[1];

        // Click the second button
        fireEvent.click(secondButton);

        // Check if scrollTo was called
        expect(scrollToMock).toHaveBeenCalled();

        // Check if the second button is now active (aria-current)
        // Note: aria-current is a boolean or string, usually "step" or "page" or "true"
        expect(secondButton.getAttribute('aria-current')).toBe('step');
    });
});
