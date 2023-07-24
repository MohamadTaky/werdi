import AlertDialog from "@/components/AlertDialog";
import Button from "@/components/Button";
import LoadedButton from "@/components/LoadedButton";
import useTransitionMutation from "@/lib/react-query/useTransitionMutation";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import deleteGroupMembersMutation from "../mutations/deleteGroupMembersMutation";

type DeleteGroupMembersButtonProps = { userIds: string[] };

export default function DeleteGroupMembersButton({ userIds }: DeleteGroupMembersButtonProps) {
  const { refresh } = useRouter();
  const [open, setOpen] = useState(false);
  const { groupId } = useParams();
  const { mutate, isLoading } = useTransitionMutation({
    mutationFn: deleteGroupMembersMutation,
    onSuccess: () => {
      refresh();
      setOpen(false);
    },
  });
  return (
    <AlertDialog
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button disabled={!userIds.length} variant="danger" className="mb-2">
          تم
        </Button>
      }
      action={
        <LoadedButton onClick={() => mutate({ groupId, userIds })} isLoading={isLoading}>
          تأكيد
        </LoadedButton>
      }
      locked={isLoading}
    />
  );
}
