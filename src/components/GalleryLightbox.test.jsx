// @vitest-environment jsdom
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import GalleryLightbox from './GalleryLightbox';
import React from 'react';

// Mock yet-another-react-lightbox
vi.mock('yet-another-react-lightbox', () => ({
  default: ({ open, close, slides, index }) => {
    if (!open) return null;
    return (
      <div data-testid="lightbox">
        Lightbox Open: {slides[index]?.alt}
        <button onClick={close}>Close</button>
      </div>
    );
  }
}));

// Mock plugins/zoom
vi.mock('yet-another-react-lightbox/plugins/zoom', () => ({
  default: {}
}));

describe('GalleryLightbox', () => {
  afterEach(() => {
    cleanup();
  });

  const images = [
    { src: 'img1.jpg', thumbnail: 'thumb1.jpg', alt: 'Image 1', category: 'Cat1' },
    { src: 'img2.jpg', thumbnail: 'thumb2.jpg', alt: 'Image 2', category: 'Cat1' },
    { src: 'img3.jpg', thumbnail: 'thumb3.jpg', alt: 'Image 3', category: 'Cat2' },
  ];

  it('renders all images initially', () => {
    render(<GalleryLightbox images={images} />);

    // Check if category buttons are rendered
    expect(screen.getAllByText('Alle').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Cat1').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Cat2').length).toBeGreaterThan(0);

    // Check if all images are rendered (thumbnails)
    const imgs = screen.getAllByRole('img');
    expect(imgs).toHaveLength(3);
  });

  it('filters images when category is clicked', () => {
    render(<GalleryLightbox images={images} />);

    // Click on 'Cat2'
    const cat2Buttons = screen.getAllByText('Cat2');
    fireEvent.click(cat2Buttons[0]);

    // Check if only 1 image is rendered
    const imgs = screen.getAllByRole('img');
    expect(imgs).toHaveLength(1);
    expect(imgs[0].getAttribute('alt')).toBe('Image 3');
  });

  it('opens lightbox on image click', () => {
    render(<GalleryLightbox images={images} />);

    // Click on the first image
    const imgs = screen.getAllByRole('img');
    fireEvent.click(imgs[0]);

    // Check if lightbox is open
    expect(screen.getByTestId('lightbox')).toBeTruthy();
    // Since we clicked the first image (Image 1), index should correspond to it.
    expect(screen.getByText('Lightbox Open: Image 1')).toBeTruthy();
  });
});
