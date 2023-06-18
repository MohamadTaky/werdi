import { postRequestValidator } from "@/validators/werd";
import { useRouter } from "next/navigation";
import { FormEvent, useTransition } from "react";
import { useMutation } from "react-query";

export default function useAddWerdMutation() {
  const [pending, startTransition] = useTransition();
  const { replace } = useRouter();
  const mutation = useMutation({
    mutationFn: addWerd,
    onSuccess: () => startTransition(() => replace("/")),
  });
  return { ...mutation, isLoading: mutation.isLoading || pending };
}

async function addWerd(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const formData = new FormData(event.target as HTMLFormElement);
  const data = postRequestValidator.parse(Object.fromEntries(formData.entries()));
  return await fetch("/api/werd", { method: "POST", body: JSON.stringify(data) });
}
