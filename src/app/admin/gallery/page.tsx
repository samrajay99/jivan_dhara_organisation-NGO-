import React from "react";
import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import AdminGalleryClient from "./AdminGalleryClient";

export const metadata: Metadata = {
  title: "Gallery Management | Admin Portal",
};

export const revalidate = 0;

export default async function AdminGalleryPage() {
  const items = await prisma.galleryItem.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <AdminGalleryClient initialItems={items} />;
}
