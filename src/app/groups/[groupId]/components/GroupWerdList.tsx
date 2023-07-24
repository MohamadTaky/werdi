"use client";
import List from "@/components/list/List";
import { GroupWerd, GroupWerdCompletion } from "@prisma/client";
import GroupWerdItem from "./GroupWerdItem";

type Props = {
  werds: (GroupWerd & {
    completions: GroupWerdCompletion[];
  })[];
};

export default function GroupWerdList({ werds }: Props) {
  return werds.length > 0 ? (
    <List>
      {werds.map(({ id, ...werd }, i) => (
        <GroupWerdItem key={id} id={id} {...werd} index={i}></GroupWerdItem>
      ))}
    </List>
  ) : (
    <p className="m-auto mt-16 font-semibold">ما من أذكار في هذه المجموعة</p>
  );
}
