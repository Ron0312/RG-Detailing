import React from 'react';

// Common terms to link. In a real app, pass this from props or a store to avoid duplication.
const TERMS = {
    'Keramikversiegelung': '/glossar/keramikversiegelung',
    'Trockendampf': '/glossar/trockendampf',
    'Hologramme': '/glossar/hologramme',
    'Standzeit': '/glossar/standzeit',
    'Kneten': '/glossar/kneten',
    'Polieren': '/glossar/polieren',
    'Flugrost': '/glossar/flugrost'
};

export default function GlossaryLinker({ text }) {
    if (!text) return null;

    // Create a regex to find all terms, case-insensitive
    const regex = new RegExp(`(${Object.keys(TERMS).join('|')})`, 'gi');

    const parts = text.split(regex);

    return (
        <>
            {parts.map((part, i) => {
                // Check if this part matches a term (case-insensitive check)
                const lowerPart = part.toLowerCase();
                const matchedTerm = Object.keys(TERMS).find(t => t.toLowerCase() === lowerPart);

                if (matchedTerm) {
                    return (
                        <a
                            key={i}
                            href={TERMS[matchedTerm]}
                            className="text-white border-b border-red-500/50 hover:text-red-500 hover:border-red-500 transition-colors cursor-help decoration-dotted pointer-events-auto relative z-20"
                            title={`Definition: ${matchedTerm}`}
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
