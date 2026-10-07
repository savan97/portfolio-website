import { site } from "@/content/site";
import { getDictionary } from "@/i18n/dictionaries";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { cn } from "@/lib/cn";

type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  summary: string;
  /** Optional highlights, rendered as a short list. */
  highlights?: string[];
  isPlaceholder?: boolean;
};

/**
 * Professional experience, newest first — edit it in the dictionaries
 * (`experience.entries`).
 *
 * TODO: every entry is a PLACEHOLDER. Replace with real roles — company,
 * role, period and a short summary — and remove `isPlaceholder`.
 * Do not add achievements or metrics that cannot be verified.
 */
export async function Experience() {
  const dict = await getDictionary();
  const experience: ExperienceEntry[] = dict.experience.entries;

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="shell py-(--section-space)"
    >
      <div className="grid-shell gap-y-12">
        <div className="col-span-6 md:col-span-5">
          <SectionLabel index="05" className="text-mute">
            <span id="experience-title">{dict.experience.label}</span>
          </SectionLabel>

          <Reveal className="mt-8 md:sticky md:top-24">
            <p className="flex items-start leading-[0.78] font-medium tracking-[-0.07em]">
              <span className="text-[clamp(9rem,26vw,24rem)]">
                {site.yearsOfExperience.replace("+", "")}
              </span>
              <span
                className="mt-[0.1em] text-[clamp(4rem,11vw,10rem)] text-accent"
                aria-hidden="true"
              >
                +
              </span>
            </p>
            <p className="mt-6 max-w-[14ch] text-lead">{dict.experience.years}</p>
          </Reveal>
        </div>

        <ol className="col-span-6 self-end border-t border-line md:col-span-7 md:col-start-6">
          {experience.map((entry, i) => (
            <Reveal
              key={`${entry.company}-${i}`}
              as="li"
              delay={i * 0.06}
              className={cn(
                "grid grid-cols-6 gap-x-(--gutter) gap-y-3 border-b border-line py-7 md:grid-cols-7 md:py-9",
                entry.isPlaceholder && "text-mute",
              )}
            >
              <p className="col-span-6 pt-1.5 text-label md:col-span-2">{entry.period}</p>
              <div className="col-span-6 md:col-span-5">
                <h3 className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[clamp(1.5rem,2.4vw,2.25rem)] leading-tight font-medium tracking-[-0.035em]">
                  {entry.role}
                  <span className="text-mute">— {entry.company}</span>
                  {entry.isPlaceholder && (
                    <span className="rounded-full border border-line px-2 py-0.5 text-label text-[0.625rem] tracking-normal">
                      {dict.common.placeholder}
                    </span>
                  )}
                </h3>
                <p className="mt-3 max-w-[48ch] text-body">{entry.summary}</p>
                {entry.highlights && entry.highlights.length > 0 && (
                  <ul className="mt-4 list-['—_'] pl-5 text-body">
                    {entry.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
