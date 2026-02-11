// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import React from 'react';
import BeforeAfterSlider from './BeforeAfterSlider';

describe('BeforeAfterSlider Accessibility', () => {
    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    it('renders with correct accessibility attributes', () => {
        render(
            <BeforeAfterSlider
                beforeImage="/before.jpg"
                afterImage="/after.jpg"
                alt="Car Detailing Comparison"
            />
        );

        const slider = screen.getByRole('slider');

        expect(slider).not.toBeNull();
        expect(slider.getAttribute('aria-label')).toBe('Car Detailing Comparison');
        expect(slider.getAttribute('aria-valuemin')).toBe('0');
        expect(slider.getAttribute('aria-valuemax')).toBe('100');
        // Initial position is 50
        expect(slider.getAttribute('aria-valuenow')).toBe('50');
        expect(slider.getAttribute('tabindex')).toBe('0');
    });

    it('updates value on keyboard interaction', () => {
        render(
            <BeforeAfterSlider
                beforeImage="/before.jpg"
                afterImage="/after.jpg"
                alt="Car Detailing Comparison"
            />
        );

        const slider = screen.getByRole('slider');
        slider.focus();

        // Press ArrowRight
        fireEvent.keyDown(slider, { key: 'ArrowRight', code: 'ArrowRight' });
        expect(slider.getAttribute('aria-valuenow')).toBe('55'); // 50 + 5

        // Press ArrowLeft
        fireEvent.keyDown(slider, { key: 'ArrowLeft', code: 'ArrowLeft' });
        expect(slider.getAttribute('aria-valuenow')).toBe('50'); // 55 - 5
    });
});
