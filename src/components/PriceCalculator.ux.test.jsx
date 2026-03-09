// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import PriceCalculator from './PriceCalculator';

// Mock scrollIntoView
if (typeof window !== 'undefined' && !window.HTMLElement.prototype.scrollIntoView) {
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
}

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // Deprecated
        removeListener: vi.fn(), // Deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

describe('PriceCalculator UX', () => {
    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    it('moves focus to step title when advancing steps', async () => {
        const user = userEvent.setup();
        render(<PriceCalculator />);

        // Start
        const startButton = screen.getByText(/Preis berechnen \(3 Klicks\)/);
        await user.click(startButton);

        // Select "Kleinwagen" (Size Step) -> Condition Step
        const sizeButton = screen.getByText('Kleinwagen').closest('button');
        await user.click(sizeButton);

        // Wait for next step (Condition)
        await waitFor(() => {
            expect(screen.getByText('Lackzustand')).not.toBeNull();
        });

        // Verify Focus moved to Title "Lackzustand"
        // Note: The title text is inside the h3, so getByRole('heading') should work if implemented correctly
        const conditionTitle = screen.getByRole('heading', { name: /lackzustand/i });

        // This expectation will fail until implemented
        expect(document.activeElement).toBe(conditionTitle);
    });

    it('moves focus back to previous step title when clicking back', async () => {
        const user = userEvent.setup();
        render(<PriceCalculator />);

        // Start -> Size -> Condition
        await user.click(screen.getByText(/Preis berechnen \(3 Klicks\)/));
        await user.click(screen.getByText('Kleinwagen').closest('button'));

        // Verify Condition step
        await waitFor(() => screen.getByText('Lackzustand'));

        // Click Back
        const backButton = screen.getAllByRole('button', { name: /zurück/i })[0];
        await user.click(backButton);

        // Verify Size step
        await waitFor(() => screen.getByText('Fahrzeug wählen'));

        // Verify Focus moved to Title "Fahrzeug wählen"
        const sizeTitle = screen.getByRole('heading', { name: /fahrzeug wählen/i });
        expect(document.activeElement).toBe(sizeTitle);
    });
});
