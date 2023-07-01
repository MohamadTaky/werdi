"use client";
import { Check, CircleNotch } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import Modal from "@/components/ui/custom/Modal";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useAddWerdMutation from "../../hooks/useAddWerdMutation";

export default function AddWerdForm() {
  const { refresh } = useRouter();
  const [open, setOpen] = useState(false);
  const { mutate, isLoading } = useAddWerdMutation({
    onSuccess: () => {
      refresh();
      setOpen(false);
    },
  });
  return (
    <Modal title="إضافة عنصر جديد" locked={isLoading} open={open} onOpenChange={setOpen}>
      <form onSubmit={mutate} className="space-y-2">
        <Label htmlFor="text">الذِكر:</Label>
        <Input id="text" name="text" type="text" />
        <Label htmlFor="count">العدد:</Label>
        <Input min="0" defaultValue="0" type="number" id="count" name="count" />
        <Button disabled={isLoading} className="ml-auto" type="submit">
          {isLoading ? (
            <CircleNotch size="28" weight="bold" className="animate-spin text-white" />
          ) : (
            <Check size="28" weight="bold" className="text-white" />
          )}
        </Button>
      </form>
    </Modal>
  );
}
