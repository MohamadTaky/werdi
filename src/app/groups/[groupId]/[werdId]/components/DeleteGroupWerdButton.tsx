"use client";
import AlertDialog from "@/components/AlertDialog";
import Button from "@/components/Button";
import LoadedButton from "@/components/LoadedButton";
import useTransitionMutation from "@/lib/react-query/useTransitionMutation";
import { X } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import deleteGroupWerdMutation from "../mutations/deleteGroupWerdMutation";

export default function DeleteGroupWerdButton() {
  const { replace, refresh } = useRouter();
  const pathname = usePathname();
  const { groupId, werdId } = useParams();
  const { mutate, isLoading } = useTransitionMutation({
    mutationFn: deleteGroupWerdMutation,
    onSuccess: () => {
      replace(pathname.substring(0, pathname.lastIndexOf("/")));
      refresh();
    },
  });
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog
      locked={isLoading}
      open={open}
      onOpenChange={setOpen}
      description="سيتم حذف جميع البيانات المتعلقة بهذا الذِكر"
      trigger={
        <Button className="mt-auto" variant="danger">
          حذف
          <X />
        </Button>
      }
      action={
        <LoadedButton variant="danger" isLoading={isLoading} onClick={() => mutate({ groupId, werdId })}>
          حذف
          <X />
        </LoadedButton>
      }
    />
  );
}
