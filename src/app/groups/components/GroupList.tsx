import List from "@/components/list/List";
import ListItem from "@/components/list/ListItem";
import { Group, Prisma } from "@prisma/client";
import Link from "next/link";

type Props = {
  groups: (Group & { _count: Prisma.GroupCountOutputType })[];
};

export default function GroupList({ groups }: Props) {
  return (
    <List>
      {groups.map(({ id, name, _count: { members, werds } }, i) => (
        <ListItem key={id} index={i}>
          <Link href={`groups/${id}`} className="flex-1 space-y-2">
            <p className="text-lg font-semibold text-black">{name}</p>
            <p className="text-sm text-gray-500 md:text-base">{members + 1} عضو</p>
            <p className="text-sm text-gray-500 md:text-base">{werds} ذِكر</p>
          </Link>
        </ListItem>
      ))}
    </List>
  );
}
