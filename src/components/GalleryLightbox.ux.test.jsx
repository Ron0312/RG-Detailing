// @vitest-environment jsdom
import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import GalleryLightbox from './GalleryLightbox';

// Mock the lightbox component to capture props via data attribute
vi.mock('yet-another-react-lightbox', () => ({
  default: (props) => <div data-testid="lightbox-mock" data-props={JSON.stringify(props)}>Lightbox</div>
}));

// Mock plugins
vi.mock('yet-another-react-lightbox/plugins/zoom', () => ({ default: {} }));
vi.mock('yet-another-react-lightbox/plugins/captions', () => ({ default: {} }));

describe('GalleryLightbox UX', () => {
    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
    });

    const mockImages = [
        { src: 'img1.jpg', alt: 'Image 1', category: 'Cat1' },
        { src: 'img2.jpg', alt: 'Image 2', category: 'Cat2' },
        { src: 'img3.jpg', alt: 'Image 3', category: 'Cat1' }
    ];

    it('passes filtered images to Lightbox when category is selected', async () => {
        render(<GalleryLightbox images={mockImages} limit={10} />);

        // Click filter button for 'Cat1'
        const filterBtn = screen.getByText('Cat1');
        fireEvent.click(filterBtn);

        // Click the first visible image (should be Cat1 - img1)
        // Note: With filter applied, img1 is index 0, img3 is index 1.
        // img2 (Cat2) is filtered out.
        const img1 = screen.getByAltText('Image 1');
        const button1 = img1.closest('button');
        fireEvent.click(button1);

        const lightbox = await screen.findByTestId('lightbox-mock');
        const props = JSON.parse(lightbox.getAttribute('data-props'));

        // Assert that slides only contain Cat1 images
        // If fail (current behavior): it will have 3 images
        expect(props.slides).toHaveLength(2);
        expect(props.slides[0].src).toBe('img1.jpg');
        expect(props.slides[1].src).toBe('img3.jpg');

        // Also assert index is correct (relative to filtered list)
        // Clicked first visible image -> index 0
        expect(props.index).toBe(0);
    });

    it('passes all images when "Alle" is selected', async () => {
        render(<GalleryLightbox images={mockImages} limit={10} />);

        // Default is "Alle"

        // Click second image (img2 - Cat2) -> index 1 in full list
        const img2 = screen.getByAltText('Image 2');
        const button2 = img2.closest('button');
        fireEvent.click(button2);

        const lightbox = await screen.findByTestId('lightbox-mock');
        const props = JSON.parse(lightbox.getAttribute('data-props'));

        expect(props.slides).toHaveLength(3);
        expect(props.index).toBe(1);
    });
});
