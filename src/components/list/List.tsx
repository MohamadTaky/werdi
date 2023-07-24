"use client";
import { ListContextProvider } from "./ListContext";
import { HtmlHTMLAttributes } from "react";
import { AnimatePresence } from "framer-motion";

type Props = HtmlHTMLAttributes<HTMLUListElement>;

export default function List({ children, ...props }: Props) {
  return (
    <ul className="-m-3" {...props}>
      <ListContextProvider>
        <AnimatePresence>{children}</AnimatePresence>
      </ListContextProvider>
    </ul>
  );
}
