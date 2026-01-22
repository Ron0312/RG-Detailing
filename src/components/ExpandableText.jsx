import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function ExpandableText({ children, initialHeight = 160 }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const [shouldShowButton, setShouldShowButton] = useState(false);

  useEffect(() => {
    if (contentRef.current && contentRef.current.scrollHeight > initialHeight) {
      setShouldShowButton(true);
    }
  }, [initialHeight, children]);

  return (
    <div className="relative">
      <div
        className="overflow-hidden transition-[max-height] duration-700 ease-in-out relative"
        style={{ maxHeight: isExpanded ? `${contentRef.current?.scrollHeight + 40}px` : `${initialHeight}px` }}
        ref={contentRef}
      >
        {children}

        {!isExpanded && shouldShowButton && (
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none"></div>
        )}
      </div>

      {shouldShowButton && (
        <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-6 flex items-center gap-2 text-red-500 hover:text-red-400 font-bold text-sm tracking-widest uppercase group transition-colors"
            aria-expanded={isExpanded}
        >
            <span>{isExpanded ? 'Weniger anzeigen' : 'Mehr erfahren'}</span>
            {isExpanded ? (
                <ChevronUp className="w-4 h-4 transition-transform duration-300" />
            ) : (
                <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
            )}
        </button>
      )}
    </div>
  );
}
