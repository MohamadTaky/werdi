import prisma from "@/lib/db";
import { getServerSession } from "@/lib/nextAuth";
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
    const session = await getServerSession();
    if (!session) return NextResponse.json({ message: "user is not signed in" }, { status: 401 });
    const werd = await prisma.werd.findFirst({ where: { id: werdId, userId: session.user.id } });
    if (!werd) return NextResponse.json({ message: "requested werd not found" }, { status: 404 });
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
    return NextResponse.json(updatedWerd, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
