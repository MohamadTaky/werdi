"use client";
import {
  DialogProps as RadixDialogProps,
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Close,
  Title,
  Description,
} from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { ReactNode } from "react";
import Button from "./Button";

type DialogProps = RadixDialogProps & {
  trigger: ReactNode;
  title?: string;
  description?: string;
  locked?: boolean;
};

export default function Dialog({
  trigger,
  title,
  description,
  open,
  locked = false,
  onOpenChange,
  children,
  ...props
}: DialogProps) {
  return (
    <Root open={open} onOpenChange={onOpenChange} {...props}>
      <Trigger asChild>{trigger}</Trigger>
      <AnimatePresence>
        {open && (
          <Portal forceMount>
            <Overlay asChild>
              <motion.div
                className="absolute inset-0 z-50 grid place-items-center bg-black bg-opacity-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Content
                  onEscapeKeyDown={(e) => locked && e.preventDefault()}
                  onPointerDownOutside={(e) => locked && e.preventDefault()}
                  asChild
                >
                  <motion.div
                    className="relative min-w-[90%] rounded-md bg-white p-4 shadow-xl md:min-w-[500px]"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.9 }}
                  >
                    <Close
                      onClick={() => onOpenChange?.(false)}
                      className="absolute left-4 top-4 z-10 text-gray-500"
                      asChild
                    >
                      <Button shape="circle" variant="ghost">
                        <X size="16" strokeWidth="3" />
                      </Button>
                    </Close>
                    {title && <Title className="mb-2 text-2xl font-bold">{title}</Title>}
                    {description && (
                      <Description className="mb-2 font-semibold text-gray-500">{description}</Description>
                    )}
                    {children}
                  </motion.div>
                </Content>
              </motion.div>
            </Overlay>
          </Portal>
        )}
      </AnimatePresence>
    </Root>
  );
}
