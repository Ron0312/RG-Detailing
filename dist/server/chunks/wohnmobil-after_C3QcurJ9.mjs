import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useRef } from 'react';
import { ChevronsLeftRight } from 'lucide-react';

function BeforeAfterSlider({ beforeImage, afterImage, alt = "Vorher Nachher Vergleich" }) {
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
    const pos = (latestClientX.current - rect.left) / rect.width * 100;
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
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: containerRef,
      className: "relative w-full aspect-video overflow-hidden rounded-xl shadow-2xl cursor-col-resize select-none touch-none",
      onMouseMove,
      onTouchMove,
      children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: afterImage,
            alt: `Nachher: ${alt}`,
            className: "absolute inset-0 w-full h-full object-cover",
            draggable: "false"
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0 w-full h-full",
            style: { clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` },
            children: /* @__PURE__ */ jsx(
              "img",
              {
                src: beforeImage,
                alt: `Vorher: ${alt}`,
                className: "w-full h-full object-cover",
                draggable: "false"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-y-0 w-1 bg-red-600 cursor-col-resize z-10 shadow-[0_0_10px_rgba(0,0,0,0.5)]",
            style: { left: `${sliderPosition}%` },
            children: /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900 rounded-full p-2 shadow-lg border border-red-600 flex items-center justify-center", children: /* @__PURE__ */ jsx(ChevronsLeftRight, { className: "text-white w-4 h-4" }) })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs font-bold pointer-events-none backdrop-blur-sm", children: "VORHER" }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs font-bold pointer-events-none backdrop-blur-sm", children: "NACHHER" })
      ]
    }
  );
}

const wohnmobilBefore = new Proxy({"src":"/_astro/wohnmobil-before.BgZNrehm.jpg","width":2752,"height":1536,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/app/src/assets/wohnmobil-before.jpg";
							}

							return target[name];
						}
					});

const wohnmobilAfter = new Proxy({"src":"/_astro/wohnmobil-hero.BDwkfUmJ.jpg","width":2752,"height":1536,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/app/src/assets/wohnmobil-after.jpg";
							}

							return target[name];
						}
					});

export { BeforeAfterSlider as B, wohnmobilAfter as a, wohnmobilBefore as w };
