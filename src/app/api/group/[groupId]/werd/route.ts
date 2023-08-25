import prisma from "@/lib/db";
import { getServerSession } from "@/lib/nextAuth";
import { postRequestValidator } from "@/lib/validators/groupWerd";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: NextRequest, { params: { groupId } }: { params: { groupId: string } }) {
  try {
    const [data, group, session] = await Promise.all([
      request.json(),
      prisma.group.findUnique({ where: { id: groupId }, include: { members: { where: { role: "ADMIN" } } } }),
      getServerSession(),
    ]);
    const { text, count } = postRequestValidator.parse(data);
    if (!session) return NextResponse.json({ message: "user is not signed in" }, { status: 401 });
    if (!group) return NextResponse.json({ message: "requested group not found" }, { status: 404 });
    if (!group.members.some((member) => member.userId === session.user.id))
      return NextResponse.json({ message: "user is not authorized to make this action" }, { status: 403 });
    const groupWerd = await prisma.groupWerd.create({ data: { groupId, text, count: Number(count) } });
    return NextResponse.json(groupWerd, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) NextResponse.json(error, { status: 400 });
    return NextResponse.json(error, { status: 500 });
  }
}
