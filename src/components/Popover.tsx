import { Root, Trigger, Portal, Content, Arrow, PopoverProps } from "@radix-ui/react-popover";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, ReactNode, SetStateAction } from "react";

type Props = PopoverProps & {
  trigger: ReactNode;
  locked?: boolean;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

export default function Popover({ trigger, children, locked, open, ...props }: Props) {
  return (
    <Root open={open} {...props}>
      <Trigger asChild>{trigger}</Trigger>
      <AnimatePresence>
        {open && (
          <Portal forceMount>
            <Content
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
                <Arrow className="fill-gray-300" width="20" height="10" />
              </motion.div>
            </Content>
          </Portal>
        )}
      </AnimatePresence>
    </Root>
  );
}
