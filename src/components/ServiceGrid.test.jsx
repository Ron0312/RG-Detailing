// @vitest-environment jsdom
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import React from 'react';
import ServiceGrid from './ServiceGrid';

vi.mock('../lib/analytics', () => ({
  trackEvent: vi.fn(),
}));

// Mock GlossaryLinker to simplify testing
vi.mock('./GlossaryLinker', () => ({
    default: ({ text }) => <span>{text}</span>
}));

const mockServices = [
    { title: 'Service 1', category: 'Lack & Keramik', icon: 'shield', shortDescription: 'Desc 1', link: '#' },
    { title: 'Service 2', category: 'Spezial & Reparatur', icon: 'sparkles', shortDescription: 'Desc 2', link: '#' },
    { title: 'Service 3', category: 'Innen & Sonstiges', icon: 'droplet', shortDescription: 'Desc 3', link: '#' },
];

describe('ServiceGrid', () => {
    let observeMock;
    let disconnectMock;

    beforeEach(() => {
        observeMock = vi.fn();
        disconnectMock = vi.fn();
        window.IntersectionObserver = vi.fn().mockImplementation(function() {
            return {
                observe: observeMock,
                disconnect: disconnectMock,
                unobserve: vi.fn(),
            };
        });
        // Mock scrollTo
        Element.prototype.scrollTo = vi.fn();
    });

    afterEach(() => {
        vi.restoreAllMocks();
        cleanup();
    });

    it('renders categories and initial services correctly', () => {
        const { getByRole, getByText, queryByText } = render(<ServiceGrid services={mockServices} />);

        // Check Categories are present
        expect(getByRole('button', { name: 'Lack & Keramik' })).toBeDefined();
        expect(getByRole('button', { name: 'Spezial & Reparatur' })).toBeDefined();

        // Check Initial Service (Lack & Keramik) is present
        expect(getByText('Service 1')).toBeDefined();

        // Check Other Services are NOT present
        expect(queryByText('Service 2')).toBeNull();
    });

    it('navigates to slide when pagination dot is clicked', () => {
         // Use services that match the default category "Lack & Keramik"
         const servicesInDefaultCat = [
            { title: 'S1', category: 'Lack & Keramik', icon: 'shield', shortDescription: 'D1', link: '#' },
            { title: 'S2', category: 'Lack & Keramik', icon: 'shield', shortDescription: 'D2', link: '#' },
         ];

         const { getByLabelText, container } = render(<ServiceGrid services={servicesInDefaultCat} />);

         const scrollContainer = container.querySelector('.flex.overflow-x-auto');
         Object.defineProperty(scrollContainer, 'offsetWidth', { configurable: true, value: 300 });

         const slide2Button = getByLabelText('Gehe zu Slide 2');
         fireEvent.click(slide2Button);

         // Element.prototype.scrollTo is mocked in beforeEach
         expect(scrollContainer.scrollTo).toHaveBeenCalledWith({
            left: 300,
            behavior: 'smooth'
         });
    });

    it('filters services when category is clicked', async () => {
        const { getByRole, getByText, queryByText } = render(<ServiceGrid services={mockServices} />);

        const categoryButton = getByRole('button', { name: 'Spezial & Reparatur' });
        fireEvent.click(categoryButton);

        await waitFor(() => {
             expect(getByText('Service 2')).toBeDefined();
             expect(queryByText('Service 1')).toBeNull();
        });
    });

    it('renders accessible category buttons', () => {
        const { getByRole } = render(<ServiceGrid services={mockServices} />);

        // 'Lack & Keramik' button should be pressed by default
        const lackButton = getByRole('button', { name: 'Lack & Keramik' });
        expect(lackButton.getAttribute('aria-pressed')).toBe('true');
        expect(lackButton.className).toContain('focus-visible:ring-red-500');

        // 'Spezial & Reparatur' button should not be pressed
        const spezialButton = getByRole('button', { name: 'Spezial & Reparatur' });
        expect(spezialButton.getAttribute('aria-pressed')).toBe('false');
        expect(spezialButton.className).toContain('focus-visible:ring-red-500');
    });

    it('renders accessible calculator link', () => {
        const { getByRole } = render(<ServiceGrid services={mockServices} />);

        const calcLink = getByRole('link', { name: /Preis jetzt berechnen/i });
        expect(calcLink.className).toContain('focus-visible:ring-red-500');
    });
});
