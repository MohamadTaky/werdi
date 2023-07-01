"use client";
import { Button, ButtonProps } from "@/components/ui/Button";
import useLeaveGroupMutation from "@/hooks/useLeaveGroupMutation";
import { useRouter } from "next/navigation";

interface Props extends ButtonProps {
  groupId: string;
}
export default function LeaveGroupButton({ groupId, children, ...props }: Props) {
  const { back, refresh } = useRouter();
  const { mutate, isLoading } = useLeaveGroupMutation({
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
