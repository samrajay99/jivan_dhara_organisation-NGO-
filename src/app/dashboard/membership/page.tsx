import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ShieldCheck, CreditCard, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Membership Status & Payments | Jivan Dhara Organisation",
};

export default async function MembershipDashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const member = user.member;
  const payment = member?.payments?.[0];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Membership Application Status</h2>
          <p className="text-xs text-slate-500">
            Lifecycle tracking of your official KYC application and fee verification.
          </p>
        </div>

        {member ? (
          <div className="space-y-6">
            {/* Status Highlight */}
            <div
              className={`p-6 rounded-2xl border flex items-center gap-4 ${
                member.status === "APPROVED"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                  : member.status === "REJECTED"
                  ? "bg-red-50 border-red-200 text-red-950"
                  : "bg-amber-50 border-amber-200 text-amber-950"
              }`}
            >
              {member.status === "APPROVED" ? (
                <CheckCircle2 className="w-10 h-10 text-emerald-600 shrink-0" />
              ) : member.status === "REJECTED" ? (
                <AlertCircle className="w-10 h-10 text-red-600 shrink-0" />
              ) : (
                <Clock className="w-10 h-10 text-amber-600 shrink-0" />
              )}

              <div>
                <span className="text-xs font-bold uppercase tracking-wider block">
                  Current Status
                </span>
                <h3 className="text-lg font-extrabold">{member.status}</h3>
                <p className="text-xs mt-0.5">
                  {member.status === "APPROVED"
                    ? `Approved & Activated. Official ID: ${member.membershipId}`
                    : member.status === "REJECTED"
                    ? `Application rejected: ${member.rejectionReason || "Please contact admin"}`
                    : "Application and ₹50 fee are under secretarial review."}
                </p>
              </div>
            </div>

            {/* Payment Record */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900">Payment Transactions</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-slate-600 border border-slate-200 rounded-xl overflow-hidden">
                  <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Method</th>
                      <th className="p-3">UPI / UTR Reference</th>
                      <th className="p-3">Payment Status</th>
                      <th className="p-3">Submitted At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payment ? (
                      <tr className="border-b border-slate-100">
                        <td className="p-3 font-bold text-slate-900">₹{payment.amount}</td>
                        <td className="p-3">{payment.paymentMethod}</td>
                        <td className="p-3 font-mono text-emerald-800">{payment.upiRef}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-800 text-[10px]">
                            {payment.status}
                          </span>
                        </td>
                        <td className="p-3">{formatDate(payment.createdAt)}</td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan={5} className="p-4 text-center text-slate-400">
                          No payments recorded yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-slate-500">No application found.</div>
        )}
      </div>
    </div>
  );
}
