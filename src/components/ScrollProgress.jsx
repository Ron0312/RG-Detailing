import React, { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const progressRef = useRef(null);
  const ticking = useRef(false);

  const dimensions = useRef({ scrollHeight: 0, clientHeight: 0 });

  useEffect(() => {
    // ⚡ Bolt Optimization: Cache layout properties to prevent layout thrashing
    const updateDimensions = () => {
      const el = document.documentElement;
      dimensions.current.scrollHeight = el.scrollHeight || document.body.scrollHeight;
      dimensions.current.clientHeight = el.clientHeight || window.innerHeight;
      updateProgress();
    };

    const updateProgress = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const el = document.documentElement;
          // Reading scrollTop is fast, reading scrollHeight/clientHeight causes reflows
          const scrollTop = el.scrollTop || document.body.scrollTop;
          const { scrollHeight, clientHeight } = dimensions.current;

          const maxScroll = scrollHeight - clientHeight;
          const percent = maxScroll > 0 ? scrollTop / maxScroll : 0;
          const clampedPercent = Math.min(Math.max(percent, 0), 1);

          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${clampedPercent})`;
          }
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    // Initial calculations
    updateDimensions();

    // Setup ResizeObserver for document body
    let observer;
    if (typeof window !== 'undefined' && 'ResizeObserver' in window) {
      observer = new ResizeObserver(updateDimensions);
      observer.observe(document.body);
    }

    // ⚡ Add passive flag to prevent blocking main thread
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateDimensions, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateDimensions);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 h-1 z-[1000] bg-zinc-800 w-full">
      <div
        ref={progressRef}
        className="h-full bg-red-600 transition-transform duration-100 ease-out origin-left"
        style={{ transform: 'scaleX(0)' }}
      ></div>
    </div>
  );
}
