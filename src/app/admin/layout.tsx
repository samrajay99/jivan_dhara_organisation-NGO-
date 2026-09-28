import React from "react";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Heart,
  Calendar,
  FileText,
  Activity,
  Image as ImageIcon,
  MessageSquare,
  Settings,
  ShieldCheck,
  Star,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { requireAdmin, getCurrentUser } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const adminRoles = ["SUPER_ADMIN", "ADMIN", "CONTENT_MANAGER", "MEMBERSHIP_MANAGER", "FINANCE_MANAGER"];
  if (!adminRoles.includes(user.role)) {
    redirect("/dashboard");
  }

  const navItems = [
    { name: "Dashboard Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Member Applications", href: "/admin/members", icon: Users },
    { name: "Donation Records", href: "/admin/donations", icon: Heart },
    { name: "Events & Registrations", href: "/admin/events", icon: Calendar },
    { name: "Notice Board", href: "/admin/notices", icon: FileText },
    { name: "Daily Field Logs", href: "/admin/daily-status", icon: Activity },
    { name: "Photo Gallery", href: "/admin/gallery", icon: ImageIcon },
    { name: "Testimonial Approvals", href: "/admin/reviews", icon: Star },
    { name: "Messages & Volunteers", href: "/admin/messages", icon: MessageSquare },
    { name: "Website CMS Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="bg-slate-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Admin Navigation Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md space-y-3">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-amber-400 shrink-0 bg-white shadow">
                  <Image
                    src="/logo.png"
                    alt="Jivan Dhara Organisation Logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
                    Governing Admin Portal
                  </span>
                  <h2 className="font-bold text-sm truncate">{user.name}</h2>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                <span>Role:</span>
                <span className="font-mono font-bold text-emerald-400">{user.role}</span>
              </div>
            </div>

            <nav className="bg-white rounded-3xl border border-slate-200 p-3 shadow-sm space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </Link>
                );
              })}

              <div className="pt-2 mt-2 border-t border-slate-100">
                <Link
                  href="/"
                  className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-800"
                >
                  <span>View Public Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </nav>
          </div>

          {/* Admin Content Area */}
          <div className="lg:col-span-9">{children}</div>
        </div>
      </div>
    </div>
  );
}
