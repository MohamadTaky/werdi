import Avatar from "@/components/Avatar";
import CalendarHeatMap from "@/components/CalendarHeatMap";
import Checkbox from "@/components/Checkbox";
import Section from "@/components/Section";
import List from "@/components/list/List";
import ListItem from "@/components/list/ListItem";
import prisma from "@/lib/db";
import { getServerSession } from "@/lib/nextAuth";
import { startOfDay } from "date-fns";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DeleteGroupWerdButton from "./components/DeleteGroupWerdButton";

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
    getServerSession(),
    prisma.group.findUnique({
      where: { id: groupId },
      include: {
        members: {
          include: { user: true },
        },
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
  const werd = group?.werds[0];
  if (!werd) notFound();
  const userCompletions = werd.completions.filter((completion) => completion.memberId === session?.user.id);
  return (
    <Section container="flex">
      <h2 className="text-center text-lg font-semibold">{werd.text}</h2>
      <p className="text-center">
        <span className="block text-2xl font-bold text-blue-500">{werd.count}</span> مرة
      </p>
      <CalendarHeatMap data={userCompletions.map(({ completedAt }) => completedAt)} />
      <List>
        {group.members.map(({ id, user: { image, name } }) => (
          <ListItem key={id}>
            <Link className="flex flex-1 items-center gap-2" href={`groups/${groupId}/${werdId}/${id}`}>
              <Avatar image={image ?? ""} fallback={name?.slice(0, 2)} />
              <p>{name}</p>
              <Checkbox
                className="pointer-events-none mr-auto h-6 w-6"
                tabIndex={-1}
                readOnly
                checked={werd.completions.some((completion) => completion.memberId === session?.user.id)}
              />
            </Link>
          </ListItem>
        ))}
      </List>
      <DeleteGroupWerdButton />
    </Section>
  );
}
