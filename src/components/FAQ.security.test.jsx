/**
 * @vitest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FAQ from './FAQ';

// Mock the analytics module so trackEvent won't fail during tests
vi.mock('../lib/analytics', () => ({
  trackEvent: vi.fn(),
}));

describe('FAQ Component - Security', () => {
  it('sanitizes HTML input and prevents XSS', () => {
    const maliciousItems = [
      {
        question: 'Is this safe?',
        answer: 'Yes, it is <script>alert("XSS")</script><img src="x" onerror="alert(1)"> safe.',
      },
    ];

    const { container } = render(<FAQ items={maliciousItems} />);

    // The rendered output should not contain the script tag or the onerror attribute.
    // DOMPurify should strip out the script and onerror attributes.
    const htmlOutput = container.innerHTML;

    expect(htmlOutput).not.toContain('<script>');
    expect(htmlOutput).not.toContain('onerror');

    // Check that standard text made it through safely
    expect(screen.getByText(/Yes, it is/)).toBeTruthy();
  });
});
