// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
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
        const button1 = img1.closest('button');

        expect(button1).not.toBeNull();
        if (button1) {
             expect(button1.getAttribute('type')).toBe('button');
             expect(button1.getAttribute('aria-label')).toBe('Bild vergrößern: Image 1');
             expect(button1.className).toContain('focus-visible:ring-red-500');
        }
    });

    it('renders accessible filter buttons', () => {
        render(<GalleryLightbox images={mockImages} />);

        // 'Alle' button should be pressed by default
        const alleButton = screen.getByRole('button', { name: 'Alle' });
        expect(alleButton.getAttribute('aria-pressed')).toBe('true');
        expect(alleButton.className).toContain('focus-visible:ring-red-500');

        // 'Cat1' button should not be pressed
        const cat1Button = screen.getByRole('button', { name: 'Cat1' });
        expect(cat1Button.getAttribute('aria-pressed')).toBe('false');
        expect(cat1Button.className).toContain('focus-visible:ring-red-500');

        // Click Cat1
        fireEvent.click(cat1Button);
        expect(cat1Button.getAttribute('aria-pressed')).toBe('true');
        expect(alleButton.getAttribute('aria-pressed')).toBe('false');
    });

    it('renders accessible "show more" button', () => {
        render(<GalleryLightbox images={mockImages} limit={1} />);

        const showMoreButton = screen.getByRole('button', { name: /Mehr anzeigen/i });
        expect(showMoreButton.className).toContain('focus-visible:ring-red-500');
    });
});
