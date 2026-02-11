import React from 'react';
import { ChevronsLeftRight } from 'lucide-react';

export default function BeforeAfterSlider({ beforeImage, afterImage, alt = "Vorher Nachher Vergleich" }) {
  const [sliderPosition, setSliderPosition] = React.useState(50);
  const containerRef = React.useRef(null);
  const beforeImageRef = React.useRef(null);
  const handleRef = React.useRef(null);
  const ticking = React.useRef(false);
  const latestClientX = React.useRef(0);
  const positionRef = React.useRef(50);

  // Sync ref when state changes (e.g. via keyboard)
  React.useEffect(() => {
    positionRef.current = sliderPosition;
  }, [sliderPosition]);

  const updateDom = (pos) => {
    if (beforeImageRef.current) {
        beforeImageRef.current.style.clipPath = `inset(0 ${100 - pos}% 0 0)`;
    }
    if (handleRef.current) {
        handleRef.current.style.left = `${pos}%`;
    }
  };

  const updatePosition = () => {
    if (!containerRef.current) {
        ticking.current = false;
        return;
    }
    const rect = containerRef.current.getBoundingClientRect();
    const pos = ((latestClientX.current - rect.left) / rect.width) * 100;
    const clampedPos = Math.min(100, Math.max(0, pos));

    positionRef.current = clampedPos;
    updateDom(clampedPos);

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
    let newPos = positionRef.current;
    if (e.key === 'ArrowLeft') {
      newPos = Math.max(0, newPos - 5);
    } else if (e.key === 'ArrowRight') {
      newPos = Math.min(100, newPos + 5);
    } else {
      return;
    }

    setSliderPosition(newPos);
    positionRef.current = newPos;
    updateDom(newPos);
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
