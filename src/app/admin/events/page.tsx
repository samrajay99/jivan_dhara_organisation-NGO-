import React from "react";
import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import AdminEventsClient from "./AdminEventsClient";

export const metadata: Metadata = {
  title: "Events Management | Admin Portal",
};

export const revalidate = 0;

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { date: "desc" },
    include: { registrations: true },
  });

  return <AdminEventsClient initialEvents={events} />;
}
