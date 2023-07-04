import prisma from "@/lib/db";
import { getServerSession } from "@/lib/nextAuth";
import { putRequestValidator } from "@/lib/validators/groupWerd";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params: { werdId } }: { params: { werdId: string } }) {
  try {
    const data = await request.json();
    const { userId } = putRequestValidator.parse(data);
    const sesion = await getServerSession();

    // prisma.groupWerd.update({
    //   where: { id: werdId },
    //   data: {
    //     completions: { create: { userId } },
    //     streaks: { update: { data: {} } },
    //   },
    // });
    // await prisma.groupWerdCompletion.create({ data: { werdId, userId } });

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params: { werdId } }: { params: { werdId: string } }) {
  try {
    await prisma.groupWerd.delete({ where: { id: werdId } });
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
