import React from "react";
import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import AdminNoticesClient from "./AdminNoticesClient";

export const metadata: Metadata = {
  title: "Notice Board Management | Admin Portal",
};

export const revalidate = 0;

export default async function AdminNoticesPage() {
  const notices = await prisma.notice.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <AdminNoticesClient initialNotices={notices} />;
}
