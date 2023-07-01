import { useTransition } from "react";
import { useMutation, UseMutationOptions } from "react-query";

export default function useDeleteWerdMutaton(options?: UseMutationOptions<any, unknown, any, unknown>) {
  const [pending, startTransition] = useTransition();
  const mutation = useMutation({
    ...options,
    mutationFn: deleteWerd,
    onSuccess: (...props) =>
      startTransition(() => {
        options?.onSuccess?.(...props);
      }),
  });
  return { ...mutation, isLoading: mutation.isLoading || pending };
}

async function deleteWerd(werdId: string) {
  return await fetch(`/api/werd/${werdId}`, { method: "DELETE" });
}
