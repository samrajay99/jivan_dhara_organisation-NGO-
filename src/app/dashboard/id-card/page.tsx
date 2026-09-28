import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import MemberIdCard from "@/components/dashboard/MemberIdCard";

export const metadata: Metadata = {
  title: "My Official ID Card | Jivan Dhara Organisation",
};

export default async function IdCardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  if (!user.member) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">No Membership Record Found</h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          You have an active login account, but have not submitted the ₹50 official membership application yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <MemberIdCard member={user.member} />
    </div>
  );
}
