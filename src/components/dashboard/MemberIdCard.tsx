"use client";

import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import {
  Printer,
  Download,
  ShieldCheck,
  CheckCircle,
  Building,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface MemberProps {
  member: {
    membershipId: string | null;
    fullName: string;
    parentName: string;
    dob: string;
    gender: string;
    bloodGroup?: string | null;
    mobile: string;
    address: string;
    district: string;
    state: string;
    pinCode: string;
    membershipType: string;
    branch: string;
    photoUrl?: string | null;
    status: string;
    joiningDate?: Date | null;
    validityDate?: Date | null;
  };
}

export default function MemberIdCard({ member }: MemberProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  const verifyUrl = `${
    typeof window !== "undefined" ? window.location.origin : "https://jdongo.netlify.app"
  }/verify/${member.membershipId || "PENDING"}`;

  useEffect(() => {
    if (member.membershipId) {
      QRCode.toDataURL(verifyUrl, {
        width: 160,
        margin: 1,
        color: {
          dark: "#064e3b",
          light: "#ffffff",
        },
      })
        .then((url) => setQrCodeUrl(url))
        .catch((err) => console.error("QR Code generation error:", err));
    }
  }, [member.membershipId, verifyUrl]);

  if (member.status !== "APPROVED" || !member.membershipId) {
    return (
      <div className="p-8 bg-amber-50 rounded-3xl border border-amber-200 text-center space-y-3">
        <ShieldCheck className="w-10 h-10 text-amber-600 mx-auto" />
        <h3 className="text-lg font-bold text-amber-950">ID Card Activation Pending</h3>
        <p className="text-xs text-amber-800 max-w-md mx-auto leading-relaxed">
          Your official NGO Membership ID Card will be automatically generated and made available here
          as soon as your ₹50 membership application is verified and approved by the Governing Committee.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 no-print">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Official Membership ID Card</h2>
          <p className="text-xs text-slate-500">
            Authorized identity credential of Jivan Dhara Organisation (Kolkata).
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all active:scale-95"
        >
          <Printer className="w-4 h-4" /> Print / Save PDF ID Card
        </button>
      </div>

      {/* Cards Display Grid (Front & Back) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* ================= CARD FRONT ================= */}
        <div className="w-full max-w-[380px] mx-auto bg-gradient-to-b from-emerald-950 via-emerald-900 to-slate-950 rounded-2xl border-2 border-amber-400 shadow-2xl p-4 text-white relative overflow-hidden flex flex-col justify-between aspect-[1.58/1] min-h-[460px]">
          {/* Subtle Background Seal */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(245,158,11,0.08),transparent_70%)] pointer-events-none" />

          {/* Header */}
          <div className="text-center space-y-0.5 border-b border-amber-400/40 pb-2.5 relative z-10">
            <div className="flex items-center justify-center gap-2">
              <img
                src="/logo.png"
                alt="JDO Logo"
                className="w-8 h-8 rounded-full object-cover border border-amber-400 bg-white"
              />
              <span className="font-extrabold text-xs sm:text-sm tracking-wide uppercase text-amber-300">
                Jivan Dhara Organisation
              </span>
            </div>
            <p className="text-[9px] text-emerald-200 tracking-wider uppercase font-semibold">
              Regd. Non-Governmental Sewa Trust • Kolkata (Est. 2008)
            </p>
          </div>

          {/* Body Section */}
          <div className="py-3 flex gap-3.5 items-center relative z-10">
            {/* Member Photo */}
            <div className="w-24 h-28 rounded-xl bg-slate-800 border-2 border-amber-400 overflow-hidden shrink-0 shadow-md">
              {member.photoUrl ? (
                <img
                  src={member.photoUrl}
                  alt={member.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-bold text-3xl bg-emerald-800 text-white">
                  {member.fullName.charAt(0)}
                </div>
              )}
            </div>

            {/* Member Meta */}
            <div className="space-y-1 text-left flex-1 min-w-0">
              <span className="text-[10px] font-bold text-amber-300 block truncate">
                {member.membershipType}
              </span>
              <h3 className="text-sm font-extrabold text-white truncate leading-tight">
                {member.fullName}
              </h3>
              <div className="text-[10px] text-slate-300 space-y-0.5 pt-0.5">
                <p className="truncate">
                  <strong className="text-slate-400">ID:</strong>{" "}
                  <span className="font-mono font-bold text-amber-300">{member.membershipId}</span>
                </p>
                <p className="truncate">
                  <strong className="text-slate-400">Branch:</strong> {member.branch}
                </p>
                {member.bloodGroup && (
                  <p>
                    <strong className="text-slate-400">Blood Group:</strong>{" "}
                    <span className="font-bold text-rose-400">{member.bloodGroup}</span>
                  </p>
                )}
                <p>
                  <strong className="text-slate-400">Joined:</strong>{" "}
                  {formatDate(member.joiningDate)}
                </p>
                <p>
                  <strong className="text-slate-400">Valid Till:</strong>{" "}
                  <span className="text-emerald-300 font-bold">
                    {member.validityDate ? formatDate(member.validityDate) : "Permanent"}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Footer Bar with Seal & Signatures */}
          <div className="pt-2 border-t border-amber-400/40 flex items-center justify-between text-[8px] text-slate-300 relative z-10">
            <div className="text-left">
              <span className="font-serif italic text-amber-200 block">Pradip Kumar</span>
              <span className="uppercase text-[7px] text-slate-400 font-semibold">
                General Secretary
              </span>
            </div>

            <div className="px-2 py-0.5 rounded bg-emerald-800 text-amber-300 text-[8px] font-bold border border-emerald-600">
              OFFICIAL SEAL
            </div>

            <div className="text-right">
              <span className="font-serif italic text-amber-200 block">Governing Board</span>
              <span className="uppercase text-[7px] text-slate-400 font-semibold">Authorized</span>
            </div>
          </div>
        </div>

        {/* ================= CARD BACK ================= */}
        <div className="w-full max-w-[380px] mx-auto bg-white rounded-2xl border-2 border-slate-300 shadow-2xl p-4 text-slate-800 relative overflow-hidden flex flex-col justify-between aspect-[1.58/1] min-h-[460px]">
          {/* Top Address */}
          <div className="text-center border-b border-slate-200 pb-2 space-y-0.5">
            <span className="font-bold text-xs text-emerald-900 uppercase tracking-wider block">
              Registered Headquarters
            </span>
            <p className="text-[9px] text-slate-600 leading-tight">
              12, Raicharan Sadhukhan Road, Bridge, Near Gajnavi, Kolkata, West Bengal - 700037
            </p>
            <p className="text-[9px] text-slate-600">
              Phone: +91 9211420420 • Email: kumarpradip0303@gmail.com
            </p>
          </div>

          {/* QR Code & Scan verification */}
          <div className="flex items-center gap-4 py-3">
            {qrCodeUrl ? (
              <div className="p-1 rounded-xl bg-white border border-slate-200 shadow-sm shrink-0">
                <img src={qrCodeUrl} alt="QR Code Verification" className="w-24 h-24" />
              </div>
            ) : (
              <div className="w-24 h-24 bg-slate-100 rounded-xl flex items-center justify-center text-[10px] text-slate-400">
                QR Code
              </div>
            )}

            <div className="space-y-1 text-left text-[9px] text-slate-600">
              <span className="font-bold text-emerald-800 uppercase block">Scan to Verify ID</span>
              <p>
                Scan the QR code with any smartphone camera to verify this member’s active status
                directly on our official portal.
              </p>
              <p className="font-mono text-[8px] text-slate-400 pt-0.5">
                UID: {member.membershipId}
              </p>
            </div>
          </div>

          {/* Terms / Instructions */}
          <div className="text-[8px] text-slate-500 border-t border-slate-200 pt-2 space-y-1">
            <p>1. This card is non-transferable and remains the property of the organisation.</p>
            <p>2. If found, please return to the Kolkata Headquarters address above.</p>
            <p className="text-center font-bold text-emerald-900 pt-1">
              www.jivandhara.org • Serving Humanity
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
