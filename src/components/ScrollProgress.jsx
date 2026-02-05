import React, { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const progressBarRef = useRef(null);
  const ticking = useRef(false);

  const updateProgress = () => {
    if (!ticking.current) {
      ticking.current = true;
      window.requestAnimationFrame(() => {
        if (progressBarRef.current) {
          const el = document.documentElement;
          const scrollTop = el.scrollTop || document.body.scrollTop;
          const scrollHeight = el.scrollHeight || document.body.scrollHeight;
          const clientHeight = el.clientHeight;

          // Avoid division by zero
          const scrollableHeight = scrollHeight - clientHeight;
          const progress = scrollableHeight > 0 ? scrollTop / scrollableHeight : 0;

          progressBarRef.current.style.transform = `scaleX(${progress})`;
        }
        ticking.current = false;
      });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress); // Recalculate on resize too
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 h-1 z-[1000] bg-zinc-800 w-full">
      <div
        ref={progressBarRef}
        className="h-full bg-red-600 origin-left"
        style={{ transform: 'scaleX(0)' }}
      ></div>
    </div>
  );
}
