import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const { title, description, date, priority, attachmentUrl, expiryDate } = await req.json();

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
    }

    const notice = await prisma.notice.create({
      data: {
        title,
        description,
        date: date || new Date().toISOString().slice(0, 10),
        priority: priority || "NORMAL",
        attachmentUrl: attachmentUrl || null,
        expiryDate: expiryDate || null,
        isPublished: true,
      },
    });

    return NextResponse.json({ success: true, notice });
  } catch (err: any) {
    console.error("Create notice error:", err);
    return NextResponse.json({ error: err.message || "Failed to create notice" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Notice ID required" }, { status: 400 });

    await prisma.notice.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to delete notice" }, { status: 500 });
  }
}
