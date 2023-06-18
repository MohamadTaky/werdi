"use client";
import { Check, CircleNotch, X } from "@/components/icons";
import { Werd } from "@prisma/client";
import useCheckWerdMutation from "./hooks/useCheckWerdMutation";
import useDeleteWerdMutaton from "./hooks/useDeleteWerdMutation";

export default function ({ text, count, done, id }: Werd) {
  const { mutate: deleteWerd, isLoading: isDeleting } = useDeleteWerdMutaton();
  const { mutate: checkWerd, isLoading: isChecking } = useCheckWerdMutation();
  return (
    <li className="space-y-2 rounded-md border-2 bg-gray-100 p-2 shadow">
      <p>الذكر: {text}</p>
      <p>العدد: {count}</p>
      <div className="flex items-center gap-2">
        <button
          disabled={isChecking}
          onClick={() => checkWerd({ id, done: !done })}
          className={`h-7 w-7 cursor-pointer rounded border-gray-200 p-1 transition-colors ${
            done && !isChecking ? "bg-blue-500" : "bg-gray-300"
          }`}
        >
          {isChecking ? (
            <CircleNotch className="animate-spin opacity-80" size="20" weight="bold" />
          ) : done ? (
            <Check size="20" weight="bold" className="text-white opacity-80" />
          ) : (
            <></>
          )}
        </button>
        <button
          disabled={isDeleting}
          onClick={() => deleteWerd({ id })}
          className="cursor-pointer rounded border-red-400 bg-red-500 p-1 transition-colors"
        >
          {isDeleting ? (
            <CircleNotch className="animate-spin opacity-80" size="20" weight="bold" />
          ) : (
            <X size="20" weight="bold" className="text-white" />
          )}
        </button>
      </div>
    </li>
  );
}
