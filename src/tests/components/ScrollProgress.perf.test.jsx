// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import ScrollProgress from '../../components/ScrollProgress';

describe('ScrollProgress Performance', () => {
  let requestAnimationFrameSpy;

  beforeEach(() => {
    vi.useFakeTimers();
    // Mock requestAnimationFrame to execute callback immediately for synchronous testing
    requestAnimationFrameSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => cb());

    // Mock document properties for scroll calculation
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 1000, configurable: true });
    Object.defineProperty(document.documentElement, 'clientHeight', { value: 500, configurable: true });
    Object.defineProperty(document.documentElement, 'scrollTop', { value: 0, configurable: true });
    Object.defineProperty(document.body, 'scrollTop', { value: 0, configurable: true });
    Object.defineProperty(document.body, 'scrollHeight', { value: 1000, configurable: true });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('updates transform style on scroll using requestAnimationFrame', () => {
    const { container } = render(<ScrollProgress />);
    const progressBar = container.firstChild.firstChild;

    // Initial state
    expect(progressBar.style.transform).toBe('scaleX(0)');

    // Simulate scroll to 50%
    // Scrollable height = 1000 - 500 = 500
    // Scroll top = 250
    // Progress = 250 / 500 = 0.5
    Object.defineProperty(document.documentElement, 'scrollTop', { value: 250, configurable: true });
    fireEvent.scroll(window);

    expect(requestAnimationFrameSpy).toHaveBeenCalled();
    expect(progressBar.style.transform).toBe('scaleX(0.5)');

    // Simulate scroll to 100%
    Object.defineProperty(document.documentElement, 'scrollTop', { value: 500, configurable: true });
    fireEvent.scroll(window);

    expect(progressBar.style.transform).toBe('scaleX(1)');
  });
});
