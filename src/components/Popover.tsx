import * as RadixPopover from "@radix-ui/react-popover";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

type Props = RadixPopover.PopoverProps & {
  trigger: ReactNode;
  locked?: boolean;
};

export default function Popover({ trigger, children, locked, open, ...props }: Props) {
  return (
    <RadixPopover.Root open={open} {...props}>
      <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
      <AnimatePresence>
        {open && (
          <RadixPopover.Portal forceMount>
            <RadixPopover.Content
              onEscapeKeyDown={(e) => locked && e.preventDefault()}
              onPointerDownOutside={(e) => locked && e.preventDefault()}
              sideOffset={10}
              asChild
            >
              <motion.div
                className="relative origin-bottom rounded-md border bg-white p-4"
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0, scaleY: 0 }}
              >
                {children}
                <RadixPopover.Arrow className="fill-gray-300" width="20" height="10" />
              </motion.div>
            </RadixPopover.Content>
          </RadixPopover.Portal>
        )}
      </AnimatePresence>
    </RadixPopover.Root>
  );
}
