// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { render, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import ScrollProgress from './ScrollProgress';

describe('ScrollProgress Performance', () => {
  let requestAnimationFrameSpy;
  let observeSpy;
  let disconnectSpy;

  beforeEach(() => {
    // Mock requestAnimationFrame to execute callback asynchronously
    requestAnimationFrameSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => setTimeout(cb, 0));

    // Mock ResizeObserver
    observeSpy = vi.fn();
    disconnectSpy = vi.fn();
    window.ResizeObserver = vi.fn(function() {
      this.observe = observeSpy;
      this.disconnect = disconnectSpy;
    });

    // Mock document properties for scroll calculations
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 2000, writable: true });
    Object.defineProperty(document.documentElement, 'clientHeight', { value: 1000, writable: true });
    Object.defineProperty(document.documentElement, 'scrollTop', { value: 0, writable: true });
    Object.defineProperty(document.body, 'scrollTop', { value: 0, writable: true });
    Object.defineProperty(document.body, 'scrollHeight', { value: 2000, writable: true });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('throttles scroll events using requestAnimationFrame', () => {
    render(<ScrollProgress />);

    // Simulate rapid scroll events
    for (let i = 0; i < 10; i++) {
        fireEvent.scroll(window);
    }

    // It should be called at least once
    expect(requestAnimationFrameSpy).toHaveBeenCalled();
  });

  it('updates transform style on scroll', async () => {
    const { container } = render(<ScrollProgress />);
    const progressBar = container.querySelector('div > div');

    // Wait for initial render and RAF
    await new Promise(resolve => setTimeout(resolve, 0));

    // Ensure element is found
    expect(progressBar).not.toBeNull();

    // Initial state
    expect(progressBar.outerHTML).toContain('transform: scaleX(0)');

    // Set scroll position to 50%
    // maxScroll = 2000 - 1000 = 1000
    // scrollTop = 500
    // percent = 500 / 1000 = 0.5
    Object.defineProperty(document.documentElement, 'scrollTop', { value: 500, writable: true });

    // Trigger scroll event
    fireEvent.scroll(window);

    // Wait for RAF
    await new Promise(resolve => setTimeout(resolve, 0));

    // Check if transform is updated
    expect(progressBar.outerHTML).toContain('scaleX(0.5)');
  });

  it('updates dimensions correctly on resize', async () => {
    const { container } = render(<ScrollProgress />);
    const progressBar = container.querySelector('div > div');

    // Wait for initial render and RAF
    await new Promise(resolve => setTimeout(resolve, 0));

    // Initially document.documentElement.scrollHeight is 2000, clientHeight is 1000
    // Setup state where percent would be 1 if scrollTop is 1000 (maxScroll = 1000)
    Object.defineProperty(document.documentElement, 'scrollTop', { value: 1000, writable: true });
    fireEvent.scroll(window);
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(progressBar.outerHTML).toContain('scaleX(1)');

    // Now trigger resize event where document.documentElement.scrollHeight grows to 3000
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 3000, writable: true });
    fireEvent.resize(window);

    // Trigger scroll event again so the new layout applies
    fireEvent.scroll(window);
    await new Promise(resolve => setTimeout(resolve, 0));

    // After resize, maxScroll = 3000 - 1000 = 2000
    // scrollTop = 1000
    // percent = 1000 / 2000 = 0.5
    expect(progressBar.outerHTML).toContain('scaleX(0.5)');
  });

  it('sets up and cleans up ResizeObserver and event listeners properly', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = render(<ScrollProgress />);

    // Should add event listeners with passive: true
    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true });
    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function), { passive: true });

    // Should observe document.body
    expect(observeSpy).toHaveBeenCalledWith(document.body);

    unmount();

    // Should remove event listeners
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));

    // Should disconnect observer
    expect(disconnectSpy).toHaveBeenCalled();
  });
});
