import prisma from "@/lib/db";
import { getServerSession } from "@/lib/nextAuth";
import { Session } from "next-auth";
import WerdItem from "./WerdItem/WerdItem";

export default async function WerdList() {
  const session = (await getServerSession()) as Session;
  const werds = await prisma.werd.findMany({ where: { userId: session.user.id } });
  return (
    <>
      {werds.reverse().map((werd) => (
        <WerdItem key={werd.id} {...werd} />
      ))}
    </>
  );
}
