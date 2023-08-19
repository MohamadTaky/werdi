"use client";
import GlobalAddButton from "@/components/GlobalAddButton";
import Input from "@/components/Input";
import LoadedButton from "@/components/LoadedButton";
import Popover from "@/components/Popover";
import useTransitionMutation from "@/lib/react-query/useTransitionMutation";
import { postRequestValidator } from "@/lib/validators/groupWerd";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import addGroupWerdMutation from "../mutations/addGroupWerdMutation";

export default function AddGroupWerdForm() {
  const { groupId } = useParams();
  const { refresh } = useRouter();
  const [open, setOpen] = useState(false);
  const { mutate, isLoading } = useTransitionMutation({
    mutationFn: addGroupWerdMutation,
    onSuccess: () => {
      refresh();
      setOpen(false);
    },
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = postRequestValidator.parse(Object.fromEntries(formData.entries()));
    mutate({ groupId, data });
  }

  return (
    <Popover open={open} onOpenChange={setOpen} locked={isLoading} trigger={<GlobalAddButton />}>
      <form onSubmit={handleSubmit}>
        <fieldset disabled={isLoading} className="space-y-4 rounded-md transition disabled:opacity-50">
          <Input id="text" name="text" placeholder="الذِكر" />
          <Input id="count" name="count" placeholder="العدد" type="number" min="0" />
          <LoadedButton
            type="submit"
            isLoading={isLoading}
            className="mx-auto block rounded-md bg-black px-3 py-1 text-white"
          >
            إنشاء
          </LoadedButton>
        </fieldset>
      </form>
    </Popover>
  );
}
