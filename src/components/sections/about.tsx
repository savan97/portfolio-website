import { site } from "@/content/site";
import { getDictionary } from "@/i18n/dictionaries";
import { format } from "@/i18n/format";
import { Reveal } from "@/components/ui/reveal";
import { ScrollWords } from "@/components/ui/scroll-words";
import { SectionLabel } from "@/components/ui/section-label";

export async function About() {
  const dict = await getDictionary();
  const { facts: labels } = dict.about;
  const facts = [
    { label: labels.discipline, value: dict.site.role },
    {
      label: labels.experience,
      value: format(labels.experienceValue, { years: site.yearsOfExperience }),
    },
    { label: labels.basedIn, value: dict.site.location },
    { label: labels.interests, value: labels.interestsValue },
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="shell pb-(--section-space)">
      <div className="grid-shell gap-y-10">
        <div className="col-span-6 md:col-span-3">
          <SectionLabel index="01" className="text-mute md:sticky md:top-24">
            <span id="about-title">{dict.about.label}</span>
          </SectionLabel>
        </div>

        <div className="col-span-6 md:col-span-9">
          <ScrollWords
            segments={dict.about.intro}
            className="text-[clamp(1.75rem,3.6vw,3.75rem)] leading-[1.06] font-normal tracking-[-0.035em]"
          />

          <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-9 md:gap-(--gutter)">
            <Reveal className="text-body text-mute md:col-span-4">
              <p>
                {dict.about.craft.before}{" "}
                <span className="text-ink">{dict.about.craft.highlight}</span>
                {dict.about.craft.after}
              </p>
            </Reveal>
            <Reveal className="text-body text-mute md:col-span-4 md:col-start-6" delay={0.1}>
              <p>
                {dict.about.workflow.before}{" "}
                <span className="text-ink">{dict.about.workflow.highlight}</span>{" "}
                {dict.about.workflow.after}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <dl className="mt-16 grid grid-cols-2 border-t border-line md:mt-24 md:grid-cols-4">
              {facts.map((fact) => (
                <div key={fact.label} className="border-b border-line py-5 pr-4 md:border-b-0">
                  <dt className="text-label text-mute">{fact.label}</dt>
                  <dd className="mt-2 text-[0.9375rem] leading-snug font-medium tracking-tight">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
