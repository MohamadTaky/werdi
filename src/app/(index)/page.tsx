import prisma from "@/lib/db";
import { getServerSession } from "@/lib/nextAuth";
import { addDays, endOfDay } from "date-fns";
import AddWerdForm from "./components/AddWerdForm";
import WerdList from "./components/WerdList";

export default async function Home() {
  const session = (await getServerSession())!;
  const [werds] = await Promise.all([
    prisma.werd.findMany({ where: { userId: session.user.id }, orderBy: [{ lastCompletedAt: "desc" }] }),
    prisma.werd.updateMany({
      where: { lastCompletedAt: { lt: endOfDay(addDays(new Date(), -1)) } },
      data: { completed: false },
    }),
  ]);

  return (
    <>
      <WerdList werds={werds} />
      <AddWerdForm />
    </>
  );
}
