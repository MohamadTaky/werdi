export default async function deleteGroupWerdMutation({
  groupId,
  werdId,
}: {
  groupId: string;
  werdId: string;
}) {
  return await fetch(`/api/group/${groupId}/${werdId}`, { method: "DELETE" });
}
