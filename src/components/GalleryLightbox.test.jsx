// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import GalleryLightbox from './GalleryLightbox';

vi.mock('../lib/analytics', () => ({
  trackEvent: vi.fn(),
}));

// Mock the Lightbox component to avoid rendering issues and focus on the gallery grid
vi.mock('yet-another-react-lightbox', () => ({
    default: () => <div data-testid="lightbox-mock">Lightbox</div>
}));

// Mock plugins just in case they are imported and used immediately
vi.mock('yet-another-react-lightbox/plugins/zoom', () => ({ default: {} }));
vi.mock('yet-another-react-lightbox/plugins/captions', () => ({ default: {} }));

describe('GalleryLightbox Accessibility', () => {
    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    const mockImages = [
        { src: 'img1.jpg', alt: 'Image 1', category: 'Cat1' },
        { src: 'img2.jpg', alt: 'Image 2', category: 'Cat2' }
    ];

    it('renders thumbnails as accessible buttons', () => {
        render(<GalleryLightbox images={mockImages} />);

        // Check if images are rendered
        const img1 = screen.getByAltText('Image 1');
        expect(img1).toBeDefined();

        // Check parent element - should be a button
        // In the current implementation (before fix), this is a div, so this test will fail
        const button1 = img1.closest('button');

        expect(button1).not.toBeNull();
        if (button1) {
             expect(button1.getAttribute('type')).toBe('button');
             // We can check aria-label directly or implied via alt, but explicitly setting aria-label on button is better for screen readers if image is decorative or just thumbnail
             // Actually, if the image has alt, the button might not need aria-label if it contains the image.
             // But for consistent accessible name calculation, aria-label on the button is robust.
             // Or at least checks if the accessible name of the button is "Image 1".
             expect(button1.getAttribute('aria-label')).toBe('Bild vergrößern: Image 1');
             expect(button1.className).toContain('focus-visible:ring-red-500');
        }
    });
});
