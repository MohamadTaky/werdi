import { InputHTMLAttributes } from "react";
import cn from "@/lib/cn";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export default function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      className={cn(
        "cursor-pointer rounded text-blue-500 transition focus:ring-current active:bg-blue-600 active:text-blue-600 disabled:pointer-events-none",
        className
      )}
      {...props}
    />
  );
}
