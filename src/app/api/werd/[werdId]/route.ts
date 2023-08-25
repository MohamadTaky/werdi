import prisma from "@/lib/db";
import { getServerSession } from "@/lib/nextAuth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(_request: NextRequest, { params: { werdId } }: { params: { werdId: string } }) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ message: "user is not signed in" }, { status: 401 });
    const werd = await prisma.werd.findUnique({ where: { id: werdId } });
    if (!werd) return NextResponse.json({ message: "requested werd not found" }, { status: 404 });
    if (werd.userId !== session.user.id)
      return NextResponse.json({ message: "user is not authorized to perform this action" }, { status: 403 });
    await prisma.werd.delete({ where: { id: werdId } });
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function PUT(_request: NextRequest, { params: { werdId } }: { params: { werdId: string } }) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ message: "user is not signed in" }, { status: 401 });
    const werd = await prisma.werd.findUnique({ where: { id: werdId } });
    if (!werd) return NextResponse.json({ message: "requested werd not found" }, { status: 404 });
    if (werd.userId !== session.user.id)
      return NextResponse.json({ message: "user is not authorized to perform this action" }, { status: 403 });
    const updatedWerd = await prisma.werd.update({
      where: { id: werdId },
      data: {
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
