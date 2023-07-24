"use client";
import LoadedButton from "@/components/LoadedButton";
import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes, useState } from "react";
import AlertDialog from "@/components/AlertDialog";
import Button from "@/components/Button";
import { X } from "lucide-react";
import useTransitionMutation from "@/lib/react-query/useTransitionMutation";
import deleteGroupMutation from "../mutations/deleteGroupMutation";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  groupId: string;
};

export default function DeleteGroupButton({ groupId }: Props) {
  const { back, refresh } = useRouter();
  const [open, setOpen] = useState(false);
  const { mutate, isLoading } = useTransitionMutation({
    mutationFn: deleteGroupMutation,
    onSuccess: refresh,
  });

  return (
    <AlertDialog
      locked={isLoading}
      description="سوف يتم حذف هذه المجموعة"
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button variant="danger">
          <X />
          حذف
        </Button>
      }
      action={
        <LoadedButton className="flex" isLoading={isLoading} variant="danger" onClick={() => mutate({ groupId })}>
          <X />
          حذف
        </LoadedButton>
      }
    />
  );
}
