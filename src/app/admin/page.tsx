import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Users,
  Heart,
  Calendar,
  FileText,
  Activity,
  CheckCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  MessageSquare,
} from "lucide-react";
import prisma from "@/lib/prisma";
import { formatINR, formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin Dashboard Overview | Jivan Dhara Organisation",
};

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const [
    totalMembers,
    pendingMembers,
    approvedMembers,
    totalDonations,
    donationSum,
    eventsCount,
    noticesCount,
    pendingReviews,
    messagesCount,
    volunteersCount,
    recentApplications,
  ] = await Promise.all([
    prisma.member.count(),
    prisma.member.count({ where: { status: "PENDING" } }),
    prisma.member.count({ where: { status: "APPROVED" } }),
    prisma.donation.count(),
    prisma.donation.aggregate({ _sum: { amount: true } }),
    prisma.event.count(),
    prisma.notice.count(),
    prisma.review.count({ where: { status: "PENDING" } }),
    prisma.contactMessage.count({ where: { isRead: false } }),
    prisma.volunteerApplication.count({ where: { status: "PENDING" } }),
    prisma.member.findMany({
      where: { status: "PENDING" },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { payments: true },
    }),
  ]);

  const cards = [
    {
      title: "Pending Applications",
      val: pendingMembers,
      sub: "Require ₹50 fee verification",
      icon: Clock,
      color: "bg-amber-500/10 text-amber-700 border-amber-200",
      href: "/admin/members",
    },
    {
      title: "Approved Members",
      val: approvedMembers,
      sub: "Active verified ID cards",
      icon: Users,
      color: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
      href: "/admin/members",
    },
    {
      title: "Total Donations",
      val: formatINR(donationSum._sum.amount || 0),
      sub: `${totalDonations} contributions recorded`,
      icon: Heart,
      color: "bg-rose-500/10 text-rose-700 border-rose-200",
      href: "/admin/donations",
    },
    {
      title: "Unread Inquiries",
      val: messagesCount + volunteersCount,
      sub: "Contact & volunteer applications",
      icon: MessageSquare,
      color: "bg-blue-500/10 text-blue-700 border-blue-200",
      href: "/admin/messages",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Jivan Dhara Control Center
          </span>
          <h1 className="text-2xl font-extrabold mt-1">Governing Body Administration</h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time administrative data, member verification queue, and content management.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/admin/members"
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow"
          >
            Review Members ({pendingMembers})
          </Link>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <Link
              key={i}
              href={c.href}
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3 block"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {c.title}
                </span>
                <div className={`p-2 rounded-xl border ${c.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-slate-900">{c.val}</div>
              <p className="text-xs text-slate-400">{c.sub}</p>
            </Link>
          );
        })}
      </div>

      {/* Pending Applications Action Queue */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Pending Membership Applications</h2>
            <p className="text-xs text-slate-500">
              Verify the ₹50 UPI payment reference (UTR) to approve and generate official ID cards.
            </p>
          </div>
          <Link
            href="/admin/members"
            className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
          >
            Manage All ({totalMembers}) <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {recentApplications.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-2xl text-slate-500 text-xs">
            <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            No pending membership applications at this time!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-600 border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Applicant Name</th>
                  <th className="p-3">Mobile & Email</th>
                  <th className="p-3">Branch</th>
                  <th className="p-3">UPI UTR Ref</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentApplications.map((app) => (
                  <tr key={app.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{app.fullName}</td>
                    <td className="p-3">
                      <div>{app.mobile}</div>
                      <div className="text-[11px] text-slate-400">{app.email}</div>
                    </td>
                    <td className="p-3">{app.branch}</td>
                    <td className="p-3 font-mono font-bold text-emerald-800">
                      {app.payments?.[0]?.upiRef || "N/A"}
                    </td>
                    <td className="p-3">
                      <Link
                        href="/admin/members"
                        className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[11px]"
                      >
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
