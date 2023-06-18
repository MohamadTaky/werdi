import { Check, X } from "@/components/icons";
import Link from "next/link";
import addWerdAction from "./actions/addWerdAction";
import FormControl from "./components/FormControl";

export default function AddPage() {
  return (
    <form action={addWerdAction} className="mx-auto max-w-xs space-y-4 p-3 pt-32">
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
      <FormControl/>
    </form>
  );
}
