"use client";
import { motion, MotionProps } from "framer-motion";
import { HTMLAttributes } from "react";
import Button from "../Button";
import cn from "@/lib/cn";

export type ListItemProps = MotionProps & HTMLAttributes<HTMLLIElement>;

export default function ListItem({ className, children, ...props }: ListItemProps) {
  return (
    <Button asChild shape="box" variant="ghost" className={cn("border-b w-full", className)}>
      <motion.li layout {...props}>
        {children}
      </motion.li>
    </Button>
  );
}
