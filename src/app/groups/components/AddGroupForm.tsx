"use client";
import GlobalAddButton from "@/components/GlobalAddButton";
import Input from "@/components/Input";
import LoadedButton from "@/components/LoadedButton";
import Popover from "@/components/Popover";
import useTransitionMutation from "@/lib/react-query/useTransitionMutation";
import { postRequestValidator } from "@/lib/validators/group/group";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import addGroupMutation from "../mutations/addGroupMutatuion";

export default function AddGroupForm() {
  const { refresh } = useRouter();
  const [open, setOpen] = useState(false);
  const { mutate, isLoading } = useTransitionMutation({
    mutationFn: addGroupMutation,
    onSuccess: () => {
      setOpen(false);
      refresh();
    },
  });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = postRequestValidator.parse(Object.fromEntries(formData.entries()));
    mutate(data);
  };

  return (
    <Popover open={open} onOpenChange={setOpen} locked={isLoading} trigger={<GlobalAddButton />}>
      <form onSubmit={handleSubmit}>
        <fieldset disabled={isLoading} className="space-y-4 transition disabled:opacity-50">
          <Input required id="name" name="name" placeholder="الاسم" />
          <LoadedButton type="submit" isLoading={isLoading} className="mx-auto">
            إنشاء
          </LoadedButton>
        </fieldset>
      </form>
    </Popover>
  );
}
