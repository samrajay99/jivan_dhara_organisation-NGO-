import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Heart, Download, FileText } from "lucide-react";
import { formatINR, formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "My Donations & Receipts | Jivan Dhara Organisation",
};

export default async function MemberDonationsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const donations = await prisma.donation.findMany({
    where: { email: user.email },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Donation History & Receipts</h2>
          <p className="text-xs text-slate-500">
            View your voluntary contributions and download official receipts.
          </p>
        </div>

        {donations.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-2xl text-slate-500 text-xs">
            No voluntary donations recorded for this email.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-600 border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Receipt No.</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Purpose</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((d) => (
                  <tr key={d.id} className="border-b border-slate-100">
                    <td className="p-3 font-mono font-bold text-emerald-800">{d.receiptNumber}</td>
                    <td className="p-3 font-bold text-slate-900">{formatINR(d.amount)}</td>
                    <td className="p-3">{d.purpose}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 text-[10px]">
                        {d.status}
                      </span>
                    </td>
                    <td className="p-3">{formatDate(d.createdAt)}</td>
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
