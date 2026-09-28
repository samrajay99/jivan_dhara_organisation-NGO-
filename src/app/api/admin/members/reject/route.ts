import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await requireAdmin();
    const { memberId, reason } = await req.json();

    if (!memberId) {
      return NextResponse.json({ error: "Member ID is required" }, { status: 400 });
    }

    const updated = await prisma.member.update({
      where: { id: memberId },
      data: {
        status: "REJECTED",
        rejectionReason: reason || "KYC details or UPI verification mismatch.",
        payments: {
          updateMany: {
            where: { memberId },
            data: {
              status: "FAILED",
            },
          },
        },
      },
    });

    if (updated.userId) {
      await prisma.notification.create({
        data: {
          userId: updated.userId,
          title: "Membership Application Update",
          message: `Your membership application was not approved. Reason: ${
            reason || "Payment or KYC verification mismatch."
          }`,
          type: "MEMBERSHIP",
        },
      });
    }

    return NextResponse.json({ success: true, member: updated });
  } catch (err: any) {
    console.error("Reject member error:", err);
    return NextResponse.json({ error: err.message || "Failed to reject member" }, { status: 500 });
  }
}
