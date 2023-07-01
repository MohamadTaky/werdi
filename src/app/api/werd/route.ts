import prisma from "@/lib/db";
import { getServerSession } from "@/lib/nextAuth";
import { postRequestValidator, putRequestValidator } from "@/lib/validators/werd";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { text, count } = postRequestValidator.parse(data);
    const session = (await getServerSession()) as Session;
    const werd = await prisma.werd.create({
      data: {
        text,
        currentCount: Number(count),
        userId: session.user.id,
      },
    });
    return NextResponse.json(werd, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { completed, id, count } = putRequestValidator.parse(data);
    const werd = await prisma.werd.findUnique({ where: { id } });
    if (!werd) throw new Error("requested werd not found");
    const updatedWerd = await prisma.werd.update({
      where: { id },
      data: {
        completed,
        lastCompletedAt: new Date(),
        streak: { increment: 1 },
        longestStreak: Math.max(werd.streak + 1, werd.longestStreak),
        completions: {
          create: {
            count,
            completedAt: new Date(),
          },
        },
      },
    });
    return NextResponse.json(updatedWerd, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
