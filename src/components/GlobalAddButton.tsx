import { forwardRef } from "react";
import Button from "./Button";
import { Plus } from "lucide-react";

function GlobalAddButton({ ...props }: {}, ref: React.ForwardedRef<HTMLButtonElement>) {
  return (
    <Button
      ref={ref}
      type="button"
      shape="circle"
      className="fixed bottom-4 left-1/2 z-10 -translate-x-1/2 p-2"
      {...props}
    >
      <Plus size="28" />
    </Button>
  );
}

export default forwardRef(GlobalAddButton);
