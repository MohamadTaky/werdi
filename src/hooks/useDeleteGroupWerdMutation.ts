import { useTransition } from "react";
import { useMutation, UseMutationOptions } from "react-query";

export default function useDeleteGroupWerdMutation(options?: UseMutationOptions<any, unknown, any, unknown>) {
  const [pending, startTransiton] = useTransition();
  const mutation = useMutation({
    ...options,
    mutationFn: deleteGroupWerd,
    onSuccess: (...props) =>
      startTransiton(() => {
        options?.onSuccess?.(...props);
      }),
  });
  return { ...mutation, isLoading: mutation.isLoading || pending };
}

async function deleteGroupWerd({ groupId, werdId }: { groupId: string; werdId: string }) {
  await fetch(`/api/group/${groupId}/${werdId}`, { method: "DELETE" });
}
