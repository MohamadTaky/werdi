"use client";
import cn from "@/lib/cn";
import { Root, Image, AvatarFallback, AvatarProps as RadixAvatarProps } from "@radix-ui/react-avatar";

type AvatarProps = RadixAvatarProps & {
  image?: string;
  fallback?: string;
};

export default function Avatar({ image, fallback, className, ...props }: AvatarProps) {
  return (
    <Root asChild {...props}>
      <div
        className={cn("grid h-8 w-8 place-items-center overflow-hidden rounded-full bg-gray-300", className)}
      >
        <Image src={image} className="max-w-full" />
        <AvatarFallback className="text-xs" delayMs={10000}>
          {fallback}
        </AvatarFallback>
      </div>
    </Root>
  );
}
