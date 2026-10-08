import { site } from "@/content/site";
import type { Dictionary } from "@/i18n/dictionaries";
import { ArrowUpRight } from "@/components/ui/icons";

const RING_RADIUS = 40; // in viewBox units (0–100)
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

/**
 * Slowly turning circular badge that links to the contact section. The ring
 * text is stretched over the full circumference, so it closes evenly in any
 * language. The ring pauses on hover and stands still with reduced motion.
 */
export function HeroBadge({ dict }: { dict: Dictionary }) {
  const phrase = site.showAvailability
    ? `${dict.site.availability} · ${dict.hero.badge} · `
    : `${dict.hero.badge} · `.repeat(3);

  return (
    <a
      href="#contact"
      aria-label={dict.hero.badge}
      className="anim-pop group relative block aspect-square w-(--hero-badge-size) rounded-full"
      style={{ "--delay": "1300ms" } as React.CSSProperties}
    >
      <svg viewBox="0 0 100 100" aria-hidden="true" className="anim-spin size-full overflow-visible group-hover:[animation-play-state:paused]">
        <defs>
          <path
            id="hero-badge-ring"
            d={`M50,50 m-${RING_RADIUS},0 a${RING_RADIUS},${RING_RADIUS} 0 1,1 ${RING_RADIUS * 2},0 a${RING_RADIUS},${RING_RADIUS} 0 1,1 -${RING_RADIUS * 2},0`}
          />
        </defs>
        <text className="fill-ink font-mono text-[8.5px] tracking-[0.04em] uppercase">
          <textPath href="#hero-badge-ring" textLength={RING_LENGTH} lengthAdjust="spacing">
            {phrase}
          </textPath>
        </text>
      </svg>

      {/* Centre: accent disc with an arrow that turns to point at the contact section. */}
      <span className="absolute inset-[30%] flex items-center justify-center rounded-full bg-accent text-paper transition-[background-color,scale] duration-500 ease-out-expo group-hover:scale-110 group-hover:bg-ink">
        <ArrowUpRight className="size-[38%] rotate-90 transition-transform duration-500 ease-out-expo group-hover:rotate-135" />
      </span>
    </a>
  );
}
