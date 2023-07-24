import { postRequestType } from "@/lib/validators/group/group";

export default async function addGroupMutation(data: postRequestType) {
  return await fetch("/api/group", { method: "POST", body: JSON.stringify(data) });
}
