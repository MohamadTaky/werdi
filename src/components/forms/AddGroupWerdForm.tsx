"use client";
import { CircleNotch } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import useAddGroupWerdMutation from "@/hooks/useAddGroupWerdMutation";
import { postRequestValidator } from "@/lib/validators/groupWerd";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Modal from "../ui/custom/Modal";

export default function AddGroupWerdForm() {
  const { groupId } = useParams();
  const { refresh } = useRouter();
  const [open, setOpen] = useState(false);
  const { mutate, isLoading } = useAddGroupWerdMutation({
    onSuccess: () => {
      refresh();
      setOpen(false);
    },
  });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = postRequestValidator.parse(Object.fromEntries(formData.entries()));
    mutate({ ...data, groupId });
  };

  return (
    <Modal title="إضافة ذِكر جديد" open={open} onOpenChange={setOpen}>
      <form onSubmit={handleSubmit} className="space-y-2 rounded-md">
        <Label htmlFor="text">الذِكر</Label>
        <Input id="text" type="text" name="text" />
        <Label htmlFor="count">العدد</Label>
        <Input id="count" type="number" name="count" min="0" />
        <Button disabled={isLoading}>
          {isLoading ? <CircleNotch size="28" weight="bold" className="animate-spin text-white" /> : "إنشاء"}
        </Button>
      </form>
    </Modal>
  );
}
