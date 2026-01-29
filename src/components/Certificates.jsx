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
        <img
            src={images[0].src}
            alt={images[0].alt}
            width={images[0].width}
            height={images[0].height}
            loading="lazy"
            decoding="async"
            onClick={() => setIndex(0)}
            className="rounded-xl border border-white/10 hover:scale-105 transition-transform duration-500 hover:border-red-500/30 hover:shadow-lg bg-zinc-900 cursor-pointer w-full h-auto"
        />

        {/* Image 2 */}
        <img
            src={images[1].src}
            alt={images[1].alt}
            width={images[1].width}
            height={images[1].height}
            loading="lazy"
            decoding="async"
            onClick={() => setIndex(1)}
            className="rounded-xl border border-white/10 hover:scale-105 transition-transform duration-500 hover:border-red-500/30 hover:shadow-lg bg-zinc-900 cursor-pointer w-full h-auto"
        />

        {/* Image 3 - Wrapped Div */}
        <div
            className="relative group h-full rounded-xl overflow-hidden border border-white/10 hover:border-red-500/30 transition-colors cursor-pointer"
            onClick={() => setIndex(2)}
        >
            <img
                src={images[2].src}
                alt={images[2].alt}
                width={images[2].width}
                height={images[2].height}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-110 transform"
            />
            {/* Badge removed as per instructions */}
        </div>
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
