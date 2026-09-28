import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Jivan Dhara Organisation",
  description:
    "Privacy Policy and data protection standards of Jivan Dhara Organisation regarding member personal data, ID cards, and donations.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider border border-emerald-700">
              Data Protection
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Privacy Policy</h1>
            <p className="text-slate-300 text-sm sm:text-base">
              Last updated: September 2026 • Jivan Dhara Organisation (Kolkata, WB)
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8 text-slate-700 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">1. Commitment to Privacy</h2>
            <p>
              Jivan Dhara Organisation (&ldquo;JDO&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the Organisation&rdquo;)
              is committed to protecting the privacy and personal data of its members, donors,
              volunteers, and website visitors. We only collect information necessary for processing
              membership applications, verifying member identity, issuing donation receipts, and
              coordinating humanitarian programs.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">2. Information We Collect</h2>
            <p>During membership registration or voluntary donations, we may collect:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
              <li>Personal identity details: Full Name, Parent&apos;s Name, Date of Birth, Gender, Blood Group.</li>
              <li>Contact details: Mobile Number, WhatsApp Number, Email Address, Residential Address.</li>
              <li>Verification IDs: Government ID Type and Number (e.g. Voter ID, Aadhaar) strictly for KYC membership records.</li>
              <li>Payment references: UPI Transaction Ref (UTR) and payment screenshot proofs.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">3. Public QR Verification Privacy Guard</h2>
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 font-medium space-y-1">
              <span className="font-bold flex items-center gap-1 text-emerald-800">
                <ShieldCheck className="w-4 h-4" /> Strict Privacy on Public Verification Pages:
              </span>
              <p>
                Our public verification URL (<code>/verify/[membershipId]</code>) accessed via the ID Card QR code
                <strong> NEVER</strong> exposes sensitive information such as Aadhaar number, complete residential address,
                phone number, email address, or banking details. It only confirms the member&apos;s name, validity status, and membership ID.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">4. Payment Security & Third Parties</h2>
            <p>
              We do not store credit/debit card details or bank account passwords on our servers. All
              contributions are verified via authentic UPI reference numbers (UTR) or verified gateway
              integrations. We never sell, rent, or trade your personal information to third-party advertisers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">5. Contact Data Protection Officer</h2>
            <p>
              For data access, correction requests, or privacy inquiries, contact our registered office:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <p><strong>Secretary / Admin:</strong> Jivan Dhara Organisation</p>
              <p>12, Raicharan Sadhukhan Road, Bridge, Near Gajnavi, Kolkata, West Bengal - 700037</p>
              <p>Email: kumarpradip0303@gmail.com • Phone: +91 9211420420</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
