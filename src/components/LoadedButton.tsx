"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, ReactNode } from "react";
import Button from "./Button";

export type LoadedButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  fallback?: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "warning" | undefined;
};

export default function LoadedButton({
  isLoading,
  fallback = <Loader2 size="28" className="animate-spin text-white" />,
  children,
  variant = "primary",
  ...props
}: LoadedButtonProps) {
  return (
    <Button variant={variant} disabled={isLoading} {...props}>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            key="fallback"
          >
            {fallback}
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className={`flex items-center gap-1.5 transition duration-200 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </Button>
  );
}
