import ListItem from "@/components/list/ListItem";
import Link from "next/link";
import { GroupWerd, GroupWerdCompletion } from "@prisma/client";
import { useSession } from "next-auth/react";
import LoadedButton from "@/components/LoadedButton";
import { Check, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import useTransitionMutation from "@/lib/react-query/useTransitionMutation";
import checkGroupWerdMutation from "../mutations/checkGroupWerdMutation";

type Props = GroupWerd & {
  completions: GroupWerdCompletion[];
  index: number;
};

export default function GroupWerdItem({ text, id, groupId, count, completions, index }: Props) {
  const { refresh } = useRouter();
  const { mutate, isLoading } = useTransitionMutation({
    mutationFn: checkGroupWerdMutation,
    onSuccess: refresh,
  });
  const session = useSession();
  const completed = completions.some((completion) => completion.userId === session.data?.user.id);
  return (
    <ListItem index={index}>
      <Link className="flex-1 space-y-2" href={`groups/${groupId}/${id}`}>
        <p>{text}</p>
        <p className="text-gray-500">{count} مرة</p>
      </Link>
      <LoadedButton
        fallback={<Loader2 size="20" className="animate-spin text-black" />}
        className={`grid place-items-center rounded-full border border-gray-200 p-1 transition duration-200 disabled:opacity-100 ${
          completed ? "bg-blue-500" : "bg-gray-100"
        }`}
        isLoading={isLoading}
        onClick={() => mutate({ groupId, werdId: id })}
        disabled={isLoading || completed}
      >
        <Check size="20" className={`text-white ${!completed ? "opacity-0" : ""}`} />
      </LoadedButton>
    </ListItem>
  );
}
