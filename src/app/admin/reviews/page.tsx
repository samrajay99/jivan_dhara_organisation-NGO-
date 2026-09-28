import React from "react";
import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import AdminReviewsClient from "./AdminReviewsClient";

export const metadata: Metadata = {
  title: "Reviews Moderation | Admin Portal",
};

export const revalidate = 0;

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <AdminReviewsClient initialReviews={reviews} />;
}
