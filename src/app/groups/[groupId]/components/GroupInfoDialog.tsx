"use client";
import Badge from "@/components/badge";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Dialog from "@/components/Dialog";
import List from "@/components/list/List";
import ListItem from "@/components/list/ListItem";
import { Group, GroupWerd, GroupWerdCompletion, User } from "@prisma/client";
import * as Avatar from "@radix-ui/react-avatar";
import { ListIcon, LogOut } from "lucide-react";
import { useSession } from "next-auth/react";
import { ChangeEvent, useEffect, useState } from "react";
import DeleteGroupButton from "./DeleteGroupButton";
import DeleteGroupMembersButton from "./DeleteGroupMembersButton";
import LeaveGroupButton from "./LeaveGroupButton";

type Props = {
  group: Group & {
    werds: (GroupWerd & {
      completions: GroupWerdCompletion[];
    })[];
    admin: User;
    members: User[];
  };
};

export default function GroupInfoDialog({ group: { members, admin, id: groupId } }: Props) {
  const session = useSession();
  const [open, setOpen] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [selectedUsers, setSelectedusers] = useState<string[]>([]);
  const toggle = () => setRemoving((prev) => !prev);
  useEffect(() => {
    setRemoving(false);
  }, [open]);
  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>, user: string) => {
    setSelectedusers((prev) => (e.target.checked ? [...prev, user] : prev.filter((u) => u !== user)));
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button className="rounded-full p-2" variant="outline">
          <ListIcon size="24" />
        </Button>
      }
      title="الأعضاء"
      description={`${members.length + 1} عضو`}
    >
      <List className="m-0 my-2 min-h-[200px]">
        {[admin, ...members].map(({ id, name, image }) => (
          <ListItem key={id} className="max-w-full gap-2">
            <Avatar.Root className="h-8 w-8 overflow-hidden rounded-full">
              <Avatar.AvatarImage src={image ?? ""} />
              <Avatar.Fallback>{name?.slice(0, 2)}</Avatar.Fallback>
            </Avatar.Root>
            <p>{name}</p>
            {session.data?.user.id === id && <Badge className="mr-auto">مشرف</Badge>}
            {admin.id !== id && removing && (
              <Checkbox onChange={(e) => handleCheckbox(e, id)} className="mr-auto" />
            )}
          </ListItem>
        ))}
      </List>
      {session.data?.user.id === admin.id ? (
        <>
          {removing ? (
            <DeleteGroupMembersButton userIds={selectedUsers} />
          ) : (
            <Button onClick={toggle} variant="danger" className="mb-2">
              إزالة الأعضاء
            </Button>
          )}
          <DeleteGroupButton groupId={groupId} />
        </>
      ) : (
        <LeaveGroupButton groupId={groupId}>
          <LogOut />
          مغادرة
        </LeaveGroupButton>
      )}
    </Dialog>
  );
}
