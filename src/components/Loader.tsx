"use client";
import { motion } from "framer-motion";
import { CircleDashed, Moon } from "lucide-react";

export default function Loader() {
  const increments = 6;
  const array = Array(increments)
    .fill(0)
    .map((_v, i) => (i * 360) / increments);
  return (
    <div className="m-auto flex flex-col items-center opacity-80">
      <Moon size="50" className="fill-black"/>
      <div className="-m-2 h-12 w-1 rounded-sm bg-black" />
      <div className="relative h-24 w-24">
        <motion.div transition={{ repeat: Infinity, duration: 3 }} animate={{ rotate: array }}>
          <CircleDashed className="h-24 w-24" />
        </motion.div>
        <div className="absolute top-1/2 h-1/2 w-full border-2 border-transparent border-t-black bg-white" />
      </div>
    </div>
  );
}
