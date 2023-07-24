import CalendarHeatMap from "@/components/CalendarHeatMap";
import prisma from "@/lib/db";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import DeleteWerdButton from "./components/DeleteWerdButton";

export const generateMetadata = async ({
  params: { werdId },
}: {
  params: { werdId: string };
}): Promise<Metadata> => {
  const werd = await prisma.werd.findUnique({ where: { id: werdId } });
  return { title: werd?.text };
};

export default async function WerdPage({ params: { werdId } }: { params: { werdId: string } }) {
  const userWerd = await prisma.werd.findUnique({
    where: { id: werdId },
    include: { completions: true },
  });
  if (!userWerd) notFound();
  const { text, count, currentStreak, longestStreak, completions } = userWerd;
  return (
    <>
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
      <DeleteWerdButton id={werdId} />
    </>
  );
}
