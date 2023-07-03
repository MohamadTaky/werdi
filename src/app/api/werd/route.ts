import prisma from "@/lib/db";
import { getServerSession } from "@/lib/nextAuth";
import { postRequestValidator } from "@/lib/validators/werd";
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
