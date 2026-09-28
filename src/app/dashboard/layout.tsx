import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  LayoutDashboard,
  User,
  ShieldCheck,
  CreditCard,
  Heart,
  Bell,
  LogOut,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { getCurrentUser } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const member = user.member;
  const isApproved = member?.status === "APPROVED";

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My ID Card", href: "/dashboard/id-card", icon: ShieldCheck, badge: isApproved ? "Active" : "Pending" },
    { name: "Membership & Payment", href: "/dashboard/membership", icon: CreditCard },
    { name: "Profile Details", href: "/dashboard/profile", icon: User },
    { name: "My Donations", href: "/dashboard/donations", icon: Heart },
    { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
  ];

  return (
    <div className="bg-slate-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            {/* User Profile Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-white flex items-center justify-center font-bold text-lg overflow-hidden shrink-0 shadow">
                  {member?.photoUrl ? (
                    <img
                      src={member.photoUrl}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    user.name.charAt(0)
                  )}
                </div>

                <div className="min-w-0">
                  <h2 className="font-bold text-slate-900 text-sm truncate">{user.name}</h2>
                  <p className="text-xs text-slate-500 truncate">{user.email}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Status:</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    isApproved
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {member?.status || "REGISTERED"}
                </span>
              </div>

              {member?.membershipId && (
                <div className="p-2 bg-slate-50 rounded-xl text-center font-mono text-xs font-bold text-emerald-900 border border-slate-200">
                  {member.membershipId}
                </div>
              )}
            </div>

            {/* Sidebar Navigation */}
            <nav className="bg-white rounded-3xl border border-slate-200 p-3 shadow-sm space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-emerald-700" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                          item.badge === "Active"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}

              {user.role.includes("ADMIN") && (
                <Link
                  href="/admin"
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 transition-colors mt-2"
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    <span>Go to Admin Portal</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              )}
            </nav>
          </div>

          {/* Main Dashboard Content */}
          <div className="lg:col-span-9">{children}</div>
        </div>
      </div>
    </div>
  );
}
