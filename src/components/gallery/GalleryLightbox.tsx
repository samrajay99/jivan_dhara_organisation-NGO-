"use client";

import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Tag } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  url: string;
  caption?: string | null;
}

interface GalleryLightboxProps {
  items: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function GalleryLightbox({
  items,
  currentIndex,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const currentItem = items[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === "ArrowRight" && currentIndex < items.length - 1) onNavigate(currentIndex + 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, items.length, onClose, onNavigate]);

  if (!currentItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-4 animate-in fade-in">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      {currentIndex > 0 && (
        <button
          onClick={() => onNavigate(currentIndex - 1)}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
      )}

      {/* Next button */}
      {currentIndex < items.length - 1 && (
        <button
          onClick={() => onNavigate(currentIndex + 1)}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
          aria-label="Next image"
        >
          <ChevronRight className="w-7 h-7" />
        </button>
      )}

      {/* Image & Caption Display */}
      <div className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center space-y-4">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black/40 max-h-[70vh]">
          <img
            src={currentItem.url}
            alt={currentItem.title}
            className="max-h-[70vh] w-auto object-contain rounded-2xl"
          />
        </div>

        <div className="text-center text-white space-y-1 max-w-2xl px-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-700 text-emerald-100 text-xs font-bold uppercase">
            <Tag className="w-3 h-3" />
            {currentItem.category.replace("_", " ")}
          </div>
          <h3 className="text-base sm:text-lg font-bold">{currentItem.title}</h3>
          {currentItem.caption && (
            <p className="text-xs sm:text-sm text-slate-300">{currentItem.caption}</p>
          )}
          <span className="text-[11px] text-slate-400 block pt-1">
            {currentIndex + 1} of {items.length}
          </span>
        </div>
      </div>
    </div>
  );
}
