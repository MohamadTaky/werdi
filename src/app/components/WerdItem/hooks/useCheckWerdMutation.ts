import { putRequestType } from "@/validators/werd";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useMutation } from "react-query";

export default function useCheckWerdMutation() {
  const { refresh } = useRouter();
  const [pending, startTransition] = useTransition();
  const mutation = useMutation({ mutationFn: checkWerd, onSuccess: () => startTransition(refresh) });
  return { ...mutation, isLoading: mutation.isLoading || pending };
}

async function checkWerd(data: putRequestType) {
  return await fetch("/api/werd", { method: "PUT", body: JSON.stringify(data) });
}
