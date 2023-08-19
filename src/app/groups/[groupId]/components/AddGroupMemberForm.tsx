"use client";
import searchUserQuery from "@/app/groups/[groupId]/queries/searchUserQuery";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Dialog from "@/components/Dialog";
import LoadedButton from "@/components/LoadedButton";
import Badge from "@/components/badge";
import useTransitionMutation from "@/lib/react-query/useTransitionMutation";
import { Group, GroupWerd, GroupWerdCompletion, User } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Search, UserPlus } from "lucide-react";
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
  const [searchKeyword, setSearchKeyword] = useState("");
  const { mutate, isLoading: isAdding } = useTransitionMutation({
    mutationFn: addGroupMembersMutation,
    onSuccess: () => setOpen(false),
  });

  const { groupId } = useParams();
  const { isPreviousData, isSuccess } = useQuery<User[]>([searchKeyword], searchUserQuery, {
    keepPreviousData: true,
    onSuccess: (searchedUsers) =>
      setUsers((prev) => {
        const persistedUsers = prev.filter((user) => user.selected);
        searchedUsers.forEach((user) => persistedUsers.push({ ...user, selected: false }));
        return persistedUsers;
      }),
    refetchOnWindowFocus: false,
  });
  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>, user: SelectableUser) => {
    setUsers((prev) => {
      const newUsers = Array.from(prev);
      newUsers.find((u) => u.id === user.id)!.selected = e.target.checked;
      return newUsers;
    });
  };
  const selectedUsers = users.filter((user) => user.selected);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button shape="circle" variant="outline">
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
          ${isPreviousData ? "opacity-0" : "opacity-100"}`}
        />
        <Loader2
          className={`absolute right-2 top-3 animate-spin transition
          ${isPreviousData ? "opacity-100" : "opacity-0"}`}
        />
      </div>
      <ul className={`flex min-h-[200px] flex-col transition-opacity ${isPreviousData ? "opacity-50" : ""}`}>
        <AnimatePresence mode="popLayout">
          {searchKeyword ? (
            users.length ? (
              users.map((user) => (
                <motion.li
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-200"
                >
                  <Avatar image={user.image ?? ""} fallback={user.name?.slice(0, 2)} asChild />
                  {user.name}
                  {user.id === adminId ? (
                    <Badge>مشرف</Badge>
                  ) : members.some((member) => member.id === user.id) ? (
                    <Badge>عضو</Badge>
                  ) : (
                    <Checkbox onChange={(e) => handleCheckbox(e, user)} className="mr-auto" />
                  )}
                </motion.li>
              ))
            ) : (
              !isSuccess && (
                <motion.p
                  className="m-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  لم يتم العثور على نتائج
                </motion.p>
              )
            )
          ) : (
            <></>
          )}
        </AnimatePresence>
      </ul>
      <LoadedButton
        onClick={() => mutate({ groupId, userIds: selectedUsers.map((user) => user.id) })}
        isLoading={isAdding}
        disabled={!selectedUsers.length || isAdding}
      >
        إضافة
      </LoadedButton>
    </Dialog>
  );
}
