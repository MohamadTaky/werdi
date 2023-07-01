"use client";
import useDeleteWerdMutaton from "@/hooks/useDeleteWerdMutation";
import { CircleNotch, X } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  id: string,
}

export default function DeleteButton({ id, ...props } : Props) {
  const { replace, refresh } = useRouter();
  const { mutate, isLoading } = useDeleteWerdMutaton({
    onSuccess: () => {
      replace("/");
      refresh();
    },
  });
  return (
    <Button size="sm" variant="destructive" disabled={isLoading} onClick={() => mutate(id)} {...props}>
      حذف
      {isLoading ? (
        <CircleNotch size="20" className="mr-2 animate-spin" />
      ) : (
        <X size="20" weight="bold" className="mr-2" />
      )}
    </Button>
  );
}
