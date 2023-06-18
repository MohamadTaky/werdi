import prisma from "@/lib/db";
import { postRequestValidator, putRequestValidator } from "@/validators/werd";
import { getServerSession, Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { text, count } = postRequestValidator.parse(data);
    const session = (await getServerSession(authOptions)) as Session;
    const werd = await prisma.werd.create({
      data: {
        text,
        count: Number(count),
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
    const { done, id } = putRequestValidator.parse(data);
    const werd = await prisma.werd.update({ where: { id }, data: { done } });
    return NextResponse.json(werd, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
