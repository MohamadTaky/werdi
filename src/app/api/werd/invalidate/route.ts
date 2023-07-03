import prisma from "@/lib/db";
import { addDays } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(_request: NextRequest) {
  await prisma.werd.updateMany({
    where: { lastCompletedAt: { lt: addDays(new Date(), -1) } },
    data: { streak: 0, completed: false },
  });
  return NextResponse.json({}, { status: 200 });
}
