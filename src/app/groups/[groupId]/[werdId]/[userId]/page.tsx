import CalendarHeatMap from "@/components/CalendarHeatMap";
import Section from "@/components/Section";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";

type Props = {
  params: {
    werdId: string;
    userId: string;
  };
};

export default async function Page({ params: { userId, werdId } }: Props) {
  const werd = await prisma.groupWerd.findUnique({
    where: { id: werdId },
    include: {
      completions: { where: { memberId: userId } },
      streaks: { where: { memberId: userId }, include: { member: { include: { user: true } } } },
    },
  });
  if (!werd) notFound();
  const { text, count, completions, streaks } = werd;

  return (
    <Section container="flex">
      <h2>{streaks[0]?.member.user.name} :</h2>
      <h2 className="text-center text-lg font-semibold">{text}</h2>
      <p className="text-center">
        <span className="block text-2xl font-bold text-blue-500">{count}</span> مرة
      </p>
      <CalendarHeatMap data={completions.map((completion) => completion.completedAt)} />
      <div className="grid grid-cols-2 gap-2 text-center md:grid-cols-2">
        <p>
          <span className="block text-xl font-bold text-blue-500">{streaks[0]?.currentStreak}</span> إنجازات
          متتالية
        </p>
        <p>
          <span className="block text-xl font-bold text-blue-500">{streaks[0]?.longestStreak}</span> أطول
          سلسلة
        </p>
      </div>
    </Section>
  );
}
