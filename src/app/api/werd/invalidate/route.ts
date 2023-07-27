import prisma from "@/lib/db";
import { startOfYesterday } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(_request: NextRequest) {
  await Promise.all([
    prisma.werd.updateMany({
      where: { lastCompletedAt: { lt: startOfYesterday() } },
      data: { completed: false, currentStreak: 0 },
    }),
  ]);
  return NextResponse.json({}, { status: 200 });
}
