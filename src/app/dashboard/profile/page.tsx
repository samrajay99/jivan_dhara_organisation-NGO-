import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { User, Mail, Phone, MapPin, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Profile Details | Jivan Dhara Organisation",
};

export default async function ProfileDashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const member = user.member;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Member Profile</h2>
          <p className="text-xs text-slate-500">
            Registered KYC and contact details for your official membership record.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-700">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-400 font-medium block">Full Name</span>
            <p className="font-bold text-slate-900">{user.name}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-400 font-medium block">Registered Email</span>
            <p className="font-bold text-slate-900">{user.email}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-400 font-medium block">Mobile Phone</span>
            <p className="font-bold text-slate-900">{member?.mobile || user.phone || "N/A"}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-400 font-medium block">Blood Group</span>
            <p className="font-bold text-slate-900">{member?.bloodGroup || "N/A"}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-400 font-medium block">KYC Document</span>
            <p className="font-mono text-slate-900">
              {member?.idType} ({member?.idNumber})
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-400 font-medium block">Regional Branch</span>
            <p className="font-bold text-slate-900">{member?.branch || "Kolkata Central"}</p>
          </div>

          <div className="md:col-span-2 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-400 font-medium block">Registered Address</span>
            <p className="text-slate-800">
              {member?.address}, {member?.villageTown}, P.O. {member?.postOffice}, P.S.{" "}
              {member?.policeStation}, {member?.district}, {member?.state} - {member?.pinCode}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
