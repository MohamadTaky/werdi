import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    if (!search) return NextResponse.json({ message: "search param is not provided" }, { status: 400 });
    const users = await prisma.user.findMany({ where: { name: { contains: search } }, take: 10 });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
