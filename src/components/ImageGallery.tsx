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
      <div className="aspect-[16/9] w-full overflow-hidden bg-gray-100 border border-gray-200">
        <img
          src={validImages[selectedIndex]}
          alt={`${city} - Foto ${selectedIndex + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      {validImages.length > 1 && (
        <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
          {validImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`flex-shrink-0 w-20 h-20 overflow-hidden border-2 ${
                i === selectedIndex ? "border-black" : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <img
                src={img}
                alt={`Foto ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Counter */}
      <p className="text-xs text-gray-400 font-mono mt-2">
        {selectedIndex + 1} / {validImages.length} fotos
      </p>
    </div>
  );
}
