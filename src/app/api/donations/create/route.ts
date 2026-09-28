import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateReceiptNumber } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const {
      amount,
      donorName,
      email,
      mobile,
      panNumber,
      purpose,
      upiRef,
      isAnonymous,
    } = await req.json();

    if (!amount || amount <= 0 || !upiRef) {
      return NextResponse.json(
        { error: "Valid donation amount and UPI reference are required." },
        { status: 400 }
      );
    }

    const count = await prisma.donation.count();
    const receiptNumber = generateReceiptNumber(count + 1);

    const donation = await prisma.donation.create({
      data: {
        donorName: isAnonymous ? "Anonymous Donor" : donorName || "Well Wisher",
        email: email || null,
        mobile: mobile || null,
        amount: parseFloat(amount),
        panNumber: panNumber || null,
        purpose: purpose || "General Social Welfare",
        paymentMethod: "UPI",
        upiRef,
        isAnonymous: Boolean(isAnonymous),
        status: "PENDING",
        receiptNumber,
      },
    });

    return NextResponse.json({
      success: true,
      donation,
    });
  } catch (err: any) {
    console.error("Donation creation error:", err);
    return NextResponse.json(
      { error: "Failed to create donation record." },
      { status: 500 }
    );
  }
}
