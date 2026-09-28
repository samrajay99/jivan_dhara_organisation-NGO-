import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  AlertCircle,
  Calendar,
  Search,
  Download,
  Info,
  ChevronRight,
} from "lucide-react";
import prisma from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Notice Board & Announcements | Jivan Dhara Organisation",
  description:
    "Official notices, urgent community announcements, meeting circulars, and event updates from Jivan Dhara Organisation.",
};

export const revalidate = 0;

export default async function NoticesPage() {
  const notices = await prisma.notice.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/40">
              Official Circulars
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Notice Board & Announcements
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Stay informed about upcoming health camps, general body meetings, volunteer recruitment,
              and critical community alerts.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        {notices.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <FileText className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-700">No Notices Published Right Now</h3>
            <p className="text-xs text-slate-500">
              Check back soon or follow our daily status page for regular work logs.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notices.map((notice) => {
              const isUrgent = notice.priority === "URGENT";
              const isImportant = notice.priority === "IMPORTANT";

              return (
                <div
                  key={notice.id}
                  className={`p-6 rounded-3xl bg-white border transition-all shadow-sm hover:shadow-md space-y-4 ${
                    isUrgent
                      ? "border-red-300 bg-red-50/15"
                      : isImportant
                      ? "border-amber-300 bg-amber-50/15"
                      : "border-slate-200"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                          isUrgent
                            ? "bg-red-100 text-red-700 border border-red-200"
                            : isImportant
                            ? "bg-amber-100 text-amber-800 border border-amber-200"
                            : "bg-slate-100 text-slate-700 border border-slate-200"
                        }`}
                      >
                        {notice.priority} NOTICE
                      </span>

                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                        {formatDate(notice.date)}
                      </span>
                    </div>

                    {notice.expiryDate && (
                      <span className="text-[11px] text-slate-400">
                        Valid till: {formatDate(notice.expiryDate)}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                      {notice.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                      {notice.description}
                    </p>
                  </div>

                  {notice.attachmentUrl && (
                    <div className="pt-2 border-t border-slate-100">
                      <a
                        href={notice.attachmentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-lg border border-emerald-200"
                      >
                        <Download className="w-3.5 h-3.5" /> Download Attached Document / PDF
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
