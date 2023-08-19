"use client";
import LoadedButton from "@/components/LoadedButton";
import useTransitionMutation from "@/lib/react-query/useTransitionMutation";
import { useParams, useRouter } from "next/navigation";
import leaveGroupMutation from "../mutations/leaveGroupMutation";
import { LogOut } from "lucide-react";

export default function LeaveGroupButton() {
  const { back, refresh } = useRouter();
  const { groupId } = useParams();
  const { mutate, isLoading } = useTransitionMutation({
    mutationFn: leaveGroupMutation,
    onSuccess: () => {
      back();
      refresh();
    },
  });

  return (
    <LoadedButton onClick={() => mutate({ groupId })} variant="danger" isLoading={isLoading}>
      <LogOut />
      مغادرة
    </LoadedButton>
  );
}
