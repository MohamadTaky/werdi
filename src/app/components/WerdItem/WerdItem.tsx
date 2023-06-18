"use client";
import checkWerdAction from "@/app/actions/checkWerdAction";
import deleteWerdAction from "@/app/actions/deleteWerdAction";
import { Check, CircleNotch, X } from "@/components/icons";
import MotionIcon from "@/components/MotionIcon";
import { Werd } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { useTransition } from "react";

export default function ({ text, count, done, id }: Werd) {
  const [deleting, startDeleting] = useTransition();
  const [checking, startChecking] = useTransition();
  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: deleting ? 0.7 : 1 }}
      exit={{ opacity: 0 }}
      className="space-y-2 rounded-md border-2 bg-gray-100 p-2 shadow"
    >
      <p>الذكر: {text}</p>
      <p>العدد: {count}</p>
      <div className="flex items-center gap-2">
        <button
          disabled={checking}
          onClick={() => startChecking(() => checkWerdAction(id, !done))}
          className={`h-7 w-7 cursor-pointer rounded border-gray-200 p-1 transition-colors ${
            done && !checking ? "bg-blue-500" : "bg-gray-300"
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {checking ? (
              <MotionIcon
                Icon={CircleNotch}
                key={"bb"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="animate-spin opacity-80"
                size="20"
                weight="bold"
              />
            ) : done ? (
              <MotionIcon
                key={"aa"}
                Icon={Check}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                size="20"
                weight="bold"
                className="text-white opacity-80"
              />
            ) : (
              <></>
            )}
          </AnimatePresence>
        </button>
        <button
          disabled={deleting}
          onClick={() => startDeleting(() => deleteWerdAction(id))}
          className="cursor-pointer rounded border-red-400 bg-red-500 p-1 transition-colors"
        >
          <AnimatePresence mode="wait" initial={false}>
            {deleting ? (
              <MotionIcon
                Icon={CircleNotch}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="animate-spin opacity-80"
                size="20"
                weight="bold"
              />
            ) : (
              <MotionIcon
                Icon={X}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                size="20"
                weight="bold"
                className="text-white"
              />
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.li>
  );
}
