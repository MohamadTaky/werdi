import prisma from "@/lib/db";
import { addDays } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(_request: NextRequest) {
  const userWerds = await prisma.userWerd.findMany({
    where: { lastCompletedAt: { lt: addDays(new Date(), -1) } },
  });

  for (const userWerd of userWerds) {
    await prisma.userWerd.update({
      where: { id: userWerd.id },
      data: { completed: false, streak: { update: { currentStreak: 0 } } },
    });
  }

  return NextResponse.json({}, { status: 200 });
}
