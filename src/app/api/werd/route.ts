import prisma from "@/lib/db";
import { getServerSession } from "@/lib/nextAuth";
import { postRequestValidator } from "@/lib/validators/werd";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    const [data, session] = await Promise.all([request.json(), getServerSession()]);
    const { text, count } = postRequestValidator.parse(data);
    if (!session) return NextResponse.json({ message: "user is not signed in" }, { status: 401 });
    const werd = await prisma.werd.create({ data: { userId: session.user.id, text, count: Number(count) } });
    return NextResponse.json(werd, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) return NextResponse.json(error, { status: 400 });
    return NextResponse.json(error, { status: 500 });
  }
}
