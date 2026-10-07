import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { ArrowDown } from "@/components/ui/icons";
import { LocalTime } from "@/components/ui/local-time";
import { fadeDelay, RisingWord } from "./hero";
import { HeroField } from "./hero-field";

const MOBILE_COLUMNS = 6;
const DESKTOP_COLUMNS = 12;

/** Hairline grid: column edges, two horizontal rules and corner ticks. */
function GridLines() {
  return (
    <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 grid-shell shell">
        {Array.from({ length: DESKTOP_COLUMNS }, (_, i) => (
          <span
            key={i}
            className={cn(
              "anim-line-y relative border-l border-line-faint",
              i >= MOBILE_COLUMNS && "hidden md:block",
              i === MOBILE_COLUMNS - 1 && "max-md:border-r",
              i === DESKTOP_COLUMNS - 1 && "border-r",
            )}
            style={{ "--delay": `${200 + i * 60}ms` } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Horizontal rules framing the name. */}
      <span className="anim-line-x absolute inset-x-0 top-[calc(var(--header-height)+4.5rem)] border-t border-line-faint" />
      <span
        className="anim-line-x absolute inset-x-0 bottom-[calc(var(--gutter)+2.5rem)] border-t border-line-faint"
        style={{ "--delay": "300ms" } as React.CSSProperties}
      />

      {/* Registration marks where the rules meet the outer columns. */}
      {[
        "top-[calc(var(--header-height)+4.5rem)] left-(--gutter) -translate-x-1/2 -translate-y-1/2",
        "top-[calc(var(--header-height)+4.5rem)] right-(--gutter) translate-x-1/2 -translate-y-1/2",
        "bottom-[calc(var(--gutter)+2.5rem)] left-(--gutter) -translate-x-1/2 translate-y-1/2",
        "bottom-[calc(var(--gutter)+2.5rem)] right-(--gutter) translate-x-1/2 translate-y-1/2",
      ].map((position) => (
        <span key={position} className={`anim-fade-in absolute size-2.5 text-mute/50 ${position}`}>
          <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
          <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-current" />
        </span>
      ))}
    </div>
  );
}

/**
 * Variant of `Hero` with a faint construction grid behind the type. The
 * vertical lines sit on the page's own column edges, so the backdrop reads
 * as part of the layout rather than a pattern laid on top.
 */
export function HeroGrid() {
  return (
    <>
      <section
        id="top"
        aria-label="Introduction"
        className="relative isolate flex min-h-svh shell flex-col pt-[calc(var(--header-height)+2rem)] pb-(--gutter)"
      >
        <GridLines />

        {/* Meta row */}
        <div
          className="anim-fade-up grid-shell gap-y-1 text-label text-mute"
          style={fadeDelay(700)}
        >
          <p className="col-span-3">Creative frontend development</p>
          <p className="col-span-3 md:col-span-3">{site.yearsOfExperience} years of experience</p>
          <p className="col-span-6 md:col-span-3 md:col-start-10 md:text-right">
            Local time in {site.location}{" "}
            <LocalTime timeZone={site.timeZone} className="text-ink" />
          </p>
        </div>

        {/* Name + statement */}
        <div className="flex flex-1 flex-col justify-center py-12 md:py-16">
          <div className="relative">
            <h1 className="text-display">
              <span className="sr-only">
                {site.name}, {site.role}
              </span>
              <span className="block">
                <RisingWord word={site.firstName} startDelay={100} />
              </span>
              <span className="flex md:justify-end">
                <RisingWord word={site.heroSuffix} startDelay={300} />
              </span>
            </h1>

            {/* On desktop the statement sits in the open space beside the first name. */}
            <p
              className="anim-fade-up mt-10 max-w-[20ch] text-lead md:absolute md:top-0 md:right-0 md:mt-0 md:w-[calc((100%-var(--gutter)*11)/12*4+var(--gutter)*3)] md:max-w-none md:pt-[1vw] md:text-[clamp(1.25rem,1.8vw,2rem)] md:leading-[1.15]"
              style={fadeDelay(900)}
            >
              I build digital products that feel considered — precise in design, fast in
              engineering, smooth in motion.
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="anim-fade-up grid-shell items-end text-label text-mute"
          style={fadeDelay(1100)}
        >
          <a href="#about" className="col-span-3 flex items-center gap-2 text-ink">
            <ArrowDown className="size-3.5" />
            Scroll to explore
          </a>
          {site.availability && (
            <p className="col-span-3 flex items-center justify-end gap-2 md:col-start-10">
              <span className="anim-pulse size-1.5 rounded-full bg-accent" aria-hidden="true" />
              {site.availability}
            </p>
          )}
        </div>
      </section>

      <div className="pb-(--section-space)">
        <HeroField />
      </div>
    </>
  );
}
