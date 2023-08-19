"use client";
import LoadedButton from "@/components/LoadedButton";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import AlertDialog from "@/components/AlertDialog";
import Button from "@/components/Button";
import { X } from "lucide-react";
import useTransitionMutation from "@/lib/react-query/useTransitionMutation";
import deleteGroupMutation from "../mutations/deleteGroupMutation";

export default function DeleteGroupButton() {
  const { back } = useRouter();
  const { groupId } = useParams();
  const [open, setOpen] = useState(false);
  const { mutate, isLoading } = useTransitionMutation({
    mutationFn: deleteGroupMutation,
    onSuccess: back,
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
        <LoadedButton
          className="flex"
          isLoading={isLoading}
          variant="danger"
          onClick={() => mutate({ groupId })}
        >
          <X />
          حذف
        </LoadedButton>
      }
    />
  );
}
