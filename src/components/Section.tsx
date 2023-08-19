import cn from "@/lib/cn";
import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes } from "react";

const sectionVariants = cva("h-full", {
  variants: {
    container: { flex: "flex flex-col gap-2 p-3" },
  },
});

type SectionProps = HTMLAttributes<HTMLElement> & VariantProps<typeof sectionVariants>;

export default function Section({ className, container, ...props }: SectionProps) {
  return <section className={cn(sectionVariants({ container, className }))} {...props} />;
}
