// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import React from 'react';
import GalleryLightbox from './GalleryLightbox';

vi.mock('../lib/analytics', () => ({
  trackEvent: vi.fn(),
}));

// Mock the Lightbox component
vi.mock('yet-another-react-lightbox', () => ({
    default: () => <div data-testid="lightbox-mock">Lightbox</div>
}));

vi.mock('yet-another-react-lightbox/plugins/zoom', () => ({ default: {} }));
vi.mock('yet-another-react-lightbox/plugins/captions', () => ({ default: {} }));

describe('GalleryLightbox Accessibility', () => {
    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    const mockImages = [
        { src: 'img1.jpg', alt: 'Image 1', category: 'Cat1' },
        { src: 'img2.jpg', alt: 'Image 2', category: 'Cat2' },
        { src: 'img3.jpg', alt: 'Image 3', category: 'Cat1' }
    ];

    it('renders thumbnails as accessible buttons', () => {
        render(<GalleryLightbox images={mockImages} />);

        const img1 = screen.getByAltText('Image 1');
        const button1 = img1.closest('button');

        expect(button1).not.toBeNull();
        if (button1) {
             expect(button1.getAttribute('type')).toBe('button');
             expect(button1.getAttribute('aria-label')).toBe('Bild vergrößern: Image 1');
             expect(button1.className).toContain('focus-visible:ring-red-500');
        }
    });

    it('renders filter buttons with correct accessibility attributes and focus styles', () => {
        render(<GalleryLightbox images={mockImages} />);

        // Check "Alle" button (active by default)
        const alleButton = screen.getByText('Alle');
        expect(alleButton).toBeDefined();
        expect(alleButton.getAttribute('aria-pressed')).toBe('true');
        expect(alleButton.className).toContain('focus-visible:ring-red-500');

        // Check "Cat1" button (inactive)
        const cat1Button = screen.getByText('Cat1');
        expect(cat1Button.getAttribute('aria-pressed')).toBe('false');
        expect(cat1Button.className).toContain('focus-visible:ring-red-500');

        // Click Cat1
        fireEvent.click(cat1Button);
        expect(alleButton.getAttribute('aria-pressed')).toBe('false');
        expect(cat1Button.getAttribute('aria-pressed')).toBe('true');
    });

    it('renders "Mehr anzeigen" button with correct focus styles', () => {
        // Force "Mehr anzeigen" to show by setting limit to 1
        render(<GalleryLightbox images={mockImages} limit={1} />);

        const showMoreButton = screen.getByText(/Mehr anzeigen/i);
        expect(showMoreButton).toBeDefined();
        expect(showMoreButton.className).toContain('focus-visible:ring-red-500');
    });
});
