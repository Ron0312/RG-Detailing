// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { render, act } from '@testing-library/react';
import React from 'react';
import ParticleHero from './ParticleHero';

describe('ParticleHero Performance', () => {
  let requestAnimationFrameSpy;
  let cancelAnimationFrameSpy;
  let observeSpy;
  let unobserveSpy;
  let intersectionCallback;

  beforeEach(() => {
    vi.useFakeTimers();

    // Mock requestAnimationFrame to control execution
    requestAnimationFrameSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      return setTimeout(cb, 16);
    });

    cancelAnimationFrameSpy = vi.spyOn(window, 'cancelAnimationFrame').mockImplementation((id) => {
      clearTimeout(id);
    });

    // Mock Canvas getContext
    HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
        clearRect: vi.fn(),
        beginPath: vi.fn(),
        arc: vi.fn(),
        fill: vi.fn(),
    }));

    // Mock IntersectionObserver
    observeSpy = vi.fn();
    unobserveSpy = vi.fn();
    window.IntersectionObserver = vi.fn(function(callback) {
      intersectionCallback = callback;
      return {
        observe: observeSpy,
        unobserve: unobserveSpy,
        disconnect: vi.fn(),
      };
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('starts animation only when visible', () => {
    render(<ParticleHero />);

    // Simulate becoming visible
    act(() => {
        if (intersectionCallback) {
            intersectionCallback([{ isIntersecting: true }]);
        }
    });

    expect(requestAnimationFrameSpy).toHaveBeenCalled();
  });

  it('stops animation when hidden', () => {
    render(<ParticleHero />);

    // Visible first
    act(() => {
        if (intersectionCallback) {
            intersectionCallback([{ isIntersecting: true }]);
        }
    });

    // Clear previous calls
    requestAnimationFrameSpy.mockClear();

    // Hidden
    act(() => {
        if (intersectionCallback) {
            intersectionCallback([{ isIntersecting: false }]);
        }
    });

    // Advance time to allow any pending frame to fire and then stop
    act(() => {
        vi.advanceTimersByTime(100);
    });

    const callsAfterHidden = requestAnimationFrameSpy.mock.calls.length;

    // Advance more time
    act(() => {
        vi.advanceTimersByTime(1000);
    });

    // Should be strictly equal (no new calls)
    expect(requestAnimationFrameSpy.mock.calls.length).toBe(callsAfterHidden);
  });
});
