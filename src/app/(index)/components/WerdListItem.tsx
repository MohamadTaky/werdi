import ListItem, { ListItemProps } from "@/components/list/ListItem";
import LoadedButton from "@/components/LoadedButton";
import useTransitionMutation from "@/lib/react-query/useTransitionMutation";
import { Werd } from "@prisma/client";
import { Check, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import checkWerdMutation from "../mutations/checkWerdMutation";

type WerdListItemProps = ListItemProps & {
  werd: Werd;
};

export default function WerdListItem({ werd: { id, text, count, completed } }: WerdListItemProps) {
  const { refresh } = useRouter();
  const { mutate, isLoading } = useTransitionMutation({
    mutationFn: checkWerdMutation,
    onSuccess: refresh,
  });
  return (
    <ListItem>
      <Link className="flex-1 space-y-2" href={`werd/${id}`}>
        <h2 className="tsxt-sm mb-2 md:text-lg">{text}</h2>
        <p className="text-sm text-gray-500 md:text-base">{count} مرة</p>
      </Link>
      <LoadedButton
        shape="circle"
        fallback={<Loader2 className="animate-spin text-black" />}
        className={`grid place-items-center border border-gray-200 p-1.5 transition duration-200 disabled:opacity-100 ${
          completed ? "bg-blue-500" : "bg-gray-100"
        }`}
        isLoading={isLoading}
        disabled={completed || isLoading}
        onClick={() => mutate({ id })}
      >
        <Check size="20" className={`block text-white ${!completed ? "opacity-0" : ""}`} />
      </LoadedButton>
    </ListItem>
  );
}
