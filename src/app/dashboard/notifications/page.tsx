import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Bell, CheckCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Notifications | Jivan Dhara Organisation",
};

export default async function NotificationsDashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const notifications = await prisma.notification.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Notifications & Alerts</h2>
          <p className="text-xs text-slate-500">
            System announcements, membership status updates, and camp notices.
          </p>
        </div>

        {notifications.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-2xl text-slate-500 text-xs">
            No notifications at this time.
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((n) => (
              <div
                key={n.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{n.title}</span>
                  <span className="text-[10px] text-slate-400">{formatDate(n.createdAt)}</span>
                </div>
                <p className="text-xs text-slate-600">{n.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
