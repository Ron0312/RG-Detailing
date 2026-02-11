import React, { useState, useRef } from 'react';
import { ChevronsLeftRight } from 'lucide-react';

export default function BeforeAfterSlider({ beforeImage, afterImage, alt = "Vorher Nachher Vergleich" }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);
  const ticking = useRef(false);
  const latestClientX = useRef(0);

  const updatePosition = () => {
    if (!containerRef.current) {
        ticking.current = false;
        return;
    }
    const rect = containerRef.current.getBoundingClientRect();
    const pos = ((latestClientX.current - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(100, Math.max(0, pos)));
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

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video overflow-hidden rounded-xl shadow-2xl cursor-col-resize select-none touch-none focus-visible:ring-4 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 outline-none"
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="slider"
      aria-label={alt}
      aria-valuenow={Math.round(sliderPosition)}
      aria-valuemin={0}
      aria-valuemax={100}
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
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
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
        className="absolute inset-y-0 w-1 bg-red-600 cursor-col-resize z-10 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        style={{ left: `${sliderPosition}%` }}
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
