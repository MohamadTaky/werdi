"use client";
import { Plus } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import { DialogProps } from "@radix-ui/react-dialog";

interface Props extends DialogProps {
  title: string;
  locked?: boolean;
}

export default function Modal({ title, locked, children, ...props }: Props) {
  return (
    <Dialog modal {...props}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="fixed bottom-3 left-1/2 z-10 h-12 w-12 -translate-x-1/2 rounded-full p-0"
        >
          <Plus size="28" weight="bold" />
        </Button>
      </DialogTrigger>
      <DialogContent
        onEscapeKeyDown={(e) => locked && e.preventDefault()}
        onPointerDownOutside={(e) => locked && e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
