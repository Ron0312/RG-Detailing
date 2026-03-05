import React, { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const progressRef = useRef(null);
  const ticking = useRef(false);
  const maxScrollRef = useRef(0);

  useEffect(() => {
    // OPTIMIZATION: Cache maxScroll to avoid reading layout properties (scrollHeight/clientHeight)
    // on every scroll event, which causes layout thrashing (synchronous reflows).
    const calculateMaxScroll = () => {
      const el = document.documentElement;
      const scrollHeight = el.scrollHeight || document.body.scrollHeight;
      const clientHeight = el.clientHeight || window.innerHeight;
      maxScrollRef.current = scrollHeight - clientHeight;
    };

    calculateMaxScroll();

    window.addEventListener('resize', calculateMaxScroll, { passive: true });

    let observer;
    if (typeof ResizeObserver !== 'undefined') {
        observer = new ResizeObserver(calculateMaxScroll);
        observer.observe(document.body);
    }

    const updateProgress = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const el = document.documentElement;
          // Reading scrollTop does not force layout if we don't read scrollHeight/clientHeight
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

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('resize', calculateMaxScroll);
      window.removeEventListener('scroll', updateProgress);
      if (observer) {
          observer.disconnect();
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
