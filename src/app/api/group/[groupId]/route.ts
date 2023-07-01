import prisma from "@/lib/db";
import { getServerSession } from "@/lib/nextAuth";
import { postRequestValidator } from "@/lib/validators/groupWerd";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params: { groupId } }: { params: { groupId: string } }) {
  try {
    const data = await request.json();
    const { text, count } = postRequestValidator.parse(data);
    const groupWerd = await prisma.groupWerd.create({ data: { text, currentCount: Number(count), groupId } });
    return NextResponse.json(groupWerd, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params: { groupId } }: { params: { groupId: string } }) {
  try {
    const session = await getServerSession();
    const group = await prisma.group.findUnique({ where: { id: groupId } });
    if (group?.adminId === session?.user.id) await prisma.group.delete({ where: { id: groupId } });
    return NextResponse.json(group, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
