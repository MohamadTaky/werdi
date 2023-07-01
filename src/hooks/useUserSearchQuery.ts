import { User } from "@prisma/client";
import { QueryFunctionContext, useQuery } from "react-query";

export default function useUserSearch(name: string) {
  return useQuery([name], { queryFn: searchUser, enabled: !!name });
}

async function searchUser({ queryKey }: QueryFunctionContext) {
  const name = queryKey[0];
  const data = await fetch(`/api/user?search=${name}`);
  return data.json() as Promise<User[]>;
}
