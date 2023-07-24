type MutationType = { groupId: string };

export default async function leaveGroupMutation({ groupId }: MutationType) {
  await fetch(`/api/group/${groupId}/users`, { method: "DELETE" });
}
