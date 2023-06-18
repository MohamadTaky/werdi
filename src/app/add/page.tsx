"use client";
import { Check, X, CircleNotch } from "@/components/icons";
import Link from "next/link";
import useAddWerdMutation from "./hooks/useAddWerdMutation";

export default function AddPage() {
  const { mutate, isLoading } = useAddWerdMutation();
  return (
    <form onSubmit={mutate} className="mx-auto max-w-xs space-y-4 p-3 pt-32">
      <h2 className="mb-6 text-2xl font-semibold">إضافة عنصر جديد</h2>
      <label htmlFor="text" className="mb-2 block">
        الذِكر:
      </label>
      <input
        className="w-full rounded border-gray-300 bg-gray-100 p-2 text-sm shadow"
        type="text"
        id="text"
        name="text"
      />
      <label className="mb-2 block" htmlFor="count">
        العدد:
      </label>
      <input
        min="0"
        defaultValue="0"
        className="min-w-fit rounded border-gray-300 bg-gray-100 p-2 text-sm shadow"
        type="number"
        id="count"
        name="count"
      />
      <div className="mx-auto flex w-fit items-center gap-2">
        {!isLoading ? (
          <CircleNotch size="48" className="animate-spin"/>
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
    </form>
  );
}
