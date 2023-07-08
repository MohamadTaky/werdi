import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("search") ?? "";
    const users = await prisma.user.findMany({
      where: {
        name: { startsWith: name },
      },
      take: 10,
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 200 });
  }
}
