import prisma from "@/lib/db";
import addDays from "date-fns/addDays";

export default async function getGroup(id: string) {
  return await prisma.group.findUnique({
    where: { id },
    include: {
      members: { include: { user: true } },
      werds: { include: { completions: { where: { completedAt: { gte: addDays(new Date(), -1) } } } } },
    },
  });
}

export type GetGroupType = NonNullable<Awaited<ReturnType<typeof getGroup>>>;
