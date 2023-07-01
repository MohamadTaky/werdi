import prisma from "@/lib/db";
import { getServerSession } from "@/lib/nextAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const session = await getServerSession();
    const name = searchParams.get("search") ?? "";
    const users = await prisma.user.findMany({
      where: {
        name: { startsWith: name },
        // id: { not: session?.user.id },
      },
      take: 10,
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 200 });
  }
}
