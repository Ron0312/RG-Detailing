import React, { useRef, useEffect, useState } from 'react';

// Shared observer state
const callbacks = new WeakMap();
let observer;

function getObserver() {
    if (typeof IntersectionObserver === 'undefined') return null;

    if (!observer) {
        observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const callback = callbacks.get(entry.target);
                    if (callback) {
                        callback();
                        // Once visible, we don't need to observe anymore for this one-time animation
                        observer.unobserve(entry.target);
                        callbacks.delete(entry.target);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
    }
    return observer;
}

export default function ScrollReveal({ children, animation = 'fade-up', delay = 0 }) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;

        const obs = getObserver();
        if (!obs) {
            // Fallback for environments without IntersectionObserver (e.g. old browsers or some test setups)
            setIsVisible(true);
            return;
        }

        // Register callback
        callbacks.set(ref.current, () => setIsVisible(true));

        // Start observing
        obs.observe(ref.current);

        return () => {
            if (ref.current) {
                obs.unobserve(ref.current);
                callbacks.delete(ref.current);
            }
        };
    }, []);

    const getAnimationClass = () => {
        if (!isVisible) return 'opacity-0 translate-y-8'; // Initial state for fade-up
        return 'opacity-100 translate-y-0';
    };

    return (
        <div
            ref={ref}
            className={`w-full transition-all duration-1000 ease-out ${getAnimationClass()}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}
