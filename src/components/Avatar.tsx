"use client";
import cn from "@/lib/cn";
import * as RadixAvatar from "@radix-ui/react-avatar";

type AvatarProps = RadixAvatar.AvatarProps & {
  image?: string;
  fallback?: string;
};

export default function Avatar({ image, fallback, className, ...props }: AvatarProps) {
  return (
    <RadixAvatar.Root asChild {...props}>
      <div
        className={cn("grid h-8 w-8 place-items-center overflow-hidden rounded-full bg-gray-300", className)}
      >
        <RadixAvatar.Image src={image} className="max-w-full" />
        <RadixAvatar.AvatarFallback className="text-xs" delayMs={10000}>
          {fallback}
        </RadixAvatar.AvatarFallback>
      </div>
    </RadixAvatar.Root>
  );
}
