import prisma from "@/lib/db";
import { getServerSession } from "@/lib/nextAuth";
import { postRequestValidator } from "@/lib/validators/groupWerd";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: NextRequest, { params: { groupId } }: { params: { groupId: string } }) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ message: "user is not signed in" }, { status: 401 });
    const data = await request.json();
    const { text, count } = postRequestValidator.parse(data);
    const group = await prisma.group.findUnique({ where: { id: groupId } });
    if (!group) return NextResponse.json({ message: "requested group not found" }, { status: 404 });
    if (group.adminId != session.user.id)
      return NextResponse.json({ message: "user is not authorized to make this operation" }, { status: 403 });
    const groupWerd = await prisma.groupWerd.create({
      data: {
        groupId,
        text,
        count: Number(count),
      },
    });
    return NextResponse.json(groupWerd, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) NextResponse.json(error, { status: 400 });
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params: { groupId } }: { params: { groupId: string } }
) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ message: "user is not signed in" }, { status: 401 });
    const group = await prisma.group.findUnique({ where: { id: groupId } });
    if (!group) return NextResponse.json({ message: "requested group not found" }, { status: 404 });
    if (group.adminId !== session.user.id)
      return NextResponse.json({ message: "user is not authorized to perform this action" }, { status: 403 });
    await prisma.group.delete({ where: { id: groupId } });
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
