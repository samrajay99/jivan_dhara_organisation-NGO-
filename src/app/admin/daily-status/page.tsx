import React from "react";
import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import AdminDailyStatusClient from "./AdminDailyStatusClient";

export const metadata: Metadata = {
  title: "Daily Status Management | Admin Portal",
};

export const revalidate = 0;

export default async function AdminDailyStatusPage() {
  const statuses = await prisma.dailyStatus.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <AdminDailyStatusClient initialStatuses={statuses} />;
}
