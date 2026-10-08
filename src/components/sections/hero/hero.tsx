import { site } from "@/content/site";
import { getDictionary } from "@/i18n/dictionaries";
import { format } from "@/i18n/format";
import { ArrowDown } from "@/components/ui/icons";
import { LocalTime } from "@/components/ui/local-time";
import { HeroBadge } from "./hero-badge";
import { HeroField } from "./hero-field";

/**
 * Splits a word into individually animated letters (decorative layer).
 * The right padding gives back the space the negative letter-spacing takes
 * from the last letter, so the mask doesn't clip it (e.g. the "v" in "Dev").
 */
export function RisingWord({ word, startDelay }: { word: string; startDelay: number }) {
  return (
    <span aria-hidden="true" className="-mb-[0.2em] inline-flex overflow-hidden pr-[0.06em] pb-[0.2em]">
      {[...word].map((letter, i) => (
        <span
          key={i}
          className="anim-rise inline-block"
          style={{ "--delay": `${startDelay + i * 45}ms` } as React.CSSProperties}
        >
          {letter}
        </span>
      ))}
    </span>
  );
}

export const fadeDelay = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

export async function Hero() {
  const dict = await getDictionary();

  return (
    <>
      <section
        id="top"
        aria-label={dict.hero.ariaLabel}
        className="flex min-h-svh shell flex-col pt-[calc(var(--header-height)+2rem)] pb-(--gutter)"
      >
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
