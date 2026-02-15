// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import GlossaryLinker from './GlossaryLinker';

describe('GlossaryLinker', () => {
    afterEach(() => {
        cleanup();
    });

    it('renders text without changes if no terms match', () => {
        const text = "Das ist ein normaler Text ohne Fachbegriffe.";
        render(<GlossaryLinker text={text} />);
        expect(screen.getByText(text)).toBeDefined();
        // Should not have any links
        const links = screen.queryAllByRole('link');
        expect(links.length).toBe(0);
    });

    it('renders a link for a single known term (exact match)', () => {
        const text = "Wir bieten eine professionelle Keramikversiegelung an.";
        render(<GlossaryLinker text={text} />);

        // "Keramikversiegelung" should be a link
        const link = screen.getByRole('link', { name: /Keramikversiegelung/i });
        expect(link).toBeDefined();
        expect(link.getAttribute('href')).toBe('/glossar/keramikversiegelung');

        // The rest of the text should be present.
        expect(screen.getByText(/Wir bieten eine professionelle/)).toBeDefined();
    });

    it('renders a link for a single known term (case insensitive match)', () => {
        const text = "Unsere keramikversiegelung ist top.";
        render(<GlossaryLinker text={text} />);

        const link = screen.getByRole('link', { name: /keramikversiegelung/i });
        expect(link).toBeDefined();
        expect(link.getAttribute('href')).toBe('/glossar/keramikversiegelung');
    });

    it('renders multiple links for multiple terms', () => {
        const text = "Polieren entfernt Hologramme effektiv.";
        render(<GlossaryLinker text={text} />);

        const link1 = screen.getByRole('link', { name: /Polieren/i });
        const link2 = screen.getByRole('link', { name: /Hologramme/i });

        expect(link1).toBeDefined();
        expect(link2).toBeDefined();
        expect(link1.getAttribute('href')).toBe('/glossar/polieren');
        expect(link2.getAttribute('href')).toBe('/glossar/hologramme');
    });

    it('handles null or empty text gracefully', () => {
        const { container } = render(<GlossaryLinker text={null} />);
        expect(container.firstChild).toBeNull();
    });

    it('links parts of words if they match (current behavior)', () => {
        const text = "Keramikversiegelungen sind gut.";
        render(<GlossaryLinker text={text} />);

        // Should find link "Keramikversiegelung"
        const link = screen.getByRole('link', { name: /Keramikversiegelung/i });
        expect(link).toBeDefined();

        // "en sind gut." should be text
        expect(screen.getByText(/en sind gut/)).toBeDefined();
    });
});
