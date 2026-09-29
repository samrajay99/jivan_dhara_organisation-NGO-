import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Users,
  CheckCircle,
  Tag,
  ArrowRight,
  Filter,
} from "lucide-react";
import prisma from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Daily Status & Field Activity Log",
  description:
    "Daily on-ground activity timeline of Jivan Dhara Organisation. Track real-time progress of health camps, education drives, and volunteer operations across West Bengal.",
};

export const revalidate = 0;

export default async function DailyStatusPage() {
  let dailyStatuses: any[] = [];
  try {
    dailyStatuses = await prisma.dailyStatus.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    dailyStatuses = [];
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider border border-emerald-700">
              Grassroots Log
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Daily NGO Field Updates
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Authentic on-ground activity reports published directly by our field coordinators and
              Governing Committee.
            </p>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {dailyStatuses.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-700">No Daily Updates Published Yet</h3>
            <p className="text-xs text-slate-500">
              Our field teams regularly log status updates after concluding daily community sessions.
            </p>
          </div>
        ) : (
          <div className="relative border-l-2 border-emerald-600/30 ml-4 sm:ml-8 space-y-12 py-2">
            {dailyStatuses.map((status) => (
              <div key={status.id} className="relative pl-6 sm:pl-10 group">
                {/* Timeline Node */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-emerald-600 border-4 border-white shadow group-hover:scale-125 transition-transform" />

                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all space-y-5">
                  {/* Top Metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                        {status.category}
                      </span>
                      <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                        {formatDate(status.date)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-600 font-medium bg-slate-50 px-3 py-1 rounded-lg">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      <span>{status.location}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                      {status.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                      {status.description}
                    </p>
                  </div>

                  {/* Photos if present */}
                  {status.photos && (
                    <div className="rounded-2xl overflow-hidden aspect-video max-h-72 bg-slate-100">
                      <img
                        src={status.photos.split(",")[0].trim()}
                        alt={status.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Beneficiary & Volunteer Counters */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-slate-600 border-t border-slate-100">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-1.5 text-emerald-700">
                        <Users className="w-4 h-4" />
                        <span>{status.volunteersCount} Active Volunteers</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-amber-700">
                        <CheckCircle className="w-4 h-4" />
                        <span>{status.beneficiariesCount} Beneficiaries Assisted</span>
                      </div>
                    </div>

                    <span className="text-[11px] text-slate-400 font-normal">
                      Verified Field Report
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
