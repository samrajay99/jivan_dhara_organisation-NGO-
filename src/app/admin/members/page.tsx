import React from "react";
import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import AdminMembersClient from "./AdminMembersClient";

export const metadata: Metadata = {
  title: "Member Management | Admin Portal",
};

export const revalidate = 0;

export default async function AdminMembersPage() {
  const members = await prisma.member.findMany({
    orderBy: { createdAt: "desc" },
    include: { payments: true },
  });

  return <AdminMembersClient initialMembers={members} />;
}
