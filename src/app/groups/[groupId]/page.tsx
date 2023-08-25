import prisma from "@/lib/db";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import AddGroupMemberForm from "./components/AddGroupMemberForm";
import AddGroupWerdForm from "./components/AddGroupWerdForm";
import GroupInfoDialog from "./components/GroupInfoDialog";
import GroupWerdList from "./components/GroupWerdList";
import Section from "@/components/Section";
import getGroup from "./helpers/getGroup";

export async function generateMetadata({
  params: { groupId },
}: {
  params: { groupId: string };
}): Promise<Metadata> {
  const group = await prisma.group.findUnique({ where: { id: groupId }, select: { name: true } });
  return { title: group?.name };
}

export default async function GroupPage({ params: { groupId } }: { params: { groupId: string } }) {
  const group = await getGroup(groupId);

  if (!group) notFound();
  const { name, werds } = group;

  return (
    <Section container="flex" className="p-0 pt-3">
      <h2 className="text-center text-2xl font-semibold">{name}</h2>
      <div className="flex items-center justify-center gap-4">
        <AddGroupMemberForm {...group} />
        <GroupInfoDialog group={group} />
      </div>
      <GroupWerdList werds={werds} />
      <AddGroupWerdForm />
    </Section>
  );
}
