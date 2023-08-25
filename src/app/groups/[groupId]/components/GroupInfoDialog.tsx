"use client";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Dialog from "@/components/Dialog";
import Badge from "@/components/badge";
import List from "@/components/list/List";
import ListItem from "@/components/list/ListItem";
import * as Avatar from "@radix-ui/react-avatar";
import { ListIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { ChangeEvent, useEffect, useState } from "react";
import { GetGroupType } from "../helpers/getGroup";
import DeleteGroupButton from "./DeleteGroupButton";
import DeleteGroupMembersButton from "./DeleteGroupMembersButton";
import LeaveGroupButton from "./LeaveGroupButton";

type Props = { group: GetGroupType };

export default function GroupInfoDialog({ group: { members } }: Props) {
  const session = useSession();
  const [open, setOpen] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [selectedUsers, setSelectedusers] = useState<string[]>([]);
  const toggle = () => setRemoving((prev) => !prev);
  useEffect(() => setRemoving(false), [open]);
  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>, user: string) => {
    setSelectedusers((prev) => (e.target.checked ? [...prev, user] : prev.filter((u) => u !== user)));
  };
  const isAdmin = members.some(
    (member) => member.role === "ADMIN" && member.userId === session.data?.user.id
  );

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button shape="circle" variant="outline">
          <ListIcon size="24" />
        </Button>
      }
      title="الأعضاء"
      description={`${members.length} عضو`}
    >
      <List className="m-0 my-2 min-h-[200px]">
        {members.map(({ id, role, user: { name, image } }) => (
          <ListItem key={id} className="max-w-full gap-2">
            <Avatar.Root className="h-8 w-8 overflow-hidden rounded-full">
              <Avatar.AvatarImage src={image ?? ""} />
              <Avatar.Fallback>{name?.slice(0, 2)}</Avatar.Fallback>
            </Avatar.Root>
            <p>{name}</p>
            {role === "ADMIN" && <Badge className="mr-auto">مشرف</Badge>}
            {role === "ADMIN" && removing && (
              <Checkbox onChange={(e) => handleCheckbox(e, id)} className="mr-auto" />
            )}
          </ListItem>
        ))}
      </List>
      {isAdmin ? (
        <>
          {removing ? (
            <DeleteGroupMembersButton userIds={selectedUsers} />
          ) : (
            <Button onClick={toggle} variant="danger" className="mb-2">
              إزالة الأعضاء
            </Button>
          )}
          <DeleteGroupButton />
        </>
      ) : (
        <LeaveGroupButton />
      )}
    </Dialog>
  );
}
