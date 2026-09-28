"use client";

import React, { useState } from "react";
import { ImageIcon, Tag, ZoomIn } from "lucide-react";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  url: string;
  thumbnailUrl?: string | null;
  caption?: string | null;
  isFeatured: boolean;
  order: number;
}

export default function GalleryClient({ items }: { items: GalleryItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    "ALL",
    "EDUCATION",
    "HEALTH_CAMPS",
    "SOCIAL_WORK",
    "COMMUNITY",
    "VOLUNTEERS",
    "EVENTS",
  ];

  const filteredItems = items.filter((item) => {
    if (selectedCategory === "ALL") return true;
    return item.category === selectedCategory;
  });

  return (
    <>
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === cat
                ? "bg-emerald-700 text-white shadow-sm scale-105"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            {cat.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {filteredItems.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <ImageIcon className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-700">No Photos in this Category</h3>
          <p className="text-xs text-slate-500">
            Select another category to view on-ground photographs.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-200 cursor-pointer shadow-sm hover:shadow-xl transition-all"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end text-white">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                    {item.category.replace("_", " ")}
                  </span>
                  <div className="p-2 rounded-full bg-white/20 text-white">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-sm font-bold text-white mt-1">{item.title}</h3>
                {item.caption && (
                  <p className="text-xs text-slate-300 line-clamp-2 mt-1">{item.caption}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <GalleryLightbox
          items={filteredItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(newIndex) => setLightboxIndex(newIndex)}
        />
      )}
    </>
  );
}
