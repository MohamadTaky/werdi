"use client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { postRequestValidator } from "@/lib/validators/group";
import { FormEvent, useState } from "react";
import { CircleNotch } from "@/components/icons";
import useAddGroupMutation from "../../hooks/useAddGroupMutation";
import Modal from "../ui/custom/Modal";
import { useRouter } from "next/navigation";

export default function AddGroupForm() {
  const { refresh } = useRouter();
  const [open, setOpen] = useState(false);
  const { mutate, isLoading } = useAddGroupMutation({
    onSuccess: () => {
      setOpen(false);
      refresh();
    },
  });
  const sumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = postRequestValidator.parse(Object.fromEntries(formData.entries()));
    mutate(data);
  };

  return (
    <Modal title="إنشاء مجموعة جديدة" open={open} onOpenChange={setOpen}>
      <form onSubmit={sumbit} className="space-y-4">
        <Label htmlFor="name">الاسم</Label>
        <Input id="name" name="name" />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <CircleNotch size="28" weight="bold" className="animate-spin text-white" /> : "إنشاء"}
        </Button>
        {/* <Command shouldFilter={false}>
          <Label htmlFor="users">الأعضاء</Label>
          <CommandInput
            id="users"
            placeholder="البحث عن مستخدمين"
            value={searchKeyword}
            onValueChange={setSearchKeyword}
          />
          <CommandList className="min-h-[100px]">
            {searching ? (
              <CommandLoading>
                <CircleNotch size="28" className="mx-auto mt-1.5 animate-spin" />
              </CommandLoading>
            ) : users?.length ? (
              users.map(({ id, name, image }, i) => (
                <CommandItem key={id} className="gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={image as string} alt={name as string} />
                  </Avatar>
                  <span>{name}</span>
                  <Checkbox
                    // checked={selectedUserIds.some((userId) => userId === id)}
                    // onCheckedChange={(checked) =>
                    //   setSelectedUserIds((prev) =>
                    //     checked ? [...prev, id] : prev.filter((userId) => userId !== id)
                    //   )
                    // }
                    className="mr-auto h-5 w-5"
                  />
                </CommandItem>
              ))
            ) : (
              !!searchKeyword && (
                <div cmdk-empty className="pt-1.5 text-center">
                  لم يتم العثور على نتائج
                </div>
              )
            )}
          </CommandList>
        </Command> */}
      </form>
    </Modal>
  );
}
