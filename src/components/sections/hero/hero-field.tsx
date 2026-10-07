"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import type { Dictionary } from "@/i18n/dictionaries";

const SPACING = 24; // px between dots
const RADIUS = 220; // px — size of the pointer "lens"
const INK = "238, 235, 228";
const ACCENT = "224, 74, 30";

/**
 * Hero artwork: a precise dot grid that swells and parts around the
 * pointer, like a lens moving over a sheet of graph paper. When there is no
 * pointer, a slow "ghost" drifts across so the piece never looks static.
 *
 * Rendered to a single <canvas>; paused when off-screen. With reduced
 * motion, a single still frame is drawn.
 */
export function HeroField({ dict }: { dict: Dictionary["hero"]["field"] }) {
  const figureRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Scroll-linked "opening" of the frame as it enters the viewport.
  const { scrollYProgress } = useScroll({
    target: figureRef,
    offset: ["start end", "start 0.25"],
  });
  const inset = useTransform(scrollYProgress, [0, 1], [6, 0]);
  const clipPath = useTransform(inset, (v) => `inset(0 ${v}% round ${v * 0.12}rem)`);

  useEffect(() => {
    const canvas = canvasRef.current;
    const figure = figureRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !figure || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = false;
    let pointerActive = false;
    const target = { x: 0, y: 0 };
    const lens = { x: 0, y: 0 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!pointerActive) {
        lens.x = target.x = width * 0.68;
        lens.y = target.y = height * 0.36;
      }
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;
      const offsetX = (width - (cols - 1) * SPACING) / 2;
      const offsetY = (height - (rows - 1) * SPACING) / 2;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const baseX = offsetX + col * SPACING;
          const baseY = offsetY + row * SPACING;
          const dx = baseX - lens.x;
          const dy = baseY - lens.y;
          const distance = Math.hypot(dx, dy);
          const force = Math.max(0, 1 - distance / RADIUS);
          const eased = force * force * (3 - 2 * force); // smoothstep

          // Push dots outward from the lens centre.
          const push = eased * 18;
          const x = baseX + (distance ? (dx / distance) * push : 0);
          const y = baseY + (distance ? (dy / distance) * push : 0);
          const size = 0.9 + eased * 2.6;

          // A thin ring at the edge of the lens picks up the accent colour.
          const ring = Math.abs(distance - RADIUS * 0.55) < SPACING * 0.5;
          ctx.fillStyle = ring
            ? `rgba(${ACCENT}, ${0.35 + eased * 0.65})`
            : `rgba(${INK}, ${0.16 + eased * 0.84})`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const tick = (time: number) => {
      if (!pointerActive) {
        // Slow lissajous drift while idle.
        // Kept to the upper area so it never drifts under the caption.
        target.x = width * (0.55 + 0.28 * Math.sin(time / 5200));
        target.y = height * (0.36 + 0.16 * Math.sin(time / 3700));
      }
      lens.x += (target.x - lens.x) * 0.08;
      lens.y += (target.y - lens.y) * 0.08;
      draw();
      frame = visible ? requestAnimationFrame(tick) : 0;
    };

    const start = () => {
      if (!reduced && visible && !frame) frame = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerActive = true;
      target.x = event.clientX - rect.left;
      target.y = event.clientY - rect.top;
    };
    const onPointerLeave = () => {
      pointerActive = false;
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    intersectionObserver.observe(figure);

    if (!reduced) {
      figure.addEventListener("pointermove", onPointerMove);
      figure.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      figure.removeEventListener("pointermove", onPointerMove);
      figure.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <motion.figure
      ref={figureRef}
      style={{ clipPath }}
      className="relative h-[78svh] min-h-[28rem] w-full overflow-hidden bg-ink text-paper md:h-[92svh]"
    >
      <canvas ref={canvasRef} className="absolute inset-0 size-full" aria-hidden="true" />

      <div className="pointer-events-none absolute inset-0 flex shell flex-col justify-between py-(--gutter)">
        <div className="flex justify-between text-label text-mute-dark">
          <span>{dict.figure}</span>
          <span>{dict.caption}</span>
        </div>

        <figcaption className="grid-shell items-end">
          <p className="col-span-6 max-w-[12ch] text-title md:col-span-7">{dict.title}</p>
          <p className="col-span-6 mt-6 max-w-[34ch] text-body text-mute-dark md:col-span-4 md:col-start-9 md:mt-0">
            {dict.description}
          </p>
        </figcaption>
      </div>
    </motion.figure>
  );
}
