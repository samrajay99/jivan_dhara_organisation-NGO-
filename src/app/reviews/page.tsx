import React from "react";
import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import ReviewsClient from "./ReviewsClient";

export const metadata: Metadata = {
  title: "Testimonials & Reviews | Jivan Dhara Organisation",
  description:
    "Read public reviews and feedback from beneficiaries, volunteers, doctors, and donors of Jivan Dhara Organisation in Kolkata, West Bengal.",
};

export const revalidate = 0;

export default async function ReviewsPage() {
  const reviews = await prisma.review.findMany({
    where: { status: "APPROVED" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider border border-emerald-700">
              Community Trust
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Testimonials & Feedback
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Transparent, unedited voices from the people and communities we serve across West Bengal.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ReviewsClient reviews={reviews} />
      </div>
    </div>
  );
}
