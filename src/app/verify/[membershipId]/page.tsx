import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Calendar,
  UserCheck,
  Building,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";
import prisma from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

interface VerifyPageProps {
  params: Promise<{ membershipId: string }>;
}

export async function generateMetadata({ params }: VerifyPageProps): Promise<Metadata> {
  const { membershipId } = await params;
  return {
    title: `Verify Member ${membershipId} | Jivan Dhara Organisation`,
    description: `Official digital membership verification record for ${membershipId}.`,
  };
}

export const revalidate = 0;

export default async function VerifyMembershipPage({ params }: VerifyPageProps) {
  const { membershipId } = await params;

  const member = await prisma.member.findUnique({
    where: { membershipId: decodeURIComponent(membershipId) },
    select: {
      membershipId: true,
      fullName: true,
      gender: true,
      bloodGroup: true,
      membershipType: true,
      branch: true,
      status: true,
      joiningDate: true,
      validityDate: true,
      photoUrl: true,
    },
  });

  const isApproved = member && member.status === "APPROVED";

  return (
    <div className="bg-slate-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 p-6 text-white text-center space-y-2">
          <div className="relative w-14 h-14 rounded-full overflow-hidden mx-auto border-2 border-amber-400 shadow-md bg-white mb-2">
            <Image
              src="/logo.png"
              alt="Jivan Dhara Organisation Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <h1 className="text-lg font-bold text-white tracking-tight">
            Jivan Dhara Organisation
          </h1>
          <p className="text-[11px] text-emerald-300 uppercase tracking-wider font-semibold">
            Official Membership Verification Portal
          </p>
        </div>

        {/* Verification Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {member ? (
            isApproved ? (
              <div className="space-y-6">
                {/* Status Badge */}
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-emerald-800 font-extrabold text-base">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>VERIFIED ACTIVE MEMBER</span>
                  </div>
                  <p className="text-[11px] text-emerald-700">
                    This credential is authenticated against the central database of Jivan Dhara Organisation.
                  </p>
                </div>

                {/* Member Public Info Card */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-800 text-white flex items-center justify-center font-bold text-xl overflow-hidden shrink-0 shadow-inner">
                    {member.photoUrl ? (
                      <img
                        src={member.photoUrl}
                        alt={member.fullName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      member.fullName.charAt(0)
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Member Name
                    </span>
                    <h2 className="text-lg font-extrabold text-slate-900">{member.fullName}</h2>
                    <span className="inline-block font-mono text-xs font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded mt-0.5">
                      {member.membershipId}
                    </span>
                  </div>
                </div>

                {/* Verified Metadata List */}
                <div className="space-y-2.5 text-xs text-slate-600 border-t border-b border-slate-100 py-4">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">Membership Type:</span>
                    <span className="font-bold text-slate-800">{member.membershipType}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">Regional Branch:</span>
                    <span className="font-bold text-slate-800">{member.branch}</span>
                  </div>

                  {member.bloodGroup && (
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-medium">Blood Group:</span>
                      <span className="font-bold text-rose-700">{member.bloodGroup}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">Date of Joining:</span>
                    <span className="font-bold text-slate-800">
                      {formatDate(member.joiningDate)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">Validity:</span>
                    <span className="font-bold text-emerald-800">
                      {member.validityDate ? formatDate(member.validityDate) : "Permanent"}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 leading-relaxed text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline mr-1" />
                  In compliance with privacy norms, sensitive KYC numbers, addresses, and phone
                  numbers are concealed from public verification screens.
                </div>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                  <AlertTriangle className="w-10 h-10" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Application Under Review</h2>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  Membership record <strong>{member.membershipId}</strong> exists with status:{" "}
                  <span className="font-bold text-amber-700">{member.status}</span>.
                </p>
              </div>
            )
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                <XCircle className="w-10 h-10" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Invalid Membership ID</h2>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                No active membership record was found for <strong>{membershipId}</strong>. Please check
                the ID number or scan the QR code again.
              </p>
            </div>
          )}

          <div className="pt-2 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
