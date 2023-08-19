"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";
import Button, { ButtonProps } from "./Button";

export type LoadedButtonProps = Omit<ButtonProps, "asChild"> & {
  isLoading: boolean;
  fallback?: ReactNode;
};

export default function LoadedButton({
  isLoading,
  fallback = <Loader2 className="animate-spin text-white" />,
  children,
  variant = "primary",
  ...props
}: LoadedButtonProps) {
  return (
    <Button variant={variant} disabled={isLoading} {...props}>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, translate: "-50% -50%" }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute left-1/2 top-1/2"
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
