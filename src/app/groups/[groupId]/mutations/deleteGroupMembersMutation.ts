import { deleteRequestType } from "@/lib/validators/group/user/groupUser";

type MutationType = deleteRequestType & { groupId: string };

export default async function deleteGroupMembersMutation({ groupId, userIds }: MutationType) {
  return await fetch(`/api/groups/${groupId}/users/remove`, { method: "DELETE", body: JSON.stringify(userIds) });
}
