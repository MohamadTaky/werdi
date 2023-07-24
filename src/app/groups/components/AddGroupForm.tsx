"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import LoadedButton from "@/components/LoadedButton";
import Popover from "@/components/Popover";
import useTransitionMutation from "@/lib/react-query/useTransitionMutation";
import { postRequestValidator } from "@/lib/validators/group/group";
import { Plus } from "lucide-react";
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
    <Popover
      open={open}
      onOpenChange={setOpen}
      locked={isLoading}
      trigger={
        <Button className="fixed bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full p-2">
          <Plus size="28" />
        </Button>
      }
    >
      <form onSubmit={handleSubmit}>
        <fieldset disabled={isLoading} className="space-y-4 transition disabled:opacity-50">
          <Input id="name" name="name" placeholder="الاسم" />
          <LoadedButton type="submit" isLoading={isLoading} className="mx-auto">
            إنشاء
          </LoadedButton>
        </fieldset>
      </form>
    </Popover>
  );
}
