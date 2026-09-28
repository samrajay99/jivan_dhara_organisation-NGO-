import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const settings = await req.json();

    for (const [key, value] of Object.entries(settings)) {
      if (typeof value === "string") {
        await prisma.siteSetting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Settings update error:", err);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
