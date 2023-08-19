import {
  Root,
  AlertDialogProps as RadixAlertDialogProps,
  Trigger,
  Portal,
  Overlay,
  Content,
  Title,
  Description,
  Action,
  Cancel,
} from "@radix-ui/react-alert-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import Button from "./Button";

type AlertDialogProps = RadixAlertDialogProps & {
  trigger: ReactNode;
  action: ReactNode;
  cancel?: ReactNode;
  title?: string;
  description?: string;
  locked?: boolean;
};

export default function AlertDialog({
  trigger,
  title = "هل أنت متأكد ؟",
  description,
  cancel = <Button variant="outline">إلغاء</Button>,
  action,
  open,
  locked,
  ...props
}: AlertDialogProps) {
  return (
    <Root open={open} {...props}>
      <Trigger asChild>{trigger}</Trigger>
      <AnimatePresence>
        {open && (
          <Portal forceMount>
            <Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50 grid place-items-center bg-black/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Content onEscapeKeyDown={(e) => locked && e.preventDefault()} asChild>
                  <motion.div
                    className="relative min-w-[90%] rounded-md bg-white p-4 shadow-xl md:min-w-[500px]"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.9 }}
                  >
                    <fieldset disabled={locked} className="space-y-4 transition disabled:opacity-50">
                      {title && <Title className="text-2xl font-bold">{title}</Title>}
                      {description && <Description>{description}</Description>}
                      <div className="flex items-center gap-3">
                        <Action onClick={(e) => e.preventDefault()} asChild>
                          {action}
                        </Action>
                        <Cancel asChild>{cancel}</Cancel>
                      </div>
                    </fieldset>
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
