import { putRequestType } from "@/lib/validators/werd";
import { useTransition } from "react";
import { useMutation, UseMutationOptions } from "react-query";

export default function useCheckWerdMutation(options?: UseMutationOptions<any, unknown, any, unknown>) {
  const [pending, startTransition] = useTransition();
  const mutation = useMutation({
    ...options,
    mutationFn: checkWerd,
    onSuccess: (...props) =>
      startTransition(() => {
        options?.onSuccess?.(...props);
      }),
  });
  return { ...mutation, isLoading: mutation.isLoading || pending };
}

async function checkWerd(data: putRequestType) {
  return await fetch("/api/werd", { method: "PUT", body: JSON.stringify(data) });
}
