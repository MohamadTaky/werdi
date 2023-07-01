"use client";
import { CircleNotch, UserPlus } from "@/components/icons";
import { Avatar, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Command, CommandInput, CommandItem, CommandList } from "@/components/ui/Command";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import { CommandLoading } from "cmdk";
import { useState } from "react";
import useUserSearch from "@/hooks/useUserSearchQuery";

export default function AddGroupMemberForm() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const { data: users, isLoading } = useUserSearch(searchKeyword);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-12 w-12 rounded-full p-0">
          <UserPlus size="24" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>إضافة عضو جديد</DialogTitle>
        </DialogHeader>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="البحث عن مستخدمين"
            value={searchKeyword}
            onValueChange={setSearchKeyword}
          />
          <CommandList className="min-h-[100px]">
            {isLoading ? (
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
                    checked={selectedUserIds.some((userId) => userId === id)}
                    onCheckedChange={(checked) =>
                      setSelectedUserIds((prev) =>
                        checked ? [...prev, id] : prev.filter((userId) => userId !== id)
                      )
                    }
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
        </Command>
      </DialogContent>
    </Dialog>
  );
}
