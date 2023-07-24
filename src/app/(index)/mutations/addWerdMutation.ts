import { postRequestType } from "@/lib/validators/werd";

export default async function addWerd(data: postRequestType) {
  return await fetch("/api/werd", { method: "POST", body: JSON.stringify(data) });
}
