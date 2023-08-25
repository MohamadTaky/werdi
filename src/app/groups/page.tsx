import prisma from "@/lib/db";
import { getServerSession } from "@/lib/nextAuth";
import AddGroupForm from "./components/AddGroupForm";
import GroupList from "./components/GroupList";
import Section from "@/components/Section";

export default async function GroupsPage() {
  const session = (await getServerSession())!;
  const groups = await prisma.group.findMany({
    where: { members: { some: { userId: session.user.id } } },
    include: { _count: true },
  });
  return (
    <Section>
      <GroupList groups={groups} />
      <AddGroupForm />
    </Section>
  );
}
