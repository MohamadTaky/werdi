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
  const werd = await prisma.werd.findUnique({ where: { id: werdId } });
  return {
    title: werd?.text,
  };
};

export default async function WerdPage({ params: { werdId } }: { params: { werdId: string } }) {
  const werd = await prisma.werd.findUnique({ where: { id: werdId }, include: { completions: true } });
  if (!werd) notFound();
  const { text, currentCount, streak, longestStreak, createdAt, completions } = werd;
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
      <div className="mt-2 grid grid-cols-2 gap-2 text-center text-lg">
        <p>
          <span className="block text-3xl font-bold text-blue-500">{streak}</span> إنجازات متتالية
        </p>
        <p>
          <span className="block text-3xl font-bold text-blue-500">{longestStreak}</span> أطول سلسلة
        </p>
        <p className=" col-span-2">
          <span className="block text-2xl font-bold text-blue-500">{currentCount}</span> مرة
        </p>
      </div>
      <DeleteButton id={werdId} className="mt-auto w-fit" />
    </>
  );
}