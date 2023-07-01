import { postRequestType } from "@/lib/validators/group";
import { useTransition } from "react";
import { useMutation, UseMutationOptions } from "react-query";

export default function useAddGroupMutation(
  options?: UseMutationOptions<void, unknown, { name: string }, unknown>
) {
  const [pending, startTransition] = useTransition();
  const mutation = useMutation({
    ...options,
    mutationFn: addGroup,
    onSuccess: (...props) =>
      startTransition(() => {
        options?.onSuccess?.(...props);
      }),
  });
  return { ...mutation, isLoading: mutation.isLoading || pending };
}

async function addGroup(data: postRequestType) {
  await fetch("/api/group", { method: "POST", body: JSON.stringify(data) });
}
