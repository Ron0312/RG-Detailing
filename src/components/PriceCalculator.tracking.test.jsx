// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import PriceCalculator from './PriceCalculator';
import { trackEvent } from '../lib/analytics';

vi.mock('../lib/analytics', () => ({
  trackEvent: vi.fn().mockResolvedValue({}),
}));

// Mock scrollIntoView since jsdom doesn't support it
if (typeof window !== 'undefined' && !window.HTMLElement.prototype.scrollIntoView) {
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
}

describe('PriceCalculator Tracking', () => {
    beforeEach(() => {
        cleanup();
        vi.clearAllMocks();
    });

    it('tracks step 0.5 as a string "0.5"', async () => {
        const user = userEvent.setup();
        render(<PriceCalculator />);

        // Expand calculator
        const startButton = screen.getByText(/Preis berechnen \(3 Klicks\)/);
        await user.click(startButton);

        // Track 'calculator_start' and first step '0'
        expect(trackEvent).toHaveBeenCalledWith('calculator_start');
        expect(trackEvent).toHaveBeenCalledWith('calculator_step', { step: '0' });

        // Click "Wohnmobil / Caravan" to go to step 0.5
        const camperButton = screen.getByText('Wohnmobil / Caravan').closest('button');
        await user.click(camperButton);

        // Check if trackEvent was called with step: "0.5"
        expect(trackEvent).toHaveBeenCalledWith('calculator_step', { step: '0.5' });
    });
});
