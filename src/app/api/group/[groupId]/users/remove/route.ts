import prisma from "@/lib/db";
import { getServerSession } from "@/lib/nextAuth";
import { deleteRequestValidator } from "@/lib/validators/group/user/groupUser";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function DELETE(request: NextRequest, { params: { groupId } }: { params: { groupId: string } }) {
  try {
    const [data, session, group] = await Promise.all([
      request.json(),
      getServerSession(),
      prisma.group.findUnique({ where: { id: groupId } }),
    ]);
    const { userIds } = deleteRequestValidator.parse(data);

    if (!group) return NextResponse.json({ group: "requested group not found" }, { status: 404 });
    if (!session) return NextResponse.json({ message: "user is not signed in" }, { status: 401 });
    if (session.user.id !== group.adminId)
      return NextResponse.json({ message: "user is not authorized to do this operation" }, { status: 403 });
    await prisma.group.update({
      where: { id: groupId },
      data: { members: { deleteMany: userIds.map((id) => ({ id })) } },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof ZodError) return NextResponse.json(error, { status: 400 });
    return NextResponse.json(error, { status: 500 });
  }
}
