// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import BeforeAfterSlider from './BeforeAfterSlider';

describe('BeforeAfterSlider Performance', () => {
  let requestAnimationFrameSpy;

  beforeEach(() => {
    // Mock getBoundingClientRect
    Element.prototype.getBoundingClientRect = vi.fn(() => ({
      width: 1000,
      height: 500,
      top: 0,
      left: 0,
      bottom: 500,
      right: 1000,
      x: 0,
      y: 0,
      toJSON: () => {},
    }));

    // We want to execute the callback immediately to see effects
    requestAnimationFrameSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => cb());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('optimizes move events using requestAnimationFrame and updates DOM', async () => {
    render(
      <BeforeAfterSlider
        beforeImage="/before.jpg"
        afterImage="/after.jpg"
      />
    );

    const container = screen.getByText('VORHER').parentElement;

    // Initial state: 50%
    const handle = container.querySelector('.bg-red-600.cursor-col-resize');
    expect(handle).not.toBeNull();
    // In JSDOM, style.left might be empty if set via CSS class, but here it is set via inline style.
    // Initial render sets it to 50%
    expect(handle.style.left).toBe('50%');

    // Simulate mouse move to 75% (750px)
    fireEvent.mouseMove(container, { clientX: 750 });

    // Since we mocked RAF to run immediately, the update should be applied.
    expect(requestAnimationFrameSpy).toHaveBeenCalled();

    // Verify new position
    // (750 - 0) / 1000 * 100 = 75%
    expect(handle.style.left).toBe('75%');

    // Verify clipping path of the before image container
    // The before image container is the one with clipPath
    // We can find it by finding the image inside it?
    // The structure is:
    // div (relative) -> img (after)
    //                -> div (absolute, clipPath) -> img (before)

    const beforeImage = screen.getByAltText('Vorher: Vorher Nachher Vergleich');
    const beforeContainer = beforeImage.parentElement;

    expect(beforeContainer.style.clipPath).toBe('inset(0 25% 0 0)'); // 100 - 75 = 25
  });
});
