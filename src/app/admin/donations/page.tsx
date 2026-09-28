import React from "react";
import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import AdminDonationsClient from "./AdminDonationsClient";

export const metadata: Metadata = {
  title: "Donations Management | Admin Portal",
};

export const revalidate = 0;

export default async function AdminDonationsPage() {
  const donations = await prisma.donation.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <AdminDonationsClient initialDonations={donations} />;
}
