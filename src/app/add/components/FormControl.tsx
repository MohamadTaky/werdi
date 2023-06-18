"use client";
import { Check, X } from "@/components/icons";
import Link from "next/link";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function FormControl() {
  const { pending } = useFormStatus();
  return (
    <div className="mx-auto flex w-fit items-center gap-2">
      {pending ? (
        "Loading ..."
      ) : (
        <>
          <button type="submit" className="rounded border border-green-400 bg-green-500 px-2 py-1 shadow">
            <Check size="28" weight="bold" className="text-white" />
          </button>
          <Link href="/" className="rounded border border-red-400 bg-red-500 px-2 py-1 shadow">
            <X size="28" weight="bold" className="text-white" />
          </Link>
        </>
      )}
    </div>
  );
}
