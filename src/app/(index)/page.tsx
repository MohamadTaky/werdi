import prisma from "@/lib/db";
import { getServerSession } from "@/lib/nextAuth";
import AddWerdForm from "./components/AddWerdForm";
import WerdList from "./components/WerdList";
import Section from "@/components/Section";

export default async function Home() {
  const session = (await getServerSession())!;
  const [werds] = await Promise.all([
    prisma.werd.findMany({ where: { userId: session.user.id }, orderBy: [{ lastCompletedAt: "desc" }] }),
  ]);

  return (
    <Section>
      <WerdList werds={werds} />
      <AddWerdForm />
    </Section>
  );
}
