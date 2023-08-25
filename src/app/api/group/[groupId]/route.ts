import prisma from "@/lib/db";
import { getServerSession } from "@/lib/nextAuth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _request: NextRequest,
  { params: { groupId } }: { params: { groupId: string } }
) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ message: "user is not signed in" }, { status: 401 });
    const group = await prisma.group.findUnique({
      where: { id: groupId },
      include: { members: { where: { role: "ADMIN" } } },
    });
    if (!group) return NextResponse.json({ message: "requested group not found" }, { status: 404 });
    if (!group.members.some((member) => member.userId === session.user.id))
      return NextResponse.json({ message: "user is not authorized to perform this action" }, { status: 403 });
    await prisma.group.delete({ where: { id: groupId } });
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

//export async function PUT
