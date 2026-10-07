import { site } from "@/content/site";
import { Reveal } from "@/components/ui/reveal";
import { ScrollWords, type TextSegment } from "@/components/ui/scroll-words";
import { SectionLabel } from "@/components/ui/section-label";

const intro: TextSegment[] = [
  {
    text: "For more than five years I've been turning ideas into websites and digital products — from",
  },
  { text: "React and Next.js", emphasis: true },
  { text: "applications to" },
  { text: "Shopify", emphasis: true },
  { text: "storefronts," },
  { text: "WordPress", emphasis: true },
  { text: "and" },
  { text: "Webflow", emphasis: true },
  { text: "sites, and" },
  { text: "FlutterFlow", emphasis: true },
  { text: "apps." },
];

const facts = [
  { label: "Discipline", value: site.role },
  { label: "Experience", value: `${site.yearsOfExperience} years` },
  { label: "Based in", value: site.location },
  { label: "Interests", value: "Creative development, UI, motion, performance" },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="shell pb-(--section-space)">
      <div className="grid-shell gap-y-10">
        <div className="col-span-6 md:col-span-3">
          <SectionLabel index="01" className="text-mute md:sticky md:top-24">
            <span id="about-title">About</span>
          </SectionLabel>
        </div>

        <div className="col-span-6 md:col-span-9">
          <ScrollWords
            segments={intro}
            className="text-[clamp(1.75rem,3.6vw,3.75rem)] leading-[1.06] font-normal tracking-[-0.035em]"
          />

          <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-9 md:gap-(--gutter)">
            <Reveal className="text-body text-mute md:col-span-4">
              <p>
                I work in the layer where design meets code: typography that holds up at every size,
                interactions that feel natural, and performance nobody has to think about. Most of
                what I build connects to real data through{" "}
                <span className="text-ink">REST APIs</span>.
              </p>
            </Reveal>
            <Reveal className="text-body text-mute md:col-span-4 md:col-start-6" delay={0.1}>
              <p>
                Today my workflow includes{" "}
                <span className="text-ink">AI-assisted development with Claude Code</span> — a
                faster way to explore and iterate, without ever handing over the engineering
                judgment.
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
