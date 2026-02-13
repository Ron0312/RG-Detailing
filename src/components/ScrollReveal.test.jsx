/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import React from 'react';
import ScrollReveal from './ScrollReveal';

// Mock IntersectionObserver
const observeMock = vi.fn();
const unobserveMock = vi.fn();
const disconnectMock = vi.fn();

class MockIntersectionObserver {
  constructor(cb, options) {
    this.observe = observeMock;
    this.unobserve = unobserveMock;
    this.disconnect = disconnectMock;
  }
}

// Assign to window
window.IntersectionObserver = MockIntersectionObserver;
// Also spy on the constructor to count instantiations
const observerSpy = vi.spyOn(window, 'IntersectionObserver');

describe('ScrollReveal Optimization', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('should share a single IntersectionObserver instance across multiple components', () => {
    render(
      <>
        <ScrollReveal>Item 1</ScrollReveal>
        <ScrollReveal>Item 2</ScrollReveal>
        <ScrollReveal>Item 3</ScrollReveal>
      </>
    );

    // Currently this will be 3, but we want 1
    // We expect this to FAIL initially (it will be 3)
    expect(observerSpy).toHaveBeenCalledTimes(1);
  });

  it('should observe each element', () => {
    render(
      <>
        <ScrollReveal>Item 1</ScrollReveal>
        <ScrollReveal>Item 2</ScrollReveal>
      </>
    );

    expect(observeMock).toHaveBeenCalledTimes(2);
  });
});
