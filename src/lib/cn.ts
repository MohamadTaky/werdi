import { twMerge } from "tailwind-merge";
import { clsx, ClassArray } from "clsx";

export default function cn(...classes: ClassArray) {
  return twMerge(clsx(classes));
}
