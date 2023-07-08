"use client";
import React from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { GroupWerd, GroupWerdCompletion } from "@prisma/client";
import { CircleNotch, Check, ListBullets } from "@/components/icons";
import useCheckGroupWerdMutation from "@/hooks/useCheckGroupWerdMutation";
import useDeleteGroupWerdMutation from "@/hooks/useDeleteGroupWerdMutation";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

type Props = GroupWerd & {
  completions: GroupWerdCompletion[];
  adminId: string;
};

export default function GroupWerdItem({ text, count, groupId, adminId, id, completions }: Props) {
  const { refresh } = useRouter();
  const pathname = usePathname();
  const { mutate: checkWerd, isLoading: checking } = useCheckGroupWerdMutation({ onSuccess: refresh });
  const { mutate: deleteWerd, isLoading: deleting } = useDeleteGroupWerdMutation({ onSuccess: refresh });
  const session = useSession();
  const completed = completions.some((completion) => completion.userId === session.data?.user.id);

  return (
    <Card className="border-2 shadow-md">
      <CardHeader>
        <CardTitle>{text}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>العدد : {count}</p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button
          size="sm"
          variant="secondary"
          className={completed ? "bg-blue-500 disabled:opacity-100" : ""}
          disabled={checking || completed}
          onClick={() =>
            checkWerd({
              groupId,
              werdId: id,
              userId: session.data?.user.id as string,
              count: count.toString(),
            })
          }
        >
          {checking ? (
            <CircleNotch className="animate-spin" size="24" weight="bold" />
          ) : (
            <Check size="24" weight="bold" className={`text-white ${!completed ? "opacity-0" : ""}`} />
          )}
        </Button>
        <Button asChild size="sm">
          <Link href={`${pathname}/${id}`}>
            عرض التفاصيل
            <ListBullets size="24" />
          </Link>
        </Button>
        {adminId === session.data?.user.id && (
          <Button
            disabled={deleting}
            onClick={() => deleteWerd({ werdId: id, groupId })}
            variant="destructive"
            size="sm"
            className="mr-auto w-12"
          >
            {deleting ? <CircleNotch className="animate-spin" size="24" weight="bold" /> : "حذف"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
