import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export default function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      className={twMerge(
        "rounded text-blue-500 transition focus:ring-current active:bg-blue-600 active:text-blue-600",
        className
      )}
      {...props}
    />
  );
}
