import { Avatar, AvatarImage } from "@/components/ui/Avatar";
import CalendarHeatMap from "@/components/ui/custom/CalendarHeatMap";
import prisma from "@/lib/db";
import { getServerSession } from "@/lib/nextAuth";
import { format } from "date-fns";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params: { groupId, werdId },
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
  const groupWerd = await prisma.groupWerd.findUnique({
    where: { id: werdId },
    include: { completions: true, streaks: { include: { user: true } } },
  });
  const session = await getServerSession();
  if (!groupWerd) notFound();
  const { text, createdAt, completions, streaks } = groupWerd;
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
            .map(({ completedAt }) => completedAt)}
        />
      </div>
      <table className="mt-4 text-xs md:text-base">
        <thead>
          <th className="border p-2">المستخدم</th>
          <th className="border p-2">الانجازات المتتالية</th>
          <th className="border p-2">أطول سلسلة</th>
        </thead>
        <tbody>
          {streaks.map(({ id, currentStreak, longestStreak, user: { name, image } }) => (
            <tr key={id}>
              <td className="flex items-center justify-between gap-2 border p-2 text-center">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={image as string} />
                </Avatar>
                {name}
              </td>
              <td className="border p-2 text-center">{currentStreak}</td>
              <td className="border p-2 text-center">{longestStreak}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
