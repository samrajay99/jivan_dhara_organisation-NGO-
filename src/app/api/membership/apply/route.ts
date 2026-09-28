import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword, createSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      fullName,
      parentName,
      dob,
      gender,
      bloodGroup,
      mobile,
      whatsapp,
      email,
      idType,
      idNumber,
      address,
      villageTown,
      postOffice,
      policeStation,
      district,
      state,
      pinCode,
      photoUrl,
      membershipType,
      branch,
      occupation,
      education,
      volunteerInterests,
      emergencyContact,
      source,
      upiRef,
      screenshotUrl,
      password,
    } = body;

    if (!fullName || !mobile || !email || !idNumber || !upiRef) {
      return NextResponse.json(
        { error: "Please provide all required personal and payment details." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // 1. Create or Find User
    let user = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (!user) {
      const passToHash = password || `Jdo@${mobile.slice(-4)}`;
      const passwordHash = await hashPassword(passToHash);

      user = await prisma.user.create({
        data: {
          name: fullName,
          email: cleanEmail,
          passwordHash,
          phone: mobile,
          role: "MEMBER",
        },
      });
    }

    // 2. Create Member Record in PENDING status
    const member = await prisma.member.create({
      data: {
        userId: user.id,
        fullName,
        parentName: parentName || "N/A",
        dob: dob || "N/A",
        gender: gender || "Male",
        bloodGroup: bloodGroup || "O+",
        mobile,
        whatsapp: whatsapp || mobile,
        email: cleanEmail,
        idType: idType || "Aadhaar",
        idNumber,
        address: address || "N/A",
        villageTown: villageTown || "N/A",
        postOffice: postOffice || "N/A",
        policeStation: policeStation || "N/A",
        district: district || "Kolkata",
        state: state || "West Bengal",
        pinCode: pinCode || "700037",
        photoUrl: photoUrl || null,
        membershipType: membershipType || "General Member",
        branch: branch || "Kolkata Central",
        occupation: occupation || null,
        education: education || null,
        volunteerInterests: volunteerInterests || null,
        emergencyContact: emergencyContact || null,
        source: source || "Website",
        status: "PENDING",
        payments: {
          create: {
            amount: 50,
            paymentMethod: "UPI",
            upiRef,
            screenshotUrl: screenshotUrl || null,
            status: "SUBMITTED",
          },
        },
      },
      include: {
        payments: true,
      },
    });

    // 3. Create Notification for Member
    await prisma.notification.create({
      data: {
        userId: user.id,
        title: "Membership Application Received",
        message:
          "Your ₹50 membership application is under review by the Governing Committee. You will be notified upon verification.",
        type: "MEMBERSHIP",
      },
    });

    // 4. Create Session
    await createSession({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      memberId: member.id,
      membershipId: member.membershipId,
    });

    return NextResponse.json({
      success: true,
      memberId: member.id,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err: any) {
    console.error("Membership application error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to submit membership application." },
      { status: 500 }
    );
  }
}
