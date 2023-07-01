import { useTransition } from "react";
import { useMutation, UseMutationOptions } from "react-query";

export default function useLeaveGroupMutation(options?: UseMutationOptions<any, unknown, any, unknown>) {
  const [pending, startTransition] = useTransition();
  const mutation = useMutation({
    mutationFn: leaveGroup,
    onSuccess: (...props) =>
      startTransition(() => {
        options?.onSuccess?.(...props);
      }),
  });
  return { ...mutation, isLoading: mutation.isLoading || pending };
}

async function leaveGroup(groupId: string) {
  return await fetch(`/api/group/${groupId}/users`, { method: "DELETE" });
}
