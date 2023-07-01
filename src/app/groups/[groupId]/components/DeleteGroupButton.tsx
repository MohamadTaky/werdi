"use client";
import useDeleteGroupMutation from "@/hooks/useDeleteGroupMutation";
import { Button, ButtonProps } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

interface Props extends ButtonProps {
  groupId: string;
}
export default function DeleteGroupButton({ groupId, children, ...props }: Props) {
  const { back, refresh } = useRouter();
  const { mutate, isLoading } = useDeleteGroupMutation({
    onSuccess: () => {
      back();
      refresh();
    },
  });

  return (
    <Button onClick={() => mutate(groupId)} disabled={isLoading} {...props}>
      {children}
    </Button>
  );
}
