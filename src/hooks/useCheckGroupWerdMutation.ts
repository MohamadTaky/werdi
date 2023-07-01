import { useTransition } from "react";
import { useMutation, UseMutationOptions } from "react-query";
import { putRequestType } from "@/lib/validators/groupWerd";

export default function useCheckGroupWerdMutation(options?: UseMutationOptions<any, unknown, any, any>) {
  const [pending, startTransition] = useTransition();
  const mutation = useMutation({
    ...options,
    mutationFn: checkGroupWerd,
    onSuccess: (...props) =>
      startTransition(() => {
        options?.onSuccess?.(...props);
      }),
  });
  return { ...mutation, isLoading: mutation.isLoading || pending };
}

async function checkGroupWerd({
  groupId,
  werdId,
  userId,
}: putRequestType & { groupId: string; werdId: string }) {
  await fetch(`/api/group/${groupId}/${werdId}`, { method: "PUT", body: JSON.stringify({ userId }) });
}
