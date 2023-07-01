import prisma from "@/lib/db";
import { getServerSession } from "@/lib/nextAuth";
import { postRequestValidator } from "@/lib/validators/group";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name } = postRequestValidator.parse(data);
    const session = (await getServerSession()) as Session;
    if (!session) throw Error("user is not signed in");
    const group = await prisma.group.create({ data: { name, adminId: session.user.id } });
    return NextResponse.json(group, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
