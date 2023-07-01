import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(_request: NextRequest, { params: { werdId } }: { params: { werdId: string } }) {
  try {
    const werd = await prisma.werd.delete({ where: { id: werdId } });
    return NextResponse.json(werd, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
