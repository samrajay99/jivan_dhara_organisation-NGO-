"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  QrCode,
  Copy,
  Check,
  CheckCircle,
  AlertCircle,
  Loader2,
  FileText,
  Printer,
  ShieldCheck,
  Building,
} from "lucide-react";
import { formatINR } from "@/lib/utils";

export default function DonateClient() {
  const [amount, setAmount] = useState<number>(500);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<any | null>(null);

  const [donorData, setDonorData] = useState({
    donorName: "",
    email: "",
    mobile: "",
    panNumber: "",
    purpose: "Child Education & School Kits Support",
    upiRef: "",
    isAnonymous: false,
  });

  const presetAmounts = [100, 250, 500, 1000, 2500];
  const upiId = "jivandhara@upi";
  const upiNumber = "9211420420";

  const effectiveAmount = customAmount ? parseFloat(customAmount) || 0 : amount;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (effectiveAmount < 10) {
      setError("Please select or enter a valid donation amount (min ₹10).");
      setLoading(false);
      return;
    }

    if (!donorData.upiRef) {
      setError("Please enter your UPI Reference / UTR / Transaction ID.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/donations/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: effectiveAmount,
          ...donorData,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to process donation");

      setReceipt(data.donation);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {receipt ? (
        /* Printable Official Receipt */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400 bg-white shrink-0 shadow">
                <Image
                  src="/logo.png"
                  alt="Jivan Dhara Organisation Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Jivan Dhara Organisation</h2>
                <p className="text-xs text-slate-500">Regd. Sewa Trust • Kolkata, West Bengal</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Official Receipt Number
              </span>
              <span className="font-mono text-sm font-extrabold text-emerald-800">
                {receipt.receiptNumber}
              </span>
            </div>
          </div>

          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-1">
            <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
            <h3 className="text-lg font-extrabold text-emerald-950">
              Donation Acknowledgement & Receipt
            </h3>
            <p className="text-xs text-emerald-800">
              Thank you for supporting Jivan Dhara Organisation. Your contribution directly empowers
              grassroots beneficiaries.
            </p>
          </div>

          {/* Receipt Breakdown */}
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-400">Donor Name:</span>
              <span className="font-bold text-slate-900">
                {receipt.isAnonymous ? "Anonymous Supporter" : receipt.donorName}
              </span>
            </div>

            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-400">Amount Contributed:</span>
              <span className="font-extrabold text-emerald-800 text-base">
                {formatINR(receipt.amount)}
              </span>
            </div>

            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-400">Purpose of Donation:</span>
              <span className="font-medium text-slate-900">{receipt.purpose}</span>
            </div>

            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-400">UPI Ref / UTR:</span>
              <span className="font-mono font-bold text-slate-800">{receipt.upiRef}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">Receipt Date:</span>
              <span className="font-medium text-slate-800">
                {new Date(receipt.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 no-print">
            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow"
            >
              <Printer className="w-4 h-4" /> Print / Save as PDF
            </button>

            <button
              onClick={() => {
                setReceipt(null);
                setDonorData({
                  donorName: "",
                  email: "",
                  mobile: "",
                  panNumber: "",
                  purpose: "Child Education & School Kits Support",
                  upiRef: "",
                  isAnonymous: false,
                });
              }}
              className="text-xs font-bold text-emerald-700 hover:underline"
            >
              Make another contribution
            </button>
          </div>
        </div>
      ) : (
        /* Donation Form */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10 space-y-8">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
              Transparent Contributions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Why Should You Donate?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Your voluntary contribution directly enables free healthcare checkups, school bag
              distribution for marginalized children, and PMGDISHA digital literacy modules.
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2 border border-red-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Select Amount */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Select Donation Amount *
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setAmount(amt);
                      setCustomAmount("");
                    }}
                    className={`py-3 px-4 rounded-2xl text-sm font-extrabold border transition-all ${
                      amount === amt && !customAmount
                        ? "bg-emerald-700 text-white border-emerald-700 shadow-md scale-105"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <input
                  type="number"
                  placeholder="Or enter custom amount in ₹"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* 2. Donor Information */}
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                Donor Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Donor Full Name *
                  </label>
                  <input
                    type="text"
                    required={!donorData.isAnonymous}
                    disabled={donorData.isAnonymous}
                    placeholder={donorData.isAnonymous ? "Anonymous Donor" : "Your Name"}
                    value={donorData.donorName}
                    onChange={(e) => setDonorData({ ...donorData, donorName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email (for Official Receipt) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    value={donorData.email}
                    onChange={(e) => setDonorData({ ...donorData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit number"
                    value={donorData.mobile}
                    onChange={(e) => setDonorData({ ...donorData, mobile: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    PAN Number (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="ABCDE1234F"
                    value={donorData.panNumber}
                    onChange={(e) => setDonorData({ ...donorData, panNumber: e.target.value.toUpperCase() })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Donation Purpose / Preference
                </label>
                <select
                  value={donorData.purpose}
                  onChange={(e) => setDonorData({ ...donorData, purpose: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white"
                >
                  <option value="Child Education & School Kits Support">
                    Child Education & School Kits Support
                  </option>
                  <option value="Free Health Camps & Generic Medicines">
                    Free Health Camps & Generic Medicines
                  </option>
                  <option value="PMGDISHA Digital Literacy Mission">
                    PMGDISHA Digital Literacy Mission
                  </option>
                  <option value="Women Skill Development & Tailoring">
                    Women Skill Development & Tailoring
                  </option>
                  <option value="Old Age Welfare & Winter Blanket Relief">
                    Old Age Welfare & Winter Blanket Relief
                  </option>
                  <option value="General Social Welfare & Operational Sewa">
                    General Social Welfare & Operational Sewa
                  </option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="anon"
                  checked={donorData.isAnonymous}
                  onChange={(e) => setDonorData({ ...donorData, isAnonymous: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="anon" className="text-xs text-slate-700 font-medium">
                  Make this an anonymous contribution on public donor rolls
                </label>
              </div>
            </div>

            {/* 3. UPI QR & Payment Verification */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <QrCode className="w-4 h-4 text-emerald-700" /> Pay via UPI / QR Code
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-5 flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-200">
                  <div className="w-40 h-40 bg-slate-900 rounded-xl p-3 flex flex-col items-center justify-center text-white text-center">
                    <QrCode className="w-20 h-20 text-emerald-400" />
                    <span className="text-[10px] font-mono mt-1">UPI: {upiId}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-800 mt-2">
                    Amount: {formatINR(effectiveAmount)}
                  </span>
                </div>

                <div className="sm:col-span-7 space-y-3 text-xs">
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">
                        Official UPI ID:
                      </span>
                      <span className="font-mono font-bold text-emerald-900 select-all">
                        {upiId}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyUpi}
                      className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-bold hover:bg-emerald-100 flex items-center gap-1"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? "Copied" : "Copy"}</span>
                    </button>
                  </div>

                  <p className="text-slate-500 leading-relaxed text-[11px]">
                    Transfer <strong>{formatINR(effectiveAmount)}</strong> via Google Pay, PhonePe,
                    Paytm, or BHIM. Then paste the 12-digit UPI Reference / UTR Number below to generate your instant receipt.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1">
                  UPI Reference / UTR Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 409283719283"
                  value={donorData.upiRef}
                  onChange={(e) => setDonorData({ ...donorData, upiRef: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-sm bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-extrabold text-sm sm:text-base shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Generating Official Donation Receipt...</span>
                </>
              ) : (
                <>
                  <Heart className="w-5 h-5 fill-slate-950" />
                  <span>Confirm Donation ({formatINR(effectiveAmount)}) & Get Receipt</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
