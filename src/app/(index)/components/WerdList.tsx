"use client";
import List from "@/components/list/List";
import { Werd } from "@prisma/client";
import WerdListItem from "./WerdListItem";

type Props = { werds: Werd[] };

export default function WerdList({ werds }: Props) {
  return (
    <List>
      {werds.map((werd) => (
        <WerdListItem key={werd.id} werd={werd} />
      ))}
    </List>
  );
}
