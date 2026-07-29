import React, { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

export default function Certificates({ images }) {
  const [index, setIndex] = useState(-1);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`${image.alt} – vergrößert ansehen`}
            className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-zinc-900 hover:border-red-500/30 hover:shadow-lg transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            <img
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading="lazy"
              decoding="async"
              className={
                image.cover
                  ? "h-full w-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                  : "h-full w-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
              }
            />
          </button>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={images}
        plugins={[Zoom]}
        zoom={{ maxZoomPixelRatio: 3 }}
      />
    </>
  );
}
