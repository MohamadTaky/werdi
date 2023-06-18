import { deleteRequestType } from "@/validators/werd";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useMutation } from "react-query";

export default function useDeleteWerdMutaton() {
  const [pending, startTransition] = useTransition();
  const { refresh } = useRouter();
  const mutation = useMutation({ mutationFn: deleteWerd, onSuccess: () => startTransition(refresh) });
  return { ...mutation, isLoading: mutation.isLoading || pending };
}

async function deleteWerd(data: deleteRequestType) {
  return await fetch("/api/deletewerd", { method: "POST", body: JSON.stringify(data) });
}
