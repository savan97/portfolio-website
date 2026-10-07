"use client";

import { MotionConfig } from "motion/react";

/** Applies the user's reduced-motion preference to every Motion component. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
