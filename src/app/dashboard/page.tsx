import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  CreditCard,
  Bell,
  Calendar,
  ArrowRight,
  CheckCircle,
  Clock,
  Download,
  AlertCircle,
} from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Member Dashboard | Jivan Dhara Organisation",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const member = user.member;
  const isApproved = member?.status === "APPROVED";

  const [notices, events, notifications] = await Promise.all([
    prisma.notice.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
    prisma.event.findMany({
      where: { isPublished: true, status: "UPCOMING" },
      orderBy: { date: "asc" },
      take: 2,
    }),
    prisma.notification.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
  ]);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-bold uppercase tracking-wider">
            Member Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user.name}!
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Manage your official membership records, download your QR-verified ID card, and stay
            informed about grassroots events across West Bengal.
          </p>
        </div>

        <div className="shrink-0 flex flex-wrap gap-3">
          {isApproved ? (
            <Link
              href="/dashboard/id-card"
              className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow transition-all flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" /> Download ID Card
            </Link>
          ) : (
            <Link
              href="/dashboard/membership"
              className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition-all flex items-center gap-2"
            >
              <Clock className="w-4 h-4" /> View Application Status
            </Link>
          )}
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Membership Status
            </span>
            <ShieldCheck
              className={`w-5 h-5 ${isApproved ? "text-emerald-600" : "text-amber-600"}`}
            />
          </div>
          <div className="text-xl font-extrabold text-slate-900">
            {member?.status || "NOT APPLIED"}
          </div>
          <p className="text-xs text-slate-500">
            {isApproved
              ? `Member ID: ${member?.membershipId}`
              : "Application submitted for ₹50"}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Payment Status
            </span>
            <CreditCard className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-xl font-extrabold text-slate-900">
            {member?.payments?.[0]?.status || "PENDING"}
          </div>
          <p className="text-xs text-slate-500">
            Amount: ₹{member?.payments?.[0]?.amount || 50} (UPI)
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Regional Branch
            </span>
            <CheckCircle className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-xl font-extrabold text-slate-900">
            {member?.branch || "Kolkata Central"}
          </div>
          <p className="text-xs text-slate-500">West Bengal Region</p>
        </div>
      </div>

      {/* Notifications & Announcements Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Latest Notices */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base">Latest Notices</h3>
            <Link
              href="/notices"
              className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {notices.map((n) => (
              <div key={n.id} className="p-3.5 rounded-2xl bg-slate-50 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                    {n.priority}
                  </span>
                  <span className="text-[10px] text-slate-400">{formatDate(n.date)}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900">{n.title}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base">Upcoming Camps & Events</h3>
            <Link
              href="/events"
              className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {events.map((ev) => (
              <div key={ev.id} className="p-3.5 rounded-2xl bg-slate-50 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold text-emerald-700">{formatDate(ev.date)}</span>
                  <span className="text-[10px] text-slate-500">{ev.location}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900">{ev.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
