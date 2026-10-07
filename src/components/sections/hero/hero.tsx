import { site } from "@/content/site";
import { ArrowDown } from "@/components/ui/icons";
import { LocalTime } from "@/components/ui/local-time";
import { HeroField } from "./hero-field";

/** Splits a word into individually animated letters (decorative layer). */
export function RisingWord({ word, startDelay }: { word: string; startDelay: number }) {
  return (
    <span aria-hidden="true" className="-mb-[0.2em] inline-flex overflow-hidden pb-[0.2em]">
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

export function Hero() {
  return (
    <>
      <section
        id="top"
        aria-label="Introduction"
        className="flex min-h-svh shell flex-col pt-[calc(var(--header-height)+2rem)] pb-(--gutter)"
      >
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
