"use client";
import { motion, MotionProps } from "framer-motion";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { useListContext } from "./ListContext";

export type ListItemProps = MotionProps &
  HTMLAttributes<HTMLLIElement> & {
    index?: number;
    staggerDelay?: number;
  };

export default function ListItem({
  className,
  children,
  index = 0,
  staggerDelay = 0.08,
  ...props
}: ListItemProps) {
  const { inititalRender } = useListContext();
  return (
    <motion.li
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: index * staggerDelay }}
      className={twMerge(
        "mx-auto flex max-w-md items-center border-b px-3 py-2 text-sm md:text-base",
        className
      )}
      {...props}
    >
      {children}
    </motion.li>
  );
}
