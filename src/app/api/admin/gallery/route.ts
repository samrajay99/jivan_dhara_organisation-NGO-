import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const { title, category, url, caption } = await req.json();

    if (!title || !url) {
      return NextResponse.json({ error: "Title and URL are required" }, { status: 400 });
    }

    const item = await prisma.galleryItem.create({
      data: {
        title,
        category: category || "EVENTS",
        url,
        caption: caption || null,
        isFeatured: true,
      },
    });

    return NextResponse.json({ success: true, item });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to add photo" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await prisma.galleryItem.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to delete photo" }, { status: 500 });
  }
}
