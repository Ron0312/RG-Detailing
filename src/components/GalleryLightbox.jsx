import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

export default function GalleryLightbox({ images }) {
  const [index, setIndex] = useState(-1);
  const [filter, setFilter] = useState('Alle');

  // Extract unique categories (if available) or default to "Alle"
  const categories = ['Alle', ...new Set(images.map(img => img.category).filter(Boolean))];

  const filteredImages = filter === 'Alle'
    ? images
    : images.filter(img => img.category === filter);

  // Map the filtered index back to the original index for the Lightbox
  const handleImageClick = (filteredIndex) => {
      const originalIndex = images.findIndex(img => img === filteredImages[filteredIndex]);
      setIndex(originalIndex);
  };

  return (
    <>
      {categories.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all border ${
                filter === cat
                  ? 'bg-red-700 border-red-700 text-white shadow-lg'
                  : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filteredImages.map((image, i) => (
          <div
            key={image.src} // Use src as key since index changes with filter
            className="aspect-square bg-zinc-800 rounded-xl overflow-hidden group cursor-pointer relative"
            onClick={() => handleImageClick(i)}
          >
            <img
              src={image.thumbnail || image.src}
              alt={image.alt}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              loading="lazy"
              decoding="async"
              width="600"
              height="600"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
          </div>
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
