import React, { useState, useMemo } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import { ArrowDown } from "lucide-react";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

export default function GalleryLightbox({ images, limit = 10 }) {
  const [index, setIndex] = useState(-1);
  const [filter, setFilter] = useState('Alle');
  const [visibleCount, setVisibleCount] = useState(limit);
  const [isExpanded, setIsExpanded] = useState(false);

  // Extract unique categories (if available) or default to "Alle"
  const categories = useMemo(() => ['Alle', ...new Set(images.map(img => img.category).filter(Boolean))], [images]);

  const filteredImages = useMemo(() => filter === 'Alle'
    ? images
    : images.filter(img => img.category === filter), [filter, images]);

  const visibleImages = useMemo(() => filteredImages.slice(0, visibleCount), [filteredImages, visibleCount]);

  // Adjusted logic: hasMore is true if not all images are shown OR if we are collapsed on mobile (index >= 4 hidden)
  // But strictly speaking, "Mehr anzeigen" usually expands the list.
  // We want "Mehr anzeigen" to trigger expansion on mobile too.
  const hasHiddenMobileItems = !isExpanded && visibleImages.length > 4;
  const hasMore = filteredImages.length > visibleCount || hasHiddenMobileItems;

  const handleFilterChange = (cat) => {
      setFilter(cat);
      setVisibleCount(limit);
      setIsExpanded(false);
  };

  const handleImageClick = (clickedIndex) => {
      setIndex(clickedIndex);
  };

  const showMore = () => {
      if (hasHiddenMobileItems && visibleCount <= limit) {
          setIsExpanded(true);
      } else {
          setVisibleCount(prev => prev + limit);
          setIsExpanded(true);
      }
  };

  return (
    <>
      {categories.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleFilterChange(cat)}
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
        {visibleImages.map((image, i) => {
          // Hide items index 4 and above on mobile unless expanded
          const isHiddenOnMobile = !isExpanded && i >= 4;

          return (
            <button
              type="button"
              key={image.src}
              className={`aspect-square bg-zinc-800 rounded-xl overflow-hidden group cursor-pointer relative animate-fade-in-up w-full p-0 border-0 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:outline-none ${isHiddenOnMobile ? 'hidden md:block' : ''}`}
              onClick={() => handleImageClick(i)}
              aria-label={`Bild vergrößern: ${image.alt || 'Galeriebild'}`}
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
            </button>
          );
        })}
      </div>

      {hasMore && (
          <div className="mt-8 text-center">
              <button
                onClick={showMore}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900/80 border border-white/10 text-white font-bold hover:bg-zinc-800 transition-colors shadow-lg"
              >
                  Mehr anzeigen <ArrowDown size={18} />
              </button>
          </div>
      )}

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={filteredImages}
        plugins={[Zoom, Captions]}
        zoom={{ maxZoomPixelRatio: 3 }}
      />
    </>
  );
}
