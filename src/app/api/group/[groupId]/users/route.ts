import prisma from "@/lib/db";
import { getServerSession } from "@/lib/nextAuth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _request: NextRequest,
  { params: { groupId } }: { params: { groupId: string } }
) {
  try {
    const session = await getServerSession();
    const group = await prisma.group.update({
      where: { id: groupId },
      data: { members: { delete: { id: session?.user.id } } },
    });
    return NextResponse.json(group, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
