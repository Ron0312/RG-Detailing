// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import PriceCalculator from './PriceCalculator';

// Mock scrollIntoView since jsdom doesn't support it
if (typeof window !== 'undefined' && !window.HTMLElement.prototype.scrollIntoView) {
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
}

describe('PriceCalculator Accessibility', () => {
    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    it('renders selection cards with correct accessibility attributes', async () => {
        const user = userEvent.setup();
        render(<PriceCalculator />);

        // Expand calculator
        const startButton = screen.getByText('Jetzt Preis berechnen');
        await user.click(startButton);

        // Initial state: Not selected
        let cardButton = screen.getByText('Kleinwagen').closest('button');
        expect(cardButton).not.toBeNull();

        // These assertions will fail initially
        expect(cardButton.getAttribute('type')).toBe('button');
        expect(cardButton.className).toContain('focus-visible:ring-2');
        expect(cardButton.getAttribute('aria-pressed')).toBe('false');

        // Click to select "Kleinwagen"
        await user.click(cardButton);

        // Step advances to Condition (Size cards gone), check for "Zurück" button
        const backButton = screen.getByText('Zurück');
        expect(backButton).not.toBeNull();

        // Click Back button
        await user.click(backButton);

        // Back at Size step
        cardButton = screen.getByText('Kleinwagen').closest('button');
        // Now it should be selected
        expect(cardButton.getAttribute('aria-pressed')).toBe('true');
    });

    it('renders camper length range with aria-label', async () => {
        const user = userEvent.setup();
        render(<PriceCalculator />);

        // Expand calculator
        const startButton = screen.getByText('Jetzt Preis berechnen');
        await user.click(startButton);

        // Click "Wohnmobil / Caravan" to go to camper length step
        const camperButton = screen.getByText('Wohnmobil / Caravan').closest('button');
        await user.click(camperButton);

        const rangeInput = screen.getByRole('slider');
        // This assertion will fail initially
        expect(rangeInput.getAttribute('aria-label')).toBe('Fahrzeuglänge');
    });

    it('renders teaser as an accessible button', () => {
        render(<PriceCalculator />);

        const teaserButton = screen.getByText('Jetzt Preis berechnen').closest('button');

        expect(teaserButton).not.toBeNull();
        expect(teaserButton.getAttribute('type')).toBe('button');
        // Check for focus styles
        expect(teaserButton.className).toContain('focus-visible:ring-4');
        expect(teaserButton.className).toContain('focus-visible:ring-red-500');
    });
});
