// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import PriceCalculator from './PriceCalculator';

// Mock scrollIntoView since jsdom doesn't support it
if (typeof window !== 'undefined' && !window.HTMLElement.prototype.scrollIntoView) {
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
}

describe('PriceCalculator Security', () => {
    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    it('does not expose API key via client-side fallback on server error', async () => {
        const user = userEvent.setup();
        const fetchSpy = vi.spyOn(global, 'fetch');

        // Mock the first fetch to fail (Server Error)
        fetchSpy.mockResolvedValueOnce({
            ok: false,
            json: async () => ({ error: 'Server error' }),
        });

        // Mock the second call too, just in case
        fetchSpy.mockResolvedValueOnce({
             ok: true,
             json: async () => ({ success: true }),
        });

        render(<PriceCalculator />);

        // Expand
        await user.click(screen.getByText('Jetzt Preis berechnen'));

        // 1. Size: Kleinwagen
        const sizeButton = screen.getByText('Kleinwagen').closest('button');
        await user.click(sizeButton);

        // 2. Condition: Gepflegt
        const conditionButton = screen.getByText('Gepflegt').closest('button');
        await user.click(conditionButton);

        // 3. Package: Basis Aufbereitung
        const packageButton = screen.getByText('Basis Aufbereitung').closest('button');
        await user.click(packageButton);

        // 4. Fill out form
        const emailInput = screen.getByPlaceholderText('Ihre E-Mail Adresse');
        await user.type(emailInput, 'test@example.com');

        // 5. Submit
        const submitButton = screen.getByRole('button', { name: /Angebot anfordern/i });
        await user.click(submitButton);

        // Wait for result
        await waitFor(() => {
             const successMsg = screen.queryByText('Anfrage erfolgreich!');
             const errorMsg = screen.queryByText(/Es gab ein Problem beim Senden Ihrer Anfrage/i);
             expect(successMsg || errorMsg).toBeTruthy();
        });

        // Verify that fetch was called ONCE (to the server API)
        expect(fetchSpy).toHaveBeenCalledTimes(1);
        expect(fetchSpy).toHaveBeenNthCalledWith(1, '/api/submit-quote', expect.objectContaining({
            method: 'POST'
        }));

        // Verify that fetch was NOT called a second time (to Web3Forms directly)
        expect(fetchSpy).not.toHaveBeenCalledWith('https://api.web3forms.com/submit', expect.anything());
    });
});
