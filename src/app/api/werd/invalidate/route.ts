import prisma from "@/lib/db";
import { addDays, endOfDay } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(_request: NextRequest) {
  await prisma.werd.updateMany({
    where: { lastCompletedAt: { lt: endOfDay(addDays(new Date(), -1)) } },
    data: { completed: false, currentStreak: 0 },
  });
  return NextResponse.json({}, { status: 200 });
}
