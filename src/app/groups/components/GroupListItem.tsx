import ListItem from "@/components/list/ListItem";
import { Group, Prisma } from "@prisma/client";
import Link from "next/link";

type GroupListItemProps = Group & { _count: Prisma.GroupCountOutputType };

export default function GroupListItem({ name, id, _count: { members, werds } }: GroupListItemProps) {
  return (
    <ListItem key={id}>
      <Link href={`groups/${id}`} className="flex-1 space-y-1">
        <p className="text-lg font-semibold text-black">{name}</p>
        <p className="text-sm text-gray-500 md:text-base">{members} عضو</p>
        <p className="text-sm text-gray-500 md:text-base">{werds} ذِكر</p>
      </Link>
    </ListItem>
  );
}
