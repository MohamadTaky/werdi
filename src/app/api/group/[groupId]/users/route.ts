import prisma from "@/lib/db";
import { getServerSession } from "@/lib/nextAuth";
import { postRequestValidator } from "@/lib/validators/group/user/groupUser";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: NextRequest, { params: { groupId } }: { params: { groupId: string } }) {
  try {
    const [session, group] = await Promise.all([
      getServerSession(),
      prisma.group.findUnique({ where: { id: groupId } }),
    ]);
    if (!session) return NextResponse.json({ message: "user is not signed in" }, { status: 401 });
    if (!group) return NextResponse.json({ group: "requested group not found" }, { status: 404 });
    if (session.user.id !== group.adminId)
      return NextResponse.json(
        { message: "user is not authorized to perform this operation" },
        { status: 403 }
      );
    const data = await request.json();
    const { userIds } = postRequestValidator.parse(data);
    const updatedGroup = await prisma.group.update({
      where: { id: groupId },
      data: { members: { connect: userIds.map((id) => ({ id })) } },
    });
    return NextResponse.json(updatedGroup, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) return NextResponse.json(error, { status: 400 });
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
    if (!group) return NextResponse.json({ group: "requested group not found" }, { status: 404 });
    await prisma.group.update({
      where: { id: groupId },
      data: { members: { delete: { id: session?.user.id } } },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof ZodError) return NextResponse.json(error, { status: 400 });
    return NextResponse.json(error, { status: 500 });
  }
}
