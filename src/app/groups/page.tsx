import prisma from "@/lib/db";
import { getServerSession } from "@/lib/nextAuth";
import AddGroupForm from "./components/AddGroupForm";
import GroupList from "./components/GroupList";

export default async function GroupsPage() {
  const session = (await getServerSession())!;
  const groups = await prisma.group.findMany({
    where: { OR: [{ adminId: session.user.id }, { members: { some: { id: session.user.id } } }] },
    include: {
      _count: true,
    },
  });
  return (
    <>
      <GroupList groups={groups} />
      <AddGroupForm />
    </>
  );
}
