import React from "react";
import type { Metadata } from "next";
import MembershipFormClient from "./MembershipFormClient";

export const metadata: Metadata = {
  title: "Online Membership Application (₹50) | Jivan Dhara Organisation",
  description:
    "Join Jivan Dhara Organisation as a General Member for ₹50. Submit your KYC details, pay securely via UPI QR, and receive a verified NGO ID Card with QR verification upon approval.",
};

export default function MembershipPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider border border-emerald-700">
              Community Membership
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Become a Registered Member (₹50)
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Join our 18-year legacy of grassroots community service. Fill in your details below, pay the
              ₹50 membership fee via UPI, and receive your digital NGO ID card upon verification.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <MembershipFormClient />
      </div>
    </div>
  );
}
