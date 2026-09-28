import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions | Jivan Dhara Organisation",
  description:
    "Terms and conditions for membership, donations, volunteering, and use of the Jivan Dhara Organisation digital platform.",
};

export default function TermsPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider border border-emerald-700">
              Legal Framework
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Terms of Service</h1>
            <p className="text-slate-300 text-sm sm:text-base">
              Last updated: September 2026 • Jivan Dhara Organisation (Kolkata, WB)
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8 text-slate-700 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">1. Membership Terms & ₹50 Fee</h2>
            <p>
              Membership in Jivan Dhara Organisation is subject to truthful completion of the registration
              form, submission of valid KYC identification, and payment of the non-refundable ₹50 membership
              fee. All applications are subject to approval by the Governing Committee.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">2. Code of Conduct & ID Card Usage</h2>
            <p>
              The digital and physical Membership ID Card issued by Jivan Dhara Organisation is the property
              of the Organisation. Members agree not to misrepresent the organisation, solicit unauthorized
              funds, or use the membership credentials for unlawful commercial or political gain. Any misuse
              may result in immediate suspension or termination of membership.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">3. Voluntary Contributions & Refunds</h2>
            <p>
              All donations made to Jivan Dhara Organisation are voluntary contributions toward social welfare,
              child education, medical camps, and community relief. Since funds are immediately committed to
              field activities, donations are generally non-refundable unless a technical payment error occurs.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">4. Democratic Governance</h2>
            <p>
              As per the constitution of Jivan Dhara Organisation, governance is vested in the 9-member
              Governing Committee elected by the General Body every five years, headed by the Secretary.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">5. Jurisdiction</h2>
            <p>
              Any disputes or legal proceedings arising from transactions or membership shall be subject
              to the exclusive jurisdiction of the competent courts in Kolkata, West Bengal, India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
