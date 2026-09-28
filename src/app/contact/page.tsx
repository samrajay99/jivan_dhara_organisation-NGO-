import React from "react";
import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us & Volunteer Registration | Jivan Dhara Organisation",
  description:
    "Get in touch with Jivan Dhara Organisation headquarters at Kolkata. Send inquiries, connect on WhatsApp, or apply to join as an active volunteer.",
};

export default function ContactPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider border border-emerald-700">
              Reach Out
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Contact & Volunteer Hub
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We welcome collaborations, inquiries, and passionate volunteers. Visit our Kolkata
              office or send us a message online.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ContactClient />
      </div>
    </div>
  );
}
