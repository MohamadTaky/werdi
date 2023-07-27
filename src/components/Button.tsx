import { forwardRef, ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { Slot } from "@radix-ui/react-slot";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  asChild?: boolean;
};

const variants = {
  primary: "bg-black text-white",
  secondary: "bg-gray-500 text-white hover:bg-gray-600 focus:bg-gray-600 active:bg-gray-700",
  outline: "border-gray-800 border-2",
  ghost: "bg-transparent rounded-none",
  danger: "bg-red-500 text-white hover:bg-red-600 focus:bg-red-600 active:bg-red-700",
  warning: "bg-yellow-500 text-white hover:bg-yellow-600 focus:bg-yellow-600 active:bg-yellow-700",
};

const Button = forwardRef(
  (
    { children, className, variant = "primary", asChild, ...props }: ButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement>
  ) => {
    className = twMerge(
      "relative transition focus:ring-2 ring-offset-2 flex w-fit items-center gap-1.5 focus:outline-none rounded-md px-3 py-1.5 text-sm disabled:pointer-events-none disabled:opacity-70 md:text-base",
      variants[variant],
      className
    );
  return asChild ? (
      <Slot ref={ref} className={className} {...props}>
        {children}
      </Slot>
    ) : (
      <button type="button" className={className} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
export default Button;
