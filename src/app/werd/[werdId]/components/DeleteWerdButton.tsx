"use client";

import AlertDialog from "@/components/AlertDialog";
import Button from "@/components/Button";
import LoadedButton from "@/components/LoadedButton";
import useTransitionMutation from "@/lib/react-query/useTransitionMutation";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import deleteWerdMutation from "../mutations/deleteWerdMutation";

type Props = { id: string };

export default function DeleteWerdButton({ id }: Props) {
  const [open, setOpen] = useState(false);
  const { replace, refresh } = useRouter();
  const { mutate, isLoading } = useTransitionMutation({
    mutationFn: deleteWerdMutation,
    onSuccess: () => {
      replace("/");
      refresh();
    },
  });

  return (
    <AlertDialog
      open={open}
      locked={isLoading}
      onOpenChange={setOpen}
      description="سوف يتم حذف جميع البيانات المتعلقة بهذا الذِكر"
      trigger={
        <Button variant="danger" className="mt-auto">
          حذف
          <X />
        </Button>
      }
      action={
        <LoadedButton variant="danger" isLoading={isLoading} onClick={() => mutate({ werdId: id })}>
          حذف
          <X />
        </LoadedButton>
      }
    />
  );
}
