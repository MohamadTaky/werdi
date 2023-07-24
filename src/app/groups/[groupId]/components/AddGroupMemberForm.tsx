"use client";
import searchUserQuery from "@/app/groups/[groupId]/queries/searchUserQuery";
import Badge from "@/components/badge";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Dialog from "@/components/Dialog";
import LoadedButton from "@/components/LoadedButton";
import useTransitionMutation from "@/lib/react-query/useTransitionMutation";
import { Group, GroupWerd, GroupWerdCompletion, User } from "@prisma/client";
import * as Avatar from "@radix-ui/react-avatar";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Search, UserPlus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useQuery } from "react-query";
import addGroupMembersMutation from "../mutations/addGroupMembersMutation";

type SelectableUser = User & { selected: boolean };
type Props = Group & {
  werds: (GroupWerd & {
    completions: GroupWerdCompletion[];
  })[];
  admin: User;
  members: User[];
};

export default function AddGroupMemberForm({ adminId, members }: Props) {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<SelectableUser[]>([]);
  const selectedUsers = users.filter((user) => user.selected);
  const [searchKeyword, setSearchKeyword] = useState("");
  const { mutate, isLoading: isAdding } = useTransitionMutation({
    mutationFn: addGroupMembersMutation,
    onSuccess: () => {
      setOpen(false);
    },
  });
  const { groupId } = useParams();
  const { isLoading } = useQuery<User[]>([searchKeyword], {
    queryFn: searchUserQuery,
    onSuccess: (searchedUsers) => {
      setUsers((prev) => {
        const updatedUsers = prev.filter((user) => user.selected);
        searchedUsers.forEach((user) => updatedUsers.push({ ...user, selected: false }));
        return updatedUsers;
      });
    },
    refetchOnWindowFocus: false,
  });
  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>, user: SelectableUser) => {
    setUsers((prev) => {
      const changedUser = prev.find((u) => u.id === user.id) as SelectableUser;
      changedUser.selected = e.target.checked;
      return prev;
    });
  };
  const session = useSession();
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button variant="outline" className="rounded-full p-2">
          <UserPlus size="24" />
        </Button>
      }
    >
      <div className="relative flex flex-row-reverse items-center gap-2 border-b px-2">
        <input
          placeholder="البحث عن مستخدمين"
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="peer w-full border-none bg-transparent py-3 pr-2 placeholder-gray-500 outline-none focus:outline-none focus:ring-0"
        />
        <Search
          className={`text-gray-500 transition peer-focus:text-blue-500
          ${isLoading ? "opacity-0" : "opacity-100"}`}
        />
        <Loader2
          className={`absolute right-2 top-3 animate-spin transition
          ${isLoading ? "opacity-100" : "opacity-0"}`}
        />
      </div>
      <ul className="flex min-h-[200px] flex-col">
        <AnimatePresence mode="popLayout">
          {!isLoading &&
            (users?.length
              ? users?.map((user) => (
                  <motion.li
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={user.id}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-200"
                  >
                    <Avatar.Root asChild className="h-8 w-8 overflow-hidden rounded-full">
                      <Avatar.Image src={user.image as string} alt={user.name as string} />
                    </Avatar.Root>
                    <span>{user.name}</span>
                    {session.data?.user.id === adminId ? (
                      <Badge>مشرف</Badge>
                    ) : members.some((user) => user.id === session.data?.user.id) ? (
                      <Badge>عضو</Badge>
                    ) : (
                      <Checkbox onChange={(e) => handleCheckbox(e, user)} className="mr-auto" />
                    )}
                  </motion.li>
                ))
              : !!searchKeyword && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="m-auto"
                  >
                    لم يتم العثور على نتائج
                  </motion.p>
                ))}
        </AnimatePresence>
      </ul>
      <LoadedButton
        onClick={() =>
          mutate({
            groupId,
            userIds: selectedUsers.map((user) => user.id),
          })
        }
        isLoading={isAdding}
        disabled={!selectedUsers.length || isAdding}
      >
        إضافة
      </LoadedButton>
    </Dialog>
  );
}
