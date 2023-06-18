"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export default async function deleteWerdAction(id: string) {
  await prisma.werd.delete({ where: { id } });
  revalidatePath("/");
}
