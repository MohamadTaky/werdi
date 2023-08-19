import cn from "@/lib/cn";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

const buttonVariants = cva(
  "relative flex w-fit items-center text-sm ring-offset-2 transition focus:outline-none focus:ring-2 disabled:pointer-events-none disabled:opacity-70 md:text-base",
  {
    variants: {
      variant: {
        primary: "bg-black text-white",
        secondary: "bg-gray-500 text-white hover:bg-gray-600 focus:bg-gray-600 active:bg-gray-700",
        outline: "border-2 border-gray-800",
        ghost: "bg-transparent hover:bg-gray-300 focus:bg-gray-300 active:bg-gray-400",
        danger: "bg-red-500 text-white hover:bg-red-600 focus:bg-red-600 active:bg-red-700",
        warning: "bg-yellow-500 text-white hover:bg-yellow-600 focus:bg-yellow-600 active:bg-yellow-700",
      },
      shape: {
        box: "gap-1 rounded-none px-2 py-1 md:gap-1.5 md:px-3 md:py-1.5",
        circle: "aspect-square rounded-full p-2",
        rounded: "gap-1 rounded-md px-2 py-1 md:gap-1.5 md:px-3 md:py-1.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      shape: "rounded",
    },
  }
);

function Button(
  { className, variant, shape, asChild, ...props }: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  className = cn(buttonVariants({ variant, shape, className }));
  return asChild ? (
    <Slot ref={ref} className={className} {...props} />
  ) : (
    <button ref={ref} type="button" className={className} {...props} />
  );
}

export default forwardRef(Button);
