import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, ChevronDown, CheckCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ) | Jivan Dhara Organisation",
  description:
    "Common questions about Jivan Dhara Organisation membership (₹50 fee), ID card verification, donations, PMGDISHA, and volunteering.",
};

export default function FAQPage() {
  const faqs = [
    {
      q: "What is Jivan Dhara Organisation and when was it founded?",
      a: "Jivan Dhara Organisation (JDO) is a non-governmental social welfare sewa trust founded in 2008 in Kolkata, West Bengal. We work across both urban settlements and rural districts in education, PMGDISHA computer literacy, free health camps, women empowerment, and agriculture.",
    },
    {
      q: "What is the fee to become a registered Member?",
      a: "The membership fee is ₹50 only. Once registered and verified by the Governing Committee, members receive an official Jivan Dhara Membership ID Card with a unique QR code for public verification, voting participation in general body meetings every 5 years, and access to the Member Dashboard.",
    },
    {
      q: "How do I pay the ₹50 membership fee?",
      a: "You can pay the ₹50 fee using any UPI app (Google Pay, PhonePe, Paytm, BHIM) by scanning our official QR code or entering UPI ID jivandhara@upi. After payment, simply enter your UPI reference/UTR number and optionally upload the payment screenshot in the online form.",
    },
    {
      q: "How long does it take for membership approval and ID card generation?",
      a: "Applications are verified by our administrative secretarial staff within 24 to 48 hours. Once verified, your status updates to 'APPROVED' and your official NGO ID card PDF is instantly available for download and printing in your Member Dashboard.",
    },
    {
      q: "How can I verify an existing member's ID card?",
      a: "Anyone can verify an ID card by scanning the QR code printed on the physical card or visiting /verify/[membershipId]. To protect member privacy, only essential public verification details (Full Name, Member ID, Status, Joining Date) are displayed.",
    },
    {
      q: "Are health checkup camps and PMGDISHA classes free for beneficiaries?",
      a: "Yes. All health checkup camps, RCH maternal checkups, routine vaccination awareness, and PMGDISHA digital literacy modules conducted by Jivan Dhara Organisation are provided 100% free of cost to beneficiaries.",
    },
    {
      q: "How can I volunteer with Jivan Dhara Organisation?",
      a: "You can fill out the volunteer application form on our Contact page or register as an active member. We welcome doctors, teachers, students, IT professionals, and social mobilizers.",
    },
    {
      q: "Can I receive a receipt for my voluntary donations?",
      a: "Yes! Every donation made through our online donation portal generates an official receipt with a unique serial number (e.g. JDO-REC-2026-XXXXX) that you can download immediately as a PDF.",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider border border-emerald-700">
              Clear Answers
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Find transparent answers about membership, ID cards, donation receipts, and our social programs.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 hover:border-emerald-300 transition-colors"
            >
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-start gap-2.5">
                <HelpCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-7.5">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        {/* Action card */}
        <div className="p-8 rounded-3xl bg-emerald-950 text-white text-center space-y-4">
          <h3 className="text-xl font-bold">Have another question not answered here?</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Our team is always happy to assist you. Call our helpline at +91 9211420420 or write to us directly.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs"
            >
              Contact Office
            </Link>
            <Link
              href="/membership"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20"
            >
              Apply for Membership (₹50)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
