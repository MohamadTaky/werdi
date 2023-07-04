import CalendarHeatMap from "@/components/ui/custom/CalendarHeatMap";
import prisma from "@/lib/db";
import { getServerSession } from "@/lib/nextAuth";
import { format } from "date-fns";
import { notFound } from "next/navigation";

export default async function GroupWerdPage({
  params: { groupId, werdId },
}: {
  params: { groupId: string; werdId: string };
}) {
  const groupWerd = await prisma.groupWerd.findUnique({
    where: { id: werdId },
    include: {
      completions: { include: { completion: true } },
      streaks: { include: { user: true, streak: true } },
      werd: true,
    },
  });
  const session = await getServerSession();
  if (!groupWerd) notFound();
  const {
    werd: { text, createdAt },
    completions,
    streaks,
  } = groupWerd;
  return (
    <>
      <h2 className="text-center text-lg font-semibold">{text}</h2>
      <time className="mb-2 mt-4 text-center text-sm">تاريخ الإنشاء : {format(createdAt, "yyyy/M/d")}</time>
      <div className="scroll-hidden no-scrollbar w-full touch-pan-x overflow-auto">
        <CalendarHeatMap
          cellSize={15}
          spacing={2}
          data={completions
            .filter((completion) => completion.userId === session?.user.id)
            .map(({ completion: { completedAt } }) => completedAt)}
        />
      </div>
      <table>
        <thead>
          <th>User</th>
          <th>Streak</th>
          <th>Longest streak</th>
        </thead>
        <tbody>
          {streaks.map(({ id, streak: { currentStreak, longestStreak }, user: { name } }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{currentStreak}</td>
              <td>{longestStreak}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className="mt-2 grid grid-cols-2 gap-2 text-center text-lg md:grid-cols-3">
        <p className="col-span-2 md:col-span-1">
          <span className="block text-2xl font-bold text-blue-500">{currentCount}</span> مرة
        </p>
        <p>
          <span className="block text-3xl font-bold text-blue-500">{longestStreak}</span> أطول سلسلة
        </p>
        <p>
          <span className="block text-3xl font-bold text-blue-500">{streak}</span> إنجازات متتالية
        </p>
      </div> */}
    </>
  );
}
