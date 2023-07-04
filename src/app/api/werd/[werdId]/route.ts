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
    const userWerd = await prisma.userWerd.findUnique({
      where: { id: werdId },
      include: { streak: true, werd: true },
    });
    if (!userWerd) throw new Error("requested werd not found");
    const updatedWerd = await prisma.userWerd.update({
      where: { id: werdId },
      data: {
        completed: true,
        lastCompletedAt: new Date(),
        streak: {
          update: {
            currentStreak: { increment: 1 },
            longestStreak: Math.max(userWerd.streak.currentStreak + 1, userWerd.streak.longestStreak),
          },
        },
        completions: { create: { count: userWerd.werd.count } },
      },
    });
    return NextResponse.json(updatedWerd, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
