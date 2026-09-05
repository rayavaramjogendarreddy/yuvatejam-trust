"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import SafeImage from "@/components/ui/SafeImage";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

export interface GalleryItem {
  src: string;
  alt?: string;
  caption?: string;
}

interface GalleryProps {
  items: GalleryItem[];
  title?: string;
}

export default function Gallery({ items, title }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setSelectedIndex((prevIndex) => {
      if (prevIndex !== null && triggerRefs.current[prevIndex]) {
        triggerRefs.current[prevIndex]?.focus();
      }
      return null;
    });
  }, []);

  const showPrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + items.length) % items.length);
    }
  };

  const showNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % items.length);
    }
  };

  // Keyboard navigation & Focus management
  useEffect(() => {
    if (selectedIndex === null) return;

    // Focus close button on open
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev !== null ? (prev - 1 + items.length) % items.length : null));
      } else if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev !== null ? (prev + 1) % items.length : null));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, items.length, closeLightbox]);

  if (!items || items.length === 0) return null;

  return (
    <div className="my-8 space-y-4">
      {title && (
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          {title}
        </h3>
      )}

      {/* Grid: 3 col desktop, 2 col tablet, 1 col mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {items.map((item, idx) => (
          <div
            key={`${item.src}-${idx}`}
            ref={(el) => {
              triggerRefs.current[idx] = el;
            }}
            tabIndex={0}
            role="button"
            aria-label={`View photo ${idx + 1}: ${item.caption || item.alt || "Field activity"}`}
            onClick={() => openLightbox(idx)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openLightbox(idx);
              }
            }}
            className="group relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 bg-slate-100 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
          >
            <SafeImage
              src={item.src}
              alt={item.alt || `Gallery Image ${idx + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Hover overlay icon */}
            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-white/90 text-brand-navy p-3 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                <Maximize2 className="w-5 h-5 text-brand-red" />
              </div>
            </div>
            {item.caption && (
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white text-xs truncate">
                {item.caption}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Field Photo Lightbox Preview"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
        >
          {/* Close Button */}
          <button
            ref={closeButtonRef}
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Prev/Next */}
          {items.length > 1 && (
            <>
              <button
                onClick={showPrev}
                className="absolute left-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={showNext}
                className="absolute right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Next Image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Image & Caption Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center space-y-3"
          >
            <div className="relative w-full h-[65vh] md:h-[75vh] rounded-2xl overflow-hidden bg-black/40">
              <SafeImage
                src={items[selectedIndex].src}
                alt={items[selectedIndex].alt || "Gallery Preview"}
                fill
                className="object-contain"
              />
            </div>
            <div className="text-center text-xs sm:text-sm text-slate-300 font-medium px-4">
              <span>{items[selectedIndex].alt || items[selectedIndex].caption || `Image ${selectedIndex + 1} of ${items.length}`}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
