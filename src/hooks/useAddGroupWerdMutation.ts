import { useTransition } from "react";
import { useMutation, UseMutationOptions } from "react-query";
import { postRequestType } from "@/lib/validators/groupWerd";

export default function useAddGroupWerdMutation(options?: UseMutationOptions<any, unknown, any, unknown>) {
  const [pending, startTransition] = useTransition();
  const mutation = useMutation({
    ...options,
    mutationFn: addGroupWerd,
    onSuccess: (...props) =>
      startTransition(() => {
        options?.onSuccess?.(...props);
      }),
  });
  return { ...mutation, isLoading: mutation.isLoading || pending };
}

async function addGroupWerd({ groupId, ...data }: postRequestType & { groupId: string }) {
  await fetch(`/api/group/${groupId}`, { method: "POST", body: JSON.stringify(data) });
}
