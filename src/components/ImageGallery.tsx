"use client";

import { useState } from "react";

interface ImageGalleryProps {
  images: string[];
  city: string;
}

export default function ImageGallery({ images, city }: ImageGalleryProps) {
  const validImages = images.filter((img) => img && img !== "");
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (validImages.length === 0) return null;

  return (
    <div>
      {/* Main image */}
      <div className="aspect-[16/9] md:aspect-[2/1] w-full overflow-hidden bg-gray-100 relative group">
        <img
          src={validImages[selectedIndex]}
          alt={`${city} - Foto ${selectedIndex + 1}`}
          className="w-full h-full object-cover"
        />
        {/* Navigation arrows */}
        {validImages.length > 1 && (
          <>
            <button
              onClick={() => setSelectedIndex(selectedIndex === 0 ? validImages.length - 1 : selectedIndex - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
              aria-label="Foto anterior"
            >
              ←
            </button>
            <button
              onClick={() => setSelectedIndex(selectedIndex === validImages.length - 1 ? 0 : selectedIndex + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
              aria-label="Foto siguiente"
            >
              →
            </button>
          </>
        )}
        {/* Counter */}
        <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2.5 py-1 text-[11px] font-mono">
          {selectedIndex + 1} / {validImages.length}
        </div>
      </div>

      {/* Thumbnails */}
      {validImages.length > 1 && (
        <div className="flex gap-1.5 mt-1.5 overflow-x-auto pb-1">
          {validImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`flex-shrink-0 w-20 h-14 overflow-hidden transition-all ${
                i === selectedIndex ? "ring-2 ring-black ring-offset-1" : "opacity-60 hover:opacity-100"
              }`}
            >
              <img src={img} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
