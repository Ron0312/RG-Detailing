import React, { useRef, useEffect, useState } from 'react';

export default function ScrollReveal({ children, animation = 'fade-up', delay = 0 }) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current);
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
