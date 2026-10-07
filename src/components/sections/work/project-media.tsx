"use client";

import { useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";

import { EASE_IN_OUT_QUART, EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/cn";

type ProjectMediaProps = {
  src: StaticImageData;
  alt: string;
  /** `sizes` attribute for responsive image loading. */
  sizes: string;
  className?: string;
  /** Show the floating "View" label on hover. */
  cursorLabel?: string;
};

const follow = { stiffness: 260, damping: 26, mass: 0.5 };

const mask: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.4, ease: EASE_IN_OUT_QUART },
  },
};

const zoom: Variants = {
  hidden: { scale: 1.2 },
  visible: { scale: 1, transition: { duration: 1.8, ease: EASE_OUT_EXPO } },
};

/**
 * Project image with a masked reveal, gentle scroll parallax, hover zoom and
 * a cursor-following label. All motion is skipped for reduced motion; the
 * cursor label only appears for mouse pointers.
 */
export function ProjectMedia({
  src,
  alt,
  sizes,
  className,
  cursorLabel = "View",
}: ProjectMediaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [hovering, setHovering] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const parallax = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const x = useSpring(useMotionValue(0), follow);
  const y = useSpring(useMotionValue(0), follow);

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
    if (!hovering) {
      // Jump to the entry point instead of springing in from the corner.
      x.jump(event.clientX - rect.left);
      y.jump(event.clientY - rect.top);
      setHovering(true);
    }
  }

  // The observed outer element is never clipped: Chrome's IntersectionObserver
  // treats a fully clipped target as not intersecting, so the reveal would
  // never start. The mask and zoom run on children via variants instead.
  return (
    <motion.div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      onPointerMove={handleMove}
      onPointerLeave={() => setHovering(false)}
    >
      <motion.div className="absolute inset-0 overflow-hidden bg-paper-deep" variants={mask}>
        <motion.div
          className="absolute inset-x-0 top-[-7%] h-[114%]"
          style={{ y: reduced ? 0 : parallax }}
        >
          <div className="size-full transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.04]">
            <motion.div className="relative size-full" variants={zoom}>
              <Image
                src={src}
                alt={alt}
                fill
                sizes={sizes}
                placeholder="blur"
                className="object-cover"
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {cursorLabel && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 z-10 hidden size-22 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-label text-ink [@media(pointer:fine)]:flex"
          style={{ x, y }}
          initial={false}
          animate={{ scale: hovering ? 1 : 0, opacity: hovering ? 1 : 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
        >
          {cursorLabel}
        </motion.span>
      )}
    </motion.div>
  );
}
