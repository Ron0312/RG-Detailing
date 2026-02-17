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

        // Quantize opacity to 0.1 steps to allow batching
        // Range: 0.1 to 0.6
        this.opacity = Math.round((Math.random() * 0.5 + 0.1) * 10) / 10;
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

    // Trace path instead of drawing immediately
    trace(ctx) {
        ctx.moveTo(this.x + this.size, this.y);
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    }
}

export default function ParticleHero() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        let animationFrameId;
        let particles = [];
        let buckets = {}; // { opacity: [particles] }
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
            buckets = {};
            const numberOfParticles = Math.min(canvasWidth * 0.05, 100);

            for (let i = 0; i < numberOfParticles; i++) {
                const p = new Particle(canvasWidth, canvasHeight);
                particles.push(p);

                // Group by opacity for batch drawing
                const key = p.opacity;
                if (!buckets[key]) buckets[key] = [];
                buckets[key].push(p);
            }
        };

        const animate = () => {
            if (!isAnimating) return;

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            // Optimization: Set fillStyle once per frame
            ctx.fillStyle = 'white';

            // Update all particles
            particles.forEach(p => p.update(canvasWidth, canvasHeight));

            // Batch draw by opacity bucket
            // This reduces draw calls from N (e.g. 50-100) to K (number of opacity steps, e.g. 5-6)
            for (const opacity in buckets) {
                const bucketParticles = buckets[opacity];
                if (bucketParticles.length === 0) continue;

                ctx.globalAlpha = parseFloat(opacity);
                ctx.beginPath();
                bucketParticles.forEach(p => p.trace(ctx));
                ctx.fill();
            }

            // Reset globalAlpha
            ctx.globalAlpha = 1.0;

            animationFrameId = requestAnimationFrame(animate);
        };

        init();

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
