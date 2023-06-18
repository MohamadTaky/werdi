"use server";
import prisma from "@/lib/db";
import { getServerSession, Session } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { postRequestValidator } from "@/validators/werd";

export default async function addWerdAction(formData: FormData) {
  const session = (await getServerSession(authOptions)) as Session;
  const { count, text } = postRequestValidator.parse(Object.fromEntries(formData.entries()));
  await prisma.werd.create({
    data: {
      text,
      count: Number(count),
      userId: session.user.id,
      done: false,
    },
  });
  redirect("/");
}
