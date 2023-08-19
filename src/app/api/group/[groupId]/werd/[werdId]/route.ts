import prisma from "@/lib/db";
import { getServerSession } from "@/lib/nextAuth";
import { addDays } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(_request: NextRequest, { params: { werdId } }: { params: { werdId: string } }) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ message: "user is not signed in" }, { status: 401 });
    const werd = await prisma.groupWerd.findUnique({
      where: { id: werdId },
      include: {
        completions: { where: { userId: session.user.id, completedAt: addDays(new Date(), -1) } },
        streaks: { where: { groupWerdId: werdId, userId: session.user.id } },
      },
    });
    if (!werd) return NextResponse.json({ message: "requested werd not found" }, { status: 404 });
    const streak = werd.streaks[0];
    const completion = werd.completions[0];
    await prisma.groupWerd.update({
      where: { id: werdId },
      data: {
        completions: {
          create: { userId: session.user.id, count: Number(werd.count) },
        },
        streaks: {
          upsert: {
            where: { id: streak?.id ?? "" },
            create: { userId: session.user.id },
            update: {
              currentStreak: { increment: 1 },
              longestStreak: completion ? streak.currentStreak + 1 : streak.longestStreak,
              lastCompletedAt: new Date(),
            },
          },
        },
      },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params: { werdId, groupId } }: { params: { werdId: string; groupId: string } }
) {
  try {
    const [session, group] = await Promise.all([
      getServerSession(),
      prisma.group.findUnique({ where: { id: groupId } }),
    ]);
    if (!session) return NextResponse.json({ message: "user is not signed in" }, { status: 401 });
    if (!group) return NextResponse.json({ message: "requested group not found" }, { status: 404 });
    if (session.user.id !== group.adminId)
      return NextResponse.json({ message: "user is not authorized to perform this action" }, { status: 403 });
    await prisma.groupWerd.delete({ where: { id: werdId } });
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
