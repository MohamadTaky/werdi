"use client";
import { Check, CircleNotch, ListBullets } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Streak, UserWerd, Werd } from "@prisma/client";
import { differenceInDays } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useCheckWerdMutation from "@/hooks/useCheckWerdMutation";

type Props = UserWerd & {
  werd: Werd;
  streak: Streak;
};

export default function WerdItem({
  werd: { text, count },
  completed,
  lastCompletedAt,
  id,
  streak: { currentStreak },
}: Props) {
  const { refresh } = useRouter();
  const { mutate: checkWerd, isLoading: isChecking } = useCheckWerdMutation({ onSuccess: refresh });
  return (
    <Card className="border-2 shadow-md">
      <CardHeader className="p-3">
        <CardTitle>{text}</CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <p>الإنجازات المتتالية: {currentStreak}</p>
        <p>{count} مرة</p>
      </CardContent>
      <CardFooter className="flex gap-2 p-3 pt-0">
        <Button
          size="sm"
          variant="secondary"
          className={completed ? "bg-blue-500 hover:bg-blue-500 disabled:opacity-100" : ""}
          disabled={differenceInDays(new Date(), lastCompletedAt ?? 0) === 0 || isChecking}
          onClick={() => checkWerd(id)}
        >
          {isChecking ? (
            <CircleNotch className="animate-spin" size="24" weight="bold" />
          ) : (
            <Check size="24" weight="bold" className={`text-white ${!completed ? "opacity-0" : ""}`} />
          )}
        </Button>
        <Button size="sm" asChild>
          <Link href={`/werd/${id}`}>
            عرض التفاصيل <ListBullets size="20" weight="bold" className="mb-0.5 mr-2 inline-block" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
