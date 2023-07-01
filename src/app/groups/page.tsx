import prisma from "@/lib/db";
import { getServerSession } from "@/lib/nextAuth";
import { Session } from "next-auth";
import AddGroupForm from "../../components/forms/AddGroupForm";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import Link from "next/link";

export default async function GroupsPage() {
  const session = (await getServerSession()) as Session;
  const data = await prisma.group.findMany({
    where: { OR: [{ adminId: session.user.id }, { members: { some: { id: session.user.id } } }] },
  });

  return (
    <div className="p-3">
      <AddGroupForm />
      {data?.map((group) => (
        <Link key={group.id} href={`groups/${group.id}`}>
          <Card>
            <CardHeader>
              <CardTitle>{group.name}</CardTitle>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}
