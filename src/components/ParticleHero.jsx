import React, { useRef, useEffect } from 'react';

// Simple debounce utility
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Particle class optimization: moved outside component to avoid re-creation
class Particle {
    constructor(width, height) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.1;
    }

    update(width, height) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen edges
        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.y < 0) this.y = height;
    }

    draw(ctx) {
        // Optimization: Use globalAlpha instead of parsing rgba string
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

export default function ParticleHero() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true }); // optimize for transparency? No, 'alpha: true' is default.
        let animationFrameId;
        let particles = [];
        let isAnimating = false;

        // Cache dimensions to avoid DOM layout thrashing in loop
        let canvasWidth = 0;
        let canvasHeight = 0;

        const resize = () => {
            canvasWidth = window.innerWidth;
            canvasHeight = window.innerHeight;
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
        };

        // Initial setup
        resize();

        // Handle resize with debounce
        const debouncedResize = debounce(resize, 200);
        window.addEventListener('resize', debouncedResize);

        const init = () => {
            particles = [];
            const numberOfParticles = Math.min(canvasWidth * 0.05, 100); // Responsive count using cached width
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle(canvasWidth, canvasHeight));
            }
        };

        const animate = () => {
            if (!isAnimating) return;

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            // Optimization: Set fillStyle once per frame (since all particles are white)
            ctx.fillStyle = 'white';

            particles.forEach(particle => {
                particle.update(canvasWidth, canvasHeight);
                particle.draw(ctx);
            });

            // Reset globalAlpha for other potential drawing operations (good practice)
            ctx.globalAlpha = 1.0;

            animationFrameId = requestAnimationFrame(animate);
        };

        init();

        // Intersection Observer to pause animation when off-screen
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                if (!isAnimating) {
                    isAnimating = true;
                    animate();
                }
            } else {
                isAnimating = false;
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                }
            }
        });

        observer.observe(canvas);

        return () => {
            window.removeEventListener('resize', debouncedResize);
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            observer.disconnect();
            isAnimating = false;
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-60"
            style={{ width: '100%', height: '100%' }}
        />
    );
}
