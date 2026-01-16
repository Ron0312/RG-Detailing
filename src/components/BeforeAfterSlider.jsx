import React, { useState, useRef } from 'react';

export default function BeforeAfterSlider({ beforeImage, afterImage, alt = "Vorher Nachher Vergleich" }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pos = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(100, Math.max(0, pos)));
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900 rounded-full p-1 shadow-lg border border-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white w-4 h-4"><path d="M8 3v18M16 3v18M3 8l5-5 5 5M3 16l5 5 5-5M21 8l-5-5-5 5M21 16l-5 5-5-5"/></svg>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs font-bold pointer-events-none backdrop-blur-sm">VORHER</div>
      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs font-bold pointer-events-none backdrop-blur-sm">NACHHER</div>
    </div>
  );
}
