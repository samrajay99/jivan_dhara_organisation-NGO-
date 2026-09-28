import React from "react";
import type { Metadata } from "next";
import DonateClient from "./DonateClient";

export const metadata: Metadata = {
  title: "Donate Online | Support Health, Education & PMGDISHA | Jivan Dhara Organisation",
  description:
    "Make a transparent online contribution to Jivan Dhara Organisation. Support child education, free health camps, and women empowerment with instant official receipt generation.",
};

export default function DonatePage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/40">
              Grassroots Support
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Support Our Humanitarian Work
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Every rupee helps provide school supplies for poor children, generic medicines at our
              free medical camps, and digital literacy to rural youth.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <DonateClient />
      </div>
    </div>
  );
}
