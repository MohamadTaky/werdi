type MutationType = {
  groupId: string;
};

export default async function deleteGroupMutation({ groupId }: MutationType) {
  await fetch(`/api/group/${groupId}`, { method: "DELETE" });
}
