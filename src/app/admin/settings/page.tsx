import React from "react";
import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/settings";
import AdminSettingsClient from "./AdminSettingsClient";

export const metadata: Metadata = {
  title: "Website CMS Settings | Admin Portal",
};

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();
  return <AdminSettingsClient initialSettings={settings} />;
}
