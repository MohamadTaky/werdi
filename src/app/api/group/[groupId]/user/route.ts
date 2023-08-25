import prisma from "@/lib/db";
import { getServerSession } from "@/lib/nextAuth";
import { deleteRequestValidator, postRequestValidator } from "@/lib/validators/group/user/groupUser";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: NextRequest, { params: { groupId } }: { params: { groupId: string } }) {
  try {
    const [session, group] = await Promise.all([
      getServerSession(),
      prisma.group.findUnique({ where: { id: groupId }, include: { members: { where: { role: "ADMIN" } } } }),
    ]);
    if (!session) return NextResponse.json({ message: "user is not signed in" }, { status: 401 });
    if (!group) return NextResponse.json({ group: "requested group not found" }, { status: 404 });
    if (!group.members.some((member) => member.userId === session.user.id))
      return NextResponse.json(
        { message: "user is not authorized to perform this operation" },
        { status: 403 }
      );
    const data = await request.json();
    const { userIds } = postRequestValidator.parse(data);
    const updatedGroup = await prisma.group.update({
      where: { id: groupId },
      data: { members: { create: userIds.map((id) => ({ userId: id })) } },
    });
    return NextResponse.json(updatedGroup, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) return NextResponse.json(error, { status: 400 });
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params: { groupId } }: { params: { groupId: string } }) {
  try {
    const [data, session, group] = await Promise.all([
      request.json(),
      getServerSession(),
      prisma.group.findUnique({ where: { id: groupId }, include: { members: { where: { role: "ADMIN" } } } }),
    ]);
    const { userIds } = deleteRequestValidator.parse(data);
    if (!session) return NextResponse.json({ message: "user is not signed in" }, { status: 401 });
    if (!group) return NextResponse.json({ message: "requested group not found" }, { status: 404 });

    if (userIds) {
      if (!group.members.some((member) => member.userId === session.user.id))
        return NextResponse.json(
          { message: "user is not authorized to perform this action" },
          { status: 404 }
        );
      await prisma.group.update({
        where: { id: groupId },
        data: { members: { deleteMany: userIds.map((id) => ({ userId: id })) } },
      });
    } else await prisma.groupMember.deleteMany({ where: { groupId, userId: session.user.id } });

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof ZodError) return NextResponse.json(error, { status: 400 });
    return NextResponse.json(error, { status: 500 });
  }
}
