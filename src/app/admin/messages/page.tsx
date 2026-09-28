import React from "react";
import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import AdminMessagesClient from "./AdminMessagesClient";

export const metadata: Metadata = {
  title: "Inquiries & Volunteer Applications | Admin Portal",
};

export const revalidate = 0;

export default async function AdminMessagesPage() {
  const [messages, volunteers] = await Promise.all([
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.volunteerApplication.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return <AdminMessagesClient messages={messages} volunteers={volunteers} />;
}
