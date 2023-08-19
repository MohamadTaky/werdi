"use client";
import GlobalAddButton from "@/components/GlobalAddButton";
import Input from "@/components/Input";
import LoadedButton from "@/components/LoadedButton";
import Popover from "@/components/Popover";
import useTransitionMutation from "@/lib/react-query/useTransitionMutation";
import { postRequestValidator } from "@/lib/validators/werd";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import addWerdMutation from "../mutations/addWerdMutation";

export default function AddWerdForm() {
  const { refresh } = useRouter();
  const [open, setOpen] = useState(false);
  const { mutate, isLoading } = useTransitionMutation({
    mutationFn: addWerdMutation,
    onSuccess: () => {
      refresh();
      setOpen(false);
    },
  });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = postRequestValidator.parse(Object.fromEntries(formData.entries()));
    mutate(data);
  };

  return (
    <Popover locked={isLoading} trigger={<GlobalAddButton />} open={open} onOpenChange={setOpen}>
      <form onSubmit={handleSubmit}>
        <fieldset disabled={isLoading} className="space-y-4 transition disabled:opacity-50">
          <Input required id="text" name="text" placeholder="الذِكر" />
          <Input required id="count" name="count" placeholder="العدد" min="0" type="number" />
          <LoadedButton type="submit" isLoading={isLoading} className="mx-auto">
            <Check />
          </LoadedButton>
        </fieldset>
      </form>
    </Popover>
  );
}
