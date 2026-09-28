import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { generateMembershipId } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const session = await requireAdmin();
    const { memberId } = await req.json();

    if (!memberId) {
      return NextResponse.json({ error: "Member ID is required" }, { status: 400 });
    }

    const member = await prisma.member.findUnique({
      where: { id: memberId },
      include: { payments: true },
    });

    if (!member) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    // Generate unique membership ID if not present
    let membershipId = member.membershipId;
    if (!membershipId) {
      const approvedCount = await prisma.member.count({
        where: { status: "APPROVED" },
      });
      membershipId = generateMembershipId(approvedCount + 1);
    }

    const joiningDate = member.joiningDate || new Date();
    const validityDate = new Date(joiningDate);
    validityDate.setFullYear(validityDate.getFullYear() + 5); // 5 year term

    const updated = await prisma.member.update({
      where: { id: memberId },
      data: {
        membershipId,
        status: "APPROVED",
        joiningDate,
        validityDate,
        rejectionReason: null,
        payments: {
          updateMany: {
            where: { memberId: member.id },
            data: {
              status: "VERIFIED",
              verifiedAt: new Date(),
              verifiedBy: session.name,
            },
          },
        },
      },
    });

    // Notify user if userId exists
    if (member.userId) {
      await prisma.notification.create({
        data: {
          userId: member.userId,
          title: "Membership Approved!",
          message: `Congratulations! Your membership has been approved with Membership ID: ${membershipId}. Your official ID card is now ready in your dashboard.`,
          type: "MEMBERSHIP",
        },
      });
    }

    return NextResponse.json({ success: true, member: updated });
  } catch (err: any) {
    console.error("Approve member error:", err);
    return NextResponse.json({ error: err.message || "Failed to approve member" }, { status: 500 });
  }
}
