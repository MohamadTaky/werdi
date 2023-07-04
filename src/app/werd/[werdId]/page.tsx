import CalendarHeatMap from "@/components/ui/custom/CalendarHeatMap";
import prisma from "@/lib/db";
import { format } from "date-fns";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import DeleteButton from "./components/DeleteButton";

export const generateMetadata = async ({
  params: { werdId },
}: {
  params: { werdId: string };
}): Promise<Metadata> => {
  const userWerd = await prisma.userWerd.findUnique({ where: { id: werdId }, include: { werd: true } });
  return { title: userWerd?.werd.text };
};

export default async function WerdPage({ params: { werdId } }: { params: { werdId: string } }) {
  const userWerd = await prisma.userWerd.findUnique({
    where: { id: werdId },
    include: { completions: true, werd: true, streak: true },
  });
  if (!userWerd) notFound();
  const {
    werd: { text, count, createdAt },
    streak: { currentStreak, longestStreak },
    completions,
  } = userWerd;
  return (
    <>
      <h2 className="text-center text-lg font-semibold">{text}</h2>
      <time className="mb-2 mt-4 text-center text-sm">تاريخ الإنشاء : {format(createdAt, "yyyy/M/d")}</time>
      <div className="scroll-hidden no-scrollbar w-full touch-pan-x overflow-auto">
        <CalendarHeatMap
          cellSize={15}
          spacing={2}
          data={completions.map((completion) => completion.completedAt)}
        />
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2 text-center text-lg md:grid-cols-3">
        <p className="col-span-2 md:col-span-1">
          <span className="block text-2xl font-bold text-blue-500">{count}</span> مرة
        </p>
        <p>
          <span className="block text-3xl font-bold text-blue-500">{longestStreak}</span> أطول سلسلة
        </p>
        <p>
          <span className="block text-3xl font-bold text-blue-500">{currentStreak}</span> إنجازات متتالية
        </p>
      </div>
      <DeleteButton id={werdId} className="mt-auto w-fit" />
    </>
  );
}
