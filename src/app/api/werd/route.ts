import prisma from "@/lib/db";
import { getServerSession } from "@/lib/nextAuth";
import { postRequestValidator } from "@/lib/validators/werd";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { text, count } = postRequestValidator.parse(data);
    const session = await getServerSession();
    if (!session) return NextResponse.json({ message: "user is not signed in" }, { status: 401 });
    const werd = await prisma.werd.create({
      data: {
        userId: session.user.id,
        text,
        count: Number(count),
      },
    });
    return NextResponse.json(werd, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
