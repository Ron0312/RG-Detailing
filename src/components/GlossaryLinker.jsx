import React, { memo } from 'react';

// Common terms to link. In a real app, pass this from props or a store to avoid duplication.
// Optimization: Moved outside component to avoid re-creation on every render.
const TERMS = {
    'Keramikversiegelung': '/glossar/keramikversiegelung',
    'Trockendampf': '/glossar/trockendampf',
    'Hologramme': '/glossar/hologramme',
    'Standzeit': '/glossar/standzeit',
    'Kneten': '/glossar/kneten',
    'Polieren': '/glossar/polieren',
    'Flugrost': '/glossar/flugrost'
};

// Optimization: Pre-compute regex and lookup map to avoid re-creation on every render.
const REGEX = new RegExp(`(${Object.keys(TERMS).join('|')})`, 'gi');

const TERM_LOOKUP = Object.keys(TERMS).reduce((acc, key) => {
    acc[key.toLowerCase()] = {
        url: TERMS[key],
        term: key // Store original case for title
    };
    return acc;
}, {});

function GlossaryLinker({ text }) {
    if (!text) return null;

    const parts = text.split(REGEX);

    return (
        <>
            {parts.map((part, i) => {
                // Optimization: O(1) lookup instead of O(N) find
                const match = TERM_LOOKUP[part.toLowerCase()];

                if (match) {
                    return (
                        <a
                            key={i}
                            href={match.url}
                            className="text-white border-b border-red-500/50 hover:text-red-500 hover:border-red-500 transition-colors cursor-help decoration-dotted pointer-events-auto relative z-20"
                            title={`Definition: ${match.term}`}
                        >
                            {part}
                        </a>
                    );
                }
                return part;
            })}
        </>
    );
}

// Optimization: Prevent re-rendering in lists (like ServiceGrid) when unrelated state changes.
export default memo(GlossaryLinker);
