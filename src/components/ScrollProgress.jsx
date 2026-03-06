import React, { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const progressRef = useRef(null);
  const ticking = useRef(false);
  const layoutCache = useRef({ scrollHeight: 0, clientHeight: 0 });

  useEffect(() => {
    const updateProgress = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const el = document.documentElement;
          // scrollTop is the only dynamic property during scroll, doesn't force synchronous reflow
          // if we aren't also querying layout properties like offsetHeight in the same frame
          const scrollTop = el.scrollTop || document.body.scrollTop;

          const { scrollHeight, clientHeight } = layoutCache.current;

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

    // ⚡ BOLT OPTIMIZATION: Cache expensive layout properties to prevent layout thrashing
    // during scroll events. We only update these when the window resizes or DOM mutates.
    const updateLayoutCache = () => {
      const el = document.documentElement;
      layoutCache.current = {
        scrollHeight: el.scrollHeight || document.body.scrollHeight,
        clientHeight: el.clientHeight || window.innerHeight
      };
      // We don't call updateProgress() directly here because it uses requestAnimationFrame
      // which is better for performance, we just update the cache.
      if (progressRef.current) {
        // Manually trigger a progress update to reflect new layout
        updateProgress();
      }
    };

    // Initial calculation
    updateLayoutCache();

    // Re-calculate on resize
    window.addEventListener('resize', updateLayoutCache, { passive: true });

    // Watch for DOM mutations that might change scrollHeight
    let resizeObserver = null;
    if (typeof window !== 'undefined' && typeof window.ResizeObserver !== 'undefined') {
      resizeObserver = new window.ResizeObserver(updateLayoutCache);
      resizeObserver.observe(document.body);
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateLayoutCache);
      if (resizeObserver) resizeObserver.disconnect();
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
