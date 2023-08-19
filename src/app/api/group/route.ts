import prisma from "@/lib/db";
import { getServerSession } from "@/lib/nextAuth";
import { postRequestValidator } from "@/lib/validators/group/group";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    const [data, session] = await Promise.all([request.json(), getServerSession()]);
    const { name } = postRequestValidator.parse(data);
    if (!session) return NextResponse.json({ message: "user is not signed in" }, { status: 401 });
    const group = await prisma.group.create({
      data: { name, adminId: session.user.id, members: { connect: { id: session.user.id } } },
    });
    return NextResponse.json(group, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) return NextResponse.json(error, { status: 400 });
    return NextResponse.json(error, { status: 500 });
  }
}
