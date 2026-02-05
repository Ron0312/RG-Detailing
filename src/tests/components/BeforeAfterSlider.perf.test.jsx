// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import BeforeAfterSlider from '../../components/BeforeAfterSlider';

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

    requestAnimationFrameSpy = vi.spyOn(window, 'requestAnimationFrame');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('optimizes move events using requestAnimationFrame', async () => {
    render(
      <BeforeAfterSlider
        beforeImage="/before.jpg"
        afterImage="/after.jpg"
      />
    );

    const container = screen.getByText('VORHER').parentElement;

    // Simulate rapid mouse movements
    fireEvent.mouseMove(container, { clientX: 100 });
    fireEvent.mouseMove(container, { clientX: 200 });
    fireEvent.mouseMove(container, { clientX: 300 });

    // In the unoptimized version, requestAnimationFrame is NOT called.
    // In the optimized version, it SHOULD be called.

    // We expect this to fail initially (or we can assert logic based on current state).
    // For the purpose of the task, I will check if it was called, and if not, we know we need to optimize.

    // This assertion serves as our "measurement".
    // If count is 0, we are unoptimized (synchronous updates).
    // If count > 0, we are using RAF.
    console.log(`requestAnimationFrame calls: ${requestAnimationFrameSpy.mock.calls.length}`);

    // Verify optimization is active
    expect(requestAnimationFrameSpy).toHaveBeenCalled();
    expect(requestAnimationFrameSpy.mock.calls.length).toBeGreaterThan(0);
  });
});
