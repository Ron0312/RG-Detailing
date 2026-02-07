// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import GalleryLightbox from './GalleryLightbox';

// Mock Lightbox
vi.mock("yet-another-react-lightbox", () => ({
  default: ({ open, index }) => (
    open ? <div data-testid="lightbox" data-index={index}>Lightbox Open</div> : null
  )
}));

vi.mock("yet-another-react-lightbox/plugins/zoom", () => ({
  default: {}
}));

const mockImages = [
    { src: 'img1.jpg', alt: 'Test Image 1', category: 'Cat1' },
    { src: 'img2.jpg', alt: 'Test Image 2', category: 'Cat2' }
];

describe('GalleryLightbox Accessibility', () => {
    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    it('renders images as accessible buttons', async () => {
        const user = userEvent.setup();
        render(<GalleryLightbox images={mockImages} />);

        // Try to find buttons for images
        // Updated query to match the new aria-label format
        const buttons = screen.getAllByRole('button', { name: /Bild vergrößern: Test Image/i });
        expect(buttons).toHaveLength(2);

        // Verify attributes using standard Vitest assertions
        expect(buttons[0].getAttribute('type')).toBe('button');
        expect(buttons[0].className).toContain('focus-visible:ring-2');

        // Test interaction
        await user.click(buttons[0]);
        const lightbox = screen.getByTestId('lightbox');
        expect(lightbox).toBeTruthy(); // expect(lightbox).toBeInTheDocument() is not available without jest-dom
        expect(lightbox.getAttribute('data-index')).toBe('0');
    });

    it('allows keyboard navigation', async () => {
        const user = userEvent.setup();
        render(<GalleryLightbox images={mockImages} />);

        // Find the image button by its accessible name
        const imageButton = screen.getByRole('button', { name: 'Bild vergrößern: Test Image 2' });
        imageButton.focus();

        // Check focus
        expect(document.activeElement).toBe(imageButton);

        await user.keyboard('{Enter}');
        const lightbox = screen.getByTestId('lightbox');
        expect(lightbox).toBeTruthy();
        expect(lightbox.getAttribute('data-index')).toBe('1');
    });
});
