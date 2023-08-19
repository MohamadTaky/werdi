import List from "@/components/list/List";
import { Group, Prisma } from "@prisma/client";
import GroupListItem from "./GroupListItem";

type GroupListProps = { groups: (Group & { _count: Prisma.GroupCountOutputType })[] };

export default function GroupList({ groups }: GroupListProps) {
  return (
    <List>
      {groups.map((group) => (
        <GroupListItem key={group.id} {...group} />
      ))}
    </List>
  );
}
