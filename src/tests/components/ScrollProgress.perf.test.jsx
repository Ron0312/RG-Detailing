// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import ScrollProgress from '../../components/ScrollProgress';

describe('ScrollProgress Performance', () => {
  let requestAnimationFrameSpy;

  beforeEach(() => {
    requestAnimationFrameSpy = vi.spyOn(window, 'requestAnimationFrame');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('throttles scroll events using requestAnimationFrame', () => {
    render(<ScrollProgress />);

    // Simulate rapid scroll events
    for (let i = 0; i < 10; i++) {
        fireEvent.scroll(window, { target: { scrollY: 100 * i } });
    }

    // In the optimized version, requestAnimationFrame SHOULD be called.
    expect(requestAnimationFrameSpy).toHaveBeenCalled();
  });
});
