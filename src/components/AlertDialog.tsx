import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import Button from "./Button";

type AlertDialogProps = RadixAlertDialog.AlertDialogProps & {
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
    <RadixAlertDialog.Root open={open} {...props}>
      <RadixAlertDialog.Trigger asChild>{trigger}</RadixAlertDialog.Trigger>
      <AnimatePresence>
        {open && (
          <RadixAlertDialog.Portal forceMount>
            <RadixAlertDialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50 grid place-items-center bg-black/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <RadixAlertDialog.Content onEscapeKeyDown={(e) => locked && e.preventDefault()} asChild>
                  <motion.div
                    className="relative min-w-[90%] rounded-md bg-white p-4 shadow-xl md:min-w-[500px]"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.9 }}
                  >
                    <fieldset
                      disabled={locked}
                      className="space-y-4 transition disabled:opacity-50"
                    >
                      {title && (
                        <RadixAlertDialog.Title className="text-2xl font-bold">
                          {title}
                        </RadixAlertDialog.Title>
                      )}
                      {description && (
                        <RadixAlertDialog.Description>{description}</RadixAlertDialog.Description>
                      )}
                      <div className="flex items-center gap-3">
                        <RadixAlertDialog.Action onClick={(e) => e.preventDefault()} asChild>
                          {action}
                        </RadixAlertDialog.Action>
                        <RadixAlertDialog.Cancel asChild>{cancel}</RadixAlertDialog.Cancel>
                      </div>
                    </fieldset>
                  </motion.div>
                </RadixAlertDialog.Content>
              </motion.div>
            </RadixAlertDialog.Overlay>
          </RadixAlertDialog.Portal>
        )}
      </AnimatePresence>
    </RadixAlertDialog.Root>
  );
}
