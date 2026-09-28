import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateRegistrationNumber } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const { eventId, name, mobile, email, attendeesCount, remarks } =
      await req.json();

    if (!eventId || !name || !mobile || !email) {
      return NextResponse.json(
        { error: "Event, name, mobile and email are required." },
        { status: 400 }
      );
    }

    const regNumber = generateRegistrationNumber("JDO-EVT");

    const registration = await prisma.eventRegistration.create({
      data: {
        eventId,
        registrationNumber: regNumber,
        name,
        mobile,
        email,
        attendeesCount: parseInt(attendeesCount) || 1,
        remarks: remarks || null,
        status: "REGISTERED",
      },
    });

    return NextResponse.json({
      success: true,
      registrationNumber: regNumber,
      registration,
    });
  } catch (err: any) {
    console.error("Event registration error:", err);
    return NextResponse.json(
      { error: "Failed to register for event." },
      { status: 500 }
    );
  }
}
