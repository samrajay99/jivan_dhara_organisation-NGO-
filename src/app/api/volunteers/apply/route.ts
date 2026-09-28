import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      phone,
      email,
      location,
      skills,
      availability,
      areasOfInterest,
      message,
    } = await req.json();

    if (!name || !phone || !email || !skills) {
      return NextResponse.json(
        { error: "Name, phone, email and skills are required." },
        { status: 400 }
      );
    }

    const application = await prisma.volunteerApplication.create({
      data: {
        name,
        phone,
        email,
        location: location || "West Bengal",
        skills,
        availability: availability || "Flexible",
        areasOfInterest: areasOfInterest || "General Social Welfare",
        message: message || null,
        status: "PENDING",
      },
    });

    return NextResponse.json({ success: true, application });
  } catch (err: any) {
    console.error("Volunteer application error:", err);
    return NextResponse.json(
      { error: "Failed to submit volunteer application." },
      { status: 500 }
    );
  }
}
