import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { name, roleOrTitle, rating, content, isMember } = await req.json();

    if (!name || !content) {
      return NextResponse.json(
        { error: "Name and review content are required." },
        { status: 400 }
      );
    }

    const review = await prisma.review.create({
      data: {
        name,
        roleOrTitle: roleOrTitle || "Supporter",
        rating: parseInt(rating) || 5,
        content,
        isMember: Boolean(isMember),
        status: "PENDING", // Requires admin approval
      },
    });

    return NextResponse.json({ success: true, review });
  } catch (err: any) {
    console.error("Review submission error:", err);
    return NextResponse.json(
      { error: "Failed to submit review." },
      { status: 500 }
    );
  }
}
