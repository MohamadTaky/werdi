import prisma from "@/lib/db";
import { deleteRequestValidator } from "@/validators/werd";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { id } = deleteRequestValidator.parse(data);
    const werd = await prisma.werd.delete({ where: { id } });
    return NextResponse.json(werd, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
