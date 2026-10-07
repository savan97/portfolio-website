"use client";

import { motion, type HTMLMotionProps } from "motion/react";

import { EASE_OUT_EXPO } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & {
  as?: "div" | "li";
  delay?: number;
  /** Vertical travel in px. */
  distance?: number;
};

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({ as = "div", delay = 0, distance = 28, children, ...props }: RevealProps) {
  const Component = (as === "li" ? motion.li : motion.div) as typeof motion.div;

  return (
    <Component
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1, ease: EASE_OUT_EXPO, delay }}
      {...props}
    >
      {children}
    </Component>
  );
}
