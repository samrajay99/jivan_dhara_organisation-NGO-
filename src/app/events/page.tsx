import React from "react";
import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import EventsClient from "./EventsClient";

export const metadata: Metadata = {
  title: "Events & Medical Camps | Jivan Dhara Organisation",
  description:
    "Join upcoming health checkups, blood donation camps, digital literacy workshops, and social welfare drives organized by Jivan Dhara Organisation in Kolkata and West Bengal.",
};

export const revalidate = 0;

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    where: { isPublished: true },
    orderBy: { date: "asc" },
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider border border-emerald-700">
              Community Calendar
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Events, Camps & Workshops
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Participate in our upcoming medical checkup camps, farmer orientation sessions, and
              community mobilization programs. Registration is 100% free and open to all.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EventsClient events={events} />
      </div>
    </div>
  );
}
