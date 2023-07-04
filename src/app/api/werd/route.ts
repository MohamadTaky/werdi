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
    const werd = await prisma.userWerd.create({
      data: {
        user: { connect: { id: session.user.id } },
        werd: { create: { text, count: Number(count) } },
        streak: { create: {} },
      },
    });
    return NextResponse.json(werd, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
