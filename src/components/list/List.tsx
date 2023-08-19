"use client";
import { HtmlHTMLAttributes, useEffect, Children } from "react";
import { AnimatePresence, stagger, useAnimate } from "framer-motion";
import cn from "@/lib/cn";

type Props = HtmlHTMLAttributes<HTMLUListElement>;

export default function List({ children, className, ...props }: Props) {
  const [scope, animate] = useAnimate();
  useEffect(() => {
    if (Children.count(children)) animate("li", { opacity: [0, 1] }, { delay: stagger(0.1) });
  }, [children, animate]);
  return (
    <ul ref={scope} className={cn("mx-auto w-full max-w-xl", className)} {...props}>
      <AnimatePresence>{children}</AnimatePresence>
    </ul>
  );
}
