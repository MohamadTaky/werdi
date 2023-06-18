"use client";

import { motion, MotionProps } from "framer-motion";
import {} from "framer-motion";
import { ForwardedRef, forwardRef } from "react";
import { Icon, IconProps } from "@phosphor-icons/react";

type Props = MotionProps &
  IconProps & {
    Icon: Icon;
  };

export default function MotionIcon({ Icon, ...props }: Props) {
  const Component = forwardRef((props, ref: ForwardedRef<SVGSVGElement>) => {
    return <Icon ref={ref} {...props} />;
  });
  const MotionComponent = motion(Component);
  return <MotionComponent {...props} />;
}
