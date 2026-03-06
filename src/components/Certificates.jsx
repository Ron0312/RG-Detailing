import React, { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

export default function Certificates({ images }) {
  const [index, setIndex] = useState(-1);

  if (!images || images.length < 3) return null;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Image 1 */}
        <button
            type="button"
            onClick={() => setIndex(0)}
            aria-label={`Zertifikat vergrößern: ${images[0].alt}`}
            className="rounded-xl border border-white/10 hover:scale-105 transition-transform duration-500 hover:border-red-500/30 hover:shadow-lg bg-zinc-900 cursor-pointer w-full overflow-hidden p-0 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 block"
        >
          <img
              src={images[0].src}
              alt={images[0].alt}
              width={images[0].width}
              height={images[0].height}
              loading="lazy"
              decoding="async"
              className="w-full h-auto block"
          />
        </button>

        {/* Image 2 */}
        <button
            type="button"
            onClick={() => setIndex(1)}
            aria-label={`Zertifikat vergrößern: ${images[1].alt}`}
            className="rounded-xl border border-white/10 hover:scale-105 transition-transform duration-500 hover:border-red-500/30 hover:shadow-lg bg-zinc-900 cursor-pointer w-full overflow-hidden p-0 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 block"
        >
          <img
              src={images[1].src}
              alt={images[1].alt}
              width={images[1].width}
              height={images[1].height}
              loading="lazy"
              decoding="async"
              className="w-full h-auto block"
          />
        </button>

        {/* Image 3 - Wrapped Div */}
        <button
            type="button"
            onClick={() => setIndex(2)}
            aria-label={`Zertifikat vergrößern: ${images[2].alt}`}
            className="relative group h-full rounded-xl overflow-hidden border border-white/10 hover:border-red-500/30 transition-colors cursor-pointer w-full p-0 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 block"
        >
            <img
                src={images[2].src}
                alt={images[2].alt}
                width={images[2].width}
                height={images[2].height}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-110 transform block"
            />
            {/* Badge removed as per instructions */}
        </button>
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
