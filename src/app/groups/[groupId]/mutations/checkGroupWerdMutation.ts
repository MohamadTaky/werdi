type MutationType = {
  groupId: string;
  werdId: string;
};

export default async function checkGroupWerdMutation({ groupId, werdId }: MutationType) {
  await fetch(`/api/group/${groupId}/${werdId}`, { method: "PUT" });
}
