import { postRequestType } from "@/lib/validators/groupWerd";

type MutationType = {
  groupId: string;
  data: postRequestType;
};

export default async function addGroupWerdMutation({ groupId, data }: MutationType) {
  return await fetch(`/api/group/${groupId}/werd`, { method: "POST", body: JSON.stringify(data) });
}
