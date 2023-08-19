import cn from "@/lib/cn";
import { HTMLAttributes } from "react";

type BadgeProps = HTMLAttributes<HTMLSpanElement>;

export default function Badge({ className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn("mr-auto rounded-full border bg-gray-100 px-2 py-1 text-xs shadow-sm", className)}
      {...props}
    >
      {children}
    </span>
  );
}
