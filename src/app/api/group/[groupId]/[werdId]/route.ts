import prisma from "@/lib/db";
import { getServerSession } from "@/lib/nextAuth";
import { putRequestValidator } from "@/lib/validators/groupWerd";
import { addDays } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params: { werdId } }: { params: { werdId: string } }) {
  try {
    const data = await request.json();
    const { count } = putRequestValidator.parse(data);
    const session = await getServerSession();

    const werd = await prisma.groupWerd.findUnique({
      where: { id: werdId },
      include: {
        completions: { where: { userId: session?.user.id, completedAt: addDays(new Date(), -1) } },
        streaks: { where: { groupWerdId: werdId, userId: session?.user.id } },
      },
    });

    if (!session || !werd) return NextResponse.json({}, { status: 500 });

    console.log(werd);

    const updateWerd = await prisma.groupWerd.update({
      where: { id: werdId },
      data: {
        completions: {
          create: {
            userId: session.user.id,
            count: Number(count),
          },
        },
        streaks: {
          upsert: {
            where: { id: werd.streaks[0]?.id ?? "" },
            create: { userId: session.user.id },
            update: {
              currentStreak: { increment: 1 },
              longestStreak: werd?.completions[0] ? werd.streaks[0].currentStreak + 1 : 0,
            },
          },
        },
      },
    });

    return NextResponse.json(updateWerd, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params: { werdId } }: { params: { werdId: string } }) {
  try {
    await prisma.groupWerd.delete({ where: { id: werdId } });
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
