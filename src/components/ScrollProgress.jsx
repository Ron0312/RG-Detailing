import React, { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const progressRef = useRef(null);
  const ticking = useRef(false);

  useEffect(() => {
    const updateProgress = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const el = document.documentElement;
          const scrollTop = el.scrollTop || document.body.scrollTop;
          const scrollHeight = el.scrollHeight || document.body.scrollHeight;
          const clientHeight = el.clientHeight || window.innerHeight;

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

    window.addEventListener('scroll', updateProgress);
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
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
