import React from "react";
import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Photo & Video Gallery | Jivan Dhara Organisation",
  description:
    "Explore authentic visual memories and documentary photographs of Jivan Dhara Organisation's community service, health camps, and educational drives.",
};

export const revalidate = 0;

export default async function GalleryPage() {
  let items: any[] = [];
  try {
    items = await prisma.galleryItem.findMany({
      orderBy: { order: "asc" },
    });
  } catch {
    items = [];
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider border border-emerald-700">
              Grassroots Photography
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Photo & Documentary Gallery
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Real moments of human service, medical consultations, school kit distributions, and
              community joy captured across our intervention areas.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <GalleryClient items={items} />
      </div>
    </div>
  );
}
