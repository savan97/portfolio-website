"use client";

import { Fragment } from "react";
import { motion, type Variants } from "motion/react";

import { EASE_OUT_EXPO } from "@/lib/motion";

type SplitRevealProps = {
  text: string;
  as?: "h2" | "h3" | "p" | "span";
  className?: string;
  /** Seconds between each word. */
  stagger?: number;
  delay?: number;
  id?: string;
};

const word: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 1.1, ease: EASE_OUT_EXPO } },
};

/**
 * Masked word-by-word reveal for headlines. Words remain plain text,
 * so screen readers and search engines read the sentence normally.
 */
export function SplitReveal({
  text,
  as = "h2",
  className,
  stagger = 0.06,
  delay = 0,
  id,
}: SplitRevealProps) {
  const Tag = motion[as];
  const words = text.split(" ");

  return (
    <Tag
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((w, i) => (
        // The space sits outside the masked inline-block so it is not collapsed.
        <Fragment key={`${w}-${i}`}>
          <span className="-mb-[0.2em] inline-block overflow-hidden pb-[0.2em] align-top">
            <motion.span className="inline-block will-change-transform" variants={word}>
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </Tag>
  );
}
