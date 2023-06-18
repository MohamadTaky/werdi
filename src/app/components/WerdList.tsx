import WerdItem from "./WerdItem/WerdItem";
import prisma from "@/lib/db";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AnimatePresence from "@/lib/AnimatePresence";

export default async function WerdList() {
  const session = (await getServerSession(authOptions)) as Session;
  const werds = await prisma.werd.findMany({ where: { userId: session.user.id } });
  return (
    <ul className="mx-auto max-w-2xl space-y-4 p-3">
      <AnimatePresence initial={false}>
        {werds.map((werd) => (
          <WerdItem key={werd.id} {...werd} />
        ))}
      </AnimatePresence>
    </ul>
  );
}
