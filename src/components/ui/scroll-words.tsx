"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

import { cn } from "@/lib/cn";

export type TextSegment = {
  text: string;
  /** Emphasised segments stay ink-coloured and medium weight. */
  emphasis?: boolean;
};

type ScrollWordsProps = {
  segments: TextSegment[];
  className?: string;
};

type WordToken = { word: string; emphasis: boolean };

function Word({
  token,
  progress,
  range,
  still,
}: {
  token: WordToken;
  progress: MotionValue<number>;
  range: [number, number];
  still: boolean;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span
      style={{ opacity: still ? 1 : opacity }}
      className={cn(token.emphasis && "font-medium")}
    >
      {token.word}
    </motion.span>
  );
}

/**
 * A paragraph that "inks in" word by word as it scrolls through the
 * viewport. With reduced motion the text is shown fully inked.
 */
export function ScrollWords({ segments, className }: ScrollWordsProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });

  const tokens: WordToken[] = segments.flatMap((segment) =>
    segment.text
      .split(" ")
      .filter(Boolean)
      .map((word) => ({ word, emphasis: Boolean(segment.emphasis) })),
  );

  return (
    <p ref={ref} className={className}>
      {tokens.map((token, i) => (
        <span key={i}>
          <Word
            token={token}
            progress={scrollYProgress}
            range={[i / tokens.length, (i + 1) / tokens.length]}
            still={Boolean(reduced)}
          />
          {i < tokens.length - 1 && " "}
        </span>
      ))}
    </p>
  );
}
