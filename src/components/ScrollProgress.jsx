import React, { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const progressRef = useRef(null);
  const ticking = useRef(false);

  const maxScrollRef = useRef(0);

  useEffect(() => {
    const calculateMaxScroll = () => {
      const el = document.documentElement;
      const scrollHeight = el.scrollHeight || document.body.scrollHeight;
      const clientHeight = el.clientHeight || window.innerHeight;
      maxScrollRef.current = scrollHeight - clientHeight;
    };

    // Initial calculation
    calculateMaxScroll();

    // Recalculate on resize or layout changes to prevent layout thrashing in scroll event
    window.addEventListener('resize', calculateMaxScroll, { passive: true });

    let resizeObserver;
    if (typeof window !== 'undefined' && 'ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(calculateMaxScroll);
      resizeObserver.observe(document.body);
    }

    const updateProgress = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const el = document.documentElement;
          const scrollTop = el.scrollTop || document.body.scrollTop;

          const maxScroll = maxScrollRef.current;
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

    // Add passive: true for better scrolling performance
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', calculateMaxScroll);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
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
