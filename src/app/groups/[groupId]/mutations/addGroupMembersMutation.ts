import { postRequestType } from "@/lib/validators/group/user/groupUser";
type MutationType = postRequestType & { groupId: string };

export default async function addGroupMembersMutation({ groupId, userIds }: MutationType) {
  return await fetch(`/api/group/${groupId}/users`, { method: "POST", body: JSON.stringify({ userIds }) });
}
