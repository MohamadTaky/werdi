import { QueryFunctionContext } from "react-query";

export default async function searchUserQuery({ queryKey }: QueryFunctionContext) {
  const search = queryKey[0] as string;
  if (!search) return [];
  const res = await fetch(`/api/user?search=${search.trim()}`);
  return await res.json();
}
