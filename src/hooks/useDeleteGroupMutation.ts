import { useTransition } from "react";
import { useMutation, UseMutationOptions } from "react-query";

export default function useDeleteGroupMutation(options?: UseMutationOptions<any, unknown, any, unknown>) {
  const [pending, startTransition] = useTransition();
  const mutation = useMutation({
    ...options,
    mutationFn: deleteGroup,
    onSuccess: (...props) =>
      startTransition(() => {
        options?.onSuccess?.(...props);
      }),
  });
  return { ...mutation, isLoading: mutation.isLoading || pending };
}
async function deleteGroup(groupId: string) {
  return await fetch(`/api/group/${groupId}`, { method: "DELETE" });
}
