import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(_request: NextRequest, { params: { werdId } }: { params: { werdId: string } }) {
  try {
    const werd = await prisma.werd.delete({ where: { id: werdId } });
    return NextResponse.json(werd, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function PUT(_request: NextRequest, { params: { werdId } }: { params: { werdId: string } }) {
  try {
    const werd = await prisma.werd.findUnique({ where: { id: werdId } });
    if (!werd) throw new Error("requested werd not found");
    const updatedWerd = await prisma.werd.update({
      where: { id: werdId },
      data: {
        completed: true,
        lastCompletedAt: new Date(),
        currentStreak: { increment: 1 },
        longestStreak: Math.max(werd.currentStreak + 1, werd.longestStreak),
        completions: { create: { count: werd.count } },
      },
    });
    return NextResponse.json(updatedWerd, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
