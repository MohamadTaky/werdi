import prisma from "@/lib/db";
import { startOfYesterday } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(_request: NextRequest) {
  try {
    await Promise.all([
      prisma.werd.updateMany({
        where: { lastCompletedAt: { lt: startOfYesterday() } },
        data: { currentStreak: 1, completed: false },
      }),
      prisma.groupWerdStreak.updateMany({
        where: { lastCompletedAt: { lt: startOfYesterday() } },
        data: { currentStreak: 1 },
      }),
    ]);
    return NextResponse.json({}, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
