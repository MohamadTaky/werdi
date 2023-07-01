"use client";
import React from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { GroupWerd, GroupWerdCompletion } from "@prisma/client";
import { CircleNotch, Check } from "@/components/icons";
import useCheckGroupWerdMutation from "@/hooks/useCheckGroupWerdMutation";
import useDeleteGroupWerdMutation from "@/hooks/useDeleteGroupWerdMutation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props extends GroupWerd {
  completions: GroupWerdCompletion[];
  adminId: string;
}

export default function GroupWerdItem({ text, currentCount, groupId, adminId, id, completions }: Props) {
  const { refresh } = useRouter();
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
        <p>العدد : {currentCount}</p>
      </CardContent>
      <CardFooter>
        <Button
          size="sm"
          variant="secondary"
          className={completed ? "bg-blue-500 disabled:opacity-100" : ""}
          disabled={checking || completed}
          onClick={() => checkWerd({ groupId, werdId: id, userId: session.data?.user.id as string })}
        >
          {checking ? (
            <CircleNotch className="animate-spin" size="24" weight="bold" />
          ) : (
            <Check size="24" weight="bold" className={`text-white ${!completed ? "opacity-0" : ""}`} />
          )}
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
