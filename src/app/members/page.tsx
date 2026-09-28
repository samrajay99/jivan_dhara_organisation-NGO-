"use client";

import React, { useState } from "react";
import { Search, ShieldCheck, UserCheck, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MembersSearchPage() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim().toUpperCase();
    if (trimmed) {
      router.push(`/verify/${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider border border-emerald-700">
              Identity Authenticator
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Member Verification Portal
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Verify the authenticity of any Jivan Dhara Organisation membership ID card or certificate.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">Verify a Membership ID</h2>
            <p className="text-xs text-slate-500">
              Enter the unique Membership Number (e.g., <strong>JDO-2026-000001</strong>) found on the ID card.
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              required
              placeholder="e.g. JDO-2026-000001"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-mono uppercase"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Verify ID</span>
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Real-time authentication against central registry.</span>
            </div>
            <div className="flex items-start gap-2">
              <UserCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>Zero leakage of confidential KYC or phone records.</span>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900 text-white text-center space-y-4">
          <h3 className="text-lg font-bold">Want to become a verified member?</h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            Apply online for ₹50, submit your KYC details, and receive an instant digital ID card with QR verification upon approval.
          </p>
          <Link
            href="/membership"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs shadow transition-all"
          >
            <span>Apply for Online Membership (₹50)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
