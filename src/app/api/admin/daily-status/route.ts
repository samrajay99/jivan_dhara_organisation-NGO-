import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const { title, description, date, location, category, volunteersCount, beneficiariesCount, photos } =
      await req.json();

    if (!title || !description || !location) {
      return NextResponse.json({ error: "Title, description, and location are required" }, { status: 400 });
    }

    const item = await prisma.dailyStatus.create({
      data: {
        title,
        description,
        date: date || new Date().toISOString().slice(0, 10),
        location,
        category: category || "General Welfare",
        volunteersCount: parseInt(volunteersCount) || 0,
        beneficiariesCount: parseInt(beneficiariesCount) || 0,
        photos: photos || null,
        isPublished: true,
      },
    });

    return NextResponse.json({ success: true, item });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create status" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await prisma.dailyStatus.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
