import { postRequestValidator } from "@/lib/validators/werd";
import { FormEvent, useTransition } from "react";
import { useMutation, UseMutationOptions } from "react-query";

export default function useAddWerdMutation(options?: UseMutationOptions<any, unknown, any, unknown>) {
  const [pending, startTransition] = useTransition();
  const mutation = useMutation({
    ...options,
    mutationFn: addWerd,
    onSuccess: (...props) =>
      startTransition(() => {
        options?.onSuccess?.(...props);
      }),
  });

  return { ...mutation, isLoading: mutation.isLoading || pending };
}

async function addWerd(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const formData = new FormData(event.target as HTMLFormElement);
  const data = postRequestValidator.parse(Object.fromEntries(formData.entries()));
  return await fetch("/api/werd", { method: "POST", body: JSON.stringify(data) });
}
