import { cn } from "@/lib/cn";

type MarqueeProps = {
  items: readonly string[];
  className?: string;
  /** Full loop duration in seconds. */
  duration?: number;
};

/**
 * Infinite, CSS-only horizontal ticker. The list is rendered twice and
 * translated by -50% for a seamless loop; the copy is hidden from assistive
 * technology. Pauses on hover and stops entirely for reduced motion.
 */
export function Marquee({ items, className, duration = 45 }: MarqueeProps) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-[0.35em]">{item}</span>
          <span aria-hidden="true" className="px-[0.35em] text-accent">
            ✳
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn("group overflow-hidden", className)}>
      <div
        className="anim-marquee flex w-max group-hover:[animation-play-state:paused]"
        style={{ "--duration": `${duration}s` } as React.CSSProperties}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
