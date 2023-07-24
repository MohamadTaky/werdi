"use client";
import LoadedButton from "@/components/LoadedButton";
import useTransitionMutation from "@/lib/react-query/useTransitionMutation";
import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes } from "react";
import leaveGroupMutation from "../mutations/leaveGroupMutation";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  groupId: string;
};
export default function LeaveGroupButton({ groupId, children, ...props }: Props) {
  const { back, refresh } = useRouter();
  const { mutate, isLoading } = useTransitionMutation({
    mutationFn: leaveGroupMutation,
    onSuccess: () => {
      back();
      refresh();
    },
  });

  return (
    <LoadedButton onClick={() => mutate({ groupId })} variant="danger" isLoading={isLoading} {...props}>
      {children}
    </LoadedButton>
  );
}
