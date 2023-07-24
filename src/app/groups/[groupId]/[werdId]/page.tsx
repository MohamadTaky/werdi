import CalendarHeatMap from "@/components/CalendarHeatMap";
import prisma from "@/lib/db";
import { getServerSession } from "@/lib/nextAuth";
import { GroupWerd, GroupWerdCompletion, GroupWerdStreak, User } from "@prisma/client";
import { startOfDay } from "date-fns";
import List from "@/components/list/List";
import ListItem from "@/components/list/ListItem";
import { Metadata } from "next";
import { Session } from "next-auth";
import { notFound } from "next/navigation";
import DeleteGroupWerdButton from "./components/DeleteGroupWerdButton";
import Checkbox from "@/components/Checkbox";
import Link from "next/link";

export async function generateMetadata({
  params: { werdId },
}: {
  params: { groupId: string; werdId: string };
}): Promise<Metadata> {
  const werd = await prisma.groupWerd.findUnique({ where: { id: werdId } });
  return { title: werd?.text };
}

export default async function GroupWerdPage({
  params: { groupId, werdId },
}: {
  params: { groupId: string; werdId: string };
}) {
  const [session, group] = await Promise.all([
    getServerSession() as Promise<Session>,
    prisma.group.findUnique({
      where: { id: groupId },
      include: {
        members: true,
        admin: true,
        werds: {
          where: { id: werdId },
          include: {
            completions: { where: { completedAt: { gt: startOfDay(new Date()) } } },
            streaks: true,
          },
        },
      },
    }),
  ]);
  const werd = group?.werds[0] as GroupWerd & {
    completions: GroupWerdCompletion[];
    streaks: GroupWerdStreak[];
  };
  if (!werd) notFound();
  const userCompletions = werd.completions.filter((completion) => completion.userId === session.user.id);
  const members = [...(group?.members as User[]), group?.admin] as User[];
  return (
    <>
      <h2 className="mb-2 text-center text-lg font-semibold">{werd.text}</h2>
      <p className="text-center">
        <span className="block text-2xl font-bold text-blue-500">{werd.count}</span> مرة
      </p>
      <CalendarHeatMap className="my-2" data={userCompletions.map(({ completedAt }) => completedAt)} />
      <List className="m-0">
        {members.map(({ name, id, image }, i) => (
          <ListItem key={id} index={i} className="gap-2">
            <Link className="flex-1" href={`groups/${groupId}/${werdId}/${id}`}>
              {name}
            </Link>
            <Checkbox
              className="pointer-events-none h-6 w-6"
              tabIndex={-1}
              checked={werd.completions.some((completion) => completion.userId === session.user.id)}
            />
          </ListItem>
        ))}
      </List>
      <DeleteGroupWerdButton groupId={groupId} werdId={werdId} />
    </>
  );
}
