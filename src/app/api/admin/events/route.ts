import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const { title, date, startTime, endTime, location, description, maxAttendees, coverImage } =
      await req.json();

    if (!title || !date || !location) {
      return NextResponse.json(
        { error: "Title, date, and location are required." },
        { status: 400 }
      );
    }

    const slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString().slice(-4)}`;

    const event = await prisma.event.create({
      data: {
        title,
        slug,
        date,
        startTime: startTime || "10:00 AM",
        endTime: endTime || "04:00 PM",
        location,
        description: description || "Community health and welfare event organized by JDO.",
        maxAttendees: parseInt(maxAttendees) || 100,
        coverImage: coverImage || null,
        status: "UPCOMING",
        isPublished: true,
      },
    });

    return NextResponse.json({ success: true, event });
  } catch (err: any) {
    console.error("Create event error:", err);
    return NextResponse.json({ error: err.message || "Failed to create event" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Event ID is required" }, { status: 400 });
    }

    await prisma.event.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Delete event error:", err);
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}
