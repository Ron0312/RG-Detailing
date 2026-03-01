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

describe('PriceCalculator Performance', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('measures submission time', async () => {
    const user = userEvent.setup();

    // Mock fetch
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    );

    render(<PriceCalculator />);

    // Expand
    await user.click(screen.getByText('Jetzt Preis berechnen'));

    // Step 1: Size - Select "Kleinwagen"
    await user.click(screen.getByText('Kleinwagen'));

    // Step 2: Condition - Select "Gepflegt"
    await user.click(screen.getByText('Gepflegt'));

    // Step 3: Package - Select "Premium Aufbereitung"
    await user.click(screen.getByText('Premium Aufbereitung'));

    // Step 4: Result - Fill form
    const nameInput = await screen.findByLabelText(/Ihr Name/i);
    await user.type(nameInput, 'Test User');
    const phoneInput = screen.getByLabelText(/Telefonnummer/i);
    await user.type(phoneInput, '0123456789');
    const emailInput = screen.getByLabelText(/Ihre E-Mail Adresse/i);
    await user.type(emailInput, 'test@example.com');

    const submitButton = screen.getByRole('button', { name: /Angebot anfordern/i });

    const start = performance.now();
    await user.click(submitButton);

    // Wait for success message
    await screen.findByText('Anfrage erfolgreich!', {}, { timeout: 5000 });
    const end = performance.now();

    const duration = end - start;
    console.log(`Submission Duration: ${duration.toFixed(2)}ms`);

    // Verify fetch was called
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
