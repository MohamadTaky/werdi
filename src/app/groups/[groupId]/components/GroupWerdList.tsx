"use client";
import List from "@/components/list/List";
import { GroupWerd, GroupWerdCompletion } from "@prisma/client";
import GroupWerdListItem from "./GroupWerdIListIem";

type Props = {
  werds: (GroupWerd & {
    completions: GroupWerdCompletion[];
  })[];
};

export default function GroupWerdList({ werds }: Props) {
  return werds.length > 0 ? (
    <List>
      {werds.map(({ id, ...werd }) => (
        <GroupWerdListItem key={id} id={id} {...werd}></GroupWerdListItem>
      ))}
    </List>
  ) : (
    <p className="m-auto mt-16 font-semibold">ما من أذكار في هذه المجموعة</p>
  );
}
