import { projects } from "@/content/projects";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { SplitReveal } from "@/components/ui/split-reveal";
import { ProjectCase, type CaseLayout } from "./project-case";

/** Layouts cycle so the rhythm changes from one project to the next. */
const LAYOUT_CYCLE: CaseLayout[] = ["full", "right", "left"];

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="shell pb-(--section-space)">
      <header className="mb-16 grid-shell gap-y-8 border-t border-line pt-6 md:mb-28">
        <SectionLabel index="02" className="col-span-6 text-mute md:col-span-3">
          Selected work
        </SectionLabel>

        <div className="col-span-6 md:col-span-9">
          <div className="flex items-start gap-3">
            <SplitReveal id="work-title" text="Selected Work" className="text-headline" />
            <span
              className="mt-[0.6em] text-label text-mute"
              aria-label={`${projects.length} projects`}
            >
              ({String(projects.length).padStart(2, "0")})
            </span>
          </div>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-[44ch] text-body text-mute">
              A selection of projects across commerce, content and product — built with care from
              the first line of code to the final interaction.
            </p>
          </Reveal>
        </div>
      </header>

      <div className="flex flex-col gap-28 md:gap-(--section-space)">
        {projects.map((project, i) => (
          <ProjectCase
            key={project.slug}
            project={project}
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
