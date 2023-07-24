import CalendarHeatMap from "@/components/CalendarHeatMap";
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
      completions: { where: { userId } },
      streaks: { where: { userId }, include: { user: true } },
    },
  });
  if (!werd) notFound();
  const { text, count, completions, streaks } = werd;
  const { currentStreak, longestStreak, user } = streaks[0];
  const { name } = user;

  return (
    <>
      <h2 className="mb-2">{name} :</h2>
      <h2 className="mb-2 text-center text-lg font-semibold">{text}</h2>
      <p className="text-center">
        <span className="block text-2xl font-bold text-blue-500">{count}</span> مرة
      </p>
      <CalendarHeatMap className="my-2" data={completions.map((completion) => completion.completedAt)} />
      <div className="grid grid-cols-2 gap-2 text-center md:grid-cols-2">
        <p>
          <span className="block text-xl font-bold text-blue-500">{currentStreak}</span> إنجازات متتالية
        </p>
        <p>
          <span className="block text-xl font-bold text-blue-500">{longestStreak}</span> أطول سلسلة
        </p>
      </div>
    </>
  );
}
