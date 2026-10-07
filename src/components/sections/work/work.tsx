import { projects } from "@/content/projects";
import { getDictionary } from "@/i18n/dictionaries";
import { format } from "@/i18n/format";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { SplitReveal } from "@/components/ui/split-reveal";
import { ProjectCase, type CaseLayout } from "./project-case";

/** Layouts cycle so the rhythm changes from one project to the next. */
const LAYOUT_CYCLE: CaseLayout[] = ["full", "right", "left"];

export async function Work() {
  const { work: dict } = await getDictionary();

  return (
    <section id="work" aria-labelledby="work-title" className="shell pb-(--section-space)">
      <header className="mb-16 grid-shell gap-y-8 border-t border-line pt-6 md:mb-28">
        <SectionLabel index="02" className="col-span-6 text-mute md:col-span-3">
          {dict.label}
        </SectionLabel>

        <div className="col-span-6 md:col-span-9">
          <div className="flex items-start gap-3">
            <SplitReveal id="work-title" text={dict.title} className="text-headline" />
            <span
              className="mt-[0.6em] text-label text-mute"
              aria-label={format(dict.count, { count: projects.length })}
            >
              ({String(projects.length).padStart(2, "0")})
            </span>
          </div>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-[44ch] text-body text-mute">{dict.intro}</p>
          </Reveal>
        </div>
      </header>

      <div className="flex flex-col gap-28 md:gap-(--section-space)">
        {projects.map((project, i) => (
          <ProjectCase
            key={project.slug}
            project={project}
            dict={dict}
            index={i}
            layout={
              i === projects.length - 1 && projects.length > 1
                ? "full"
                : LAYOUT_CYCLE[i % LAYOUT_CYCLE.length]
            }
          />
        ))}
      </div>
    </section>
  );
}
