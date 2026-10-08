import { site } from "@/content/site";
import { getDictionary } from "@/i18n/dictionaries";
import { format } from "@/i18n/format";
import { cn } from "@/lib/cn";
import { ArrowDown } from "@/components/ui/icons";
import { LocalTime } from "@/components/ui/local-time";
import { fadeDelay, RisingWord } from "./hero";
import { HeroBadge } from "./hero-badge";
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
export async function HeroGrid() {
  const dict = await getDictionary();

  return (
    <>
      <section
        id="top"
        aria-label={dict.hero.ariaLabel}
        className="relative isolate flex min-h-svh shell flex-col pt-[calc(var(--header-height)+2rem)] pb-(--gutter)"
      >
        <GridLines />

        {/* Meta row */}
        <div
          className="anim-fade-up grid-shell gap-y-1 text-label text-mute"
          style={fadeDelay(700)}
        >
          <p className="col-span-3">{dict.hero.tagline}</p>
          <p className="col-span-3 md:col-span-3">
            {format(dict.hero.experience, { years: site.yearsOfExperience })}
          </p>
          <p className="col-span-6 md:col-span-3 md:col-start-10 md:text-right">
            {format(dict.hero.localTime, { location: dict.site.location })}{" "}
            <LocalTime timeZone={site.timeZone} className="text-ink" />
          </p>
        </div>

        {/* Name + statement */}
        <div className="flex flex-1 flex-col justify-center py-12 md:py-16">
          <div className="relative">
            <div className="relative">
              <h1 className="text-display">
                <span className="sr-only">
                  {site.name}, {dict.site.role}
                </span>
                <span className="block">
                  <RisingWord word={site.firstName} startDelay={100} />
                </span>
                <span className="flex md:justify-end">
                  <RisingWord word={site.heroSuffix} startDelay={300} />
                </span>
              </h1>

              {/*
                Badge between the two words (beside "Dev" on phones). On desktop the
                position is in `em` of the display type, so it tracks the words as
                they scale: centred horizontally just right of the middle, and
                vertically on the seam between the two lines.
              */}
              <div className="absolute right-0 bottom-0 md:right-auto md:bottom-[calc(0.76em-var(--hero-badge-size)/2)] md:left-[calc(50%+0.39em-var(--hero-badge-size)/2)] md:text-display">
                <HeroBadge dict={dict} />
              </div>
            </div>

            {/* On desktop the statement sits in the open space beside the first name. */}
            <p
              className="anim-fade-up mt-10 max-w-[20ch] text-lead md:absolute md:top-0 md:right-0 md:mt-0 md:w-[calc((100%-var(--gutter)*11)/12*4+var(--gutter)*3)] md:max-w-none md:pt-[1vw] md:text-[clamp(1.25rem,1.8vw,2rem)] md:leading-[1.15]"
              style={fadeDelay(900)}
            >
              {dict.hero.statement}
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
            {dict.hero.scroll}
          </a>
          {site.showAvailability && (
            <p className="col-span-3 flex items-center justify-end gap-2 md:col-start-10">
              <span className="anim-pulse size-1.5 rounded-full bg-accent" aria-hidden="true" />
              {dict.site.availability}
            </p>
          )}
        </div>
      </section>

      <div className="pb-(--section-space)">
        <HeroField dict={dict.hero.field} />
      </div>
    </>
  );
}
