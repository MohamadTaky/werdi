"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export default async function checkWerdAction(id: string, done: boolean) {
  await prisma.werd.update({ where: { id }, data: { done } });
  revalidatePath("/");
}
