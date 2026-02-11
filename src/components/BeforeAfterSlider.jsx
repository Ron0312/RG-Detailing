import React, { useRef } from 'react';
import { ChevronsLeftRight } from 'lucide-react';

export default function BeforeAfterSlider({ beforeImage, afterImage, alt = "Vorher Nachher Vergleich" }) {
  const containerRef = useRef(null);
  const beforeImageRef = useRef(null);
  const handleRef = useRef(null);
  const ticking = useRef(false);
  const latestClientX = useRef(0);
  const positionRef = useRef(50); // Store position for re-renders

  const updatePosition = () => {
    if (!containerRef.current) {
        ticking.current = false;
        return;
    }
    const rect = containerRef.current.getBoundingClientRect();
    const pos = ((latestClientX.current - rect.left) / rect.width) * 100;
    const clampedPos = Math.min(100, Math.max(0, pos));

    // Update ref so that if component re-renders (e.g. from parent),
    // it picks up the current position instead of resetting to initial.
    positionRef.current = clampedPos;

    // Direct DOM manipulation to avoid re-renders during drag
    if (beforeImageRef.current) {
        beforeImageRef.current.style.clipPath = `inset(0 ${100 - clampedPos}% 0 0)`;
    }
    if (handleRef.current) {
        handleRef.current.style.left = `${clampedPos}%`;
    }

    ticking.current = false;
  };

  const handleMove = (clientX) => {
    latestClientX.current = clientX;
    if (!ticking.current) {
      window.requestAnimationFrame(updatePosition);
      ticking.current = true;
    }
  };

  const onMouseMove = (e) => handleMove(e.clientX);
  const onTouchMove = (e) => handleMove(e.touches[0].clientX);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video overflow-hidden rounded-xl shadow-2xl cursor-col-resize select-none touch-none"
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
    >
      {/* After Image (Background) */}
      <img
        src={afterImage}
        alt={`Nachher: ${alt}`}
        className="absolute inset-0 w-full h-full object-cover"
        draggable="false"
      />

      {/* Before Image (Foreground) - Clipped */}
      <div
        ref={beforeImageRef}
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: `inset(0 ${100 - positionRef.current}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt={`Vorher: ${alt}`}
          className="w-full h-full object-cover"
          draggable="false"
        />
      </div>

      {/* Slider Handle */}
      <div
        ref={handleRef}
        className="absolute inset-y-0 w-1 bg-red-600 cursor-col-resize z-10 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        style={{ left: `${positionRef.current}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900 rounded-full p-2 shadow-lg border border-red-600 flex items-center justify-center">
            <ChevronsLeftRight className="text-white w-4 h-4" />
        </div>
      </div>

      <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs font-bold pointer-events-none backdrop-blur-sm">VORHER</div>
      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs font-bold pointer-events-none backdrop-blur-sm">NACHHER</div>
    </div>
  );
}
