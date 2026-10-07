import { workflowLoop, workflowUses } from "@/content/workflow";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { SplitReveal } from "@/components/ui/split-reveal";

/** The intent → draft → review loop, showing who owns each step. */
function WorkflowLoop() {
  return (
    <ol
      className="grid grid-cols-3 border-y border-line-dark"
      aria-label="How a change moves through my workflow"
    >
      {workflowLoop.map((step, i) => {
        const isAI = step.owner !== "Me";
        return (
          <li
            key={step.label}
            className="relative border-l border-line-dark py-5 pl-4 first:border-l-0 first:pl-0 md:py-7 md:pl-6"
          >
            <span className="block text-label text-mute-dark">
              {String(i + 1).padStart(2, "0")} — {step.owner}
            </span>
            <span className="mt-3 flex items-center gap-2 text-[clamp(1.125rem,2.2vw,2rem)] leading-tight font-medium tracking-[-0.03em]">
              {isAI && (
                <span className="size-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              )}
              {step.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export function Workflow() {
  return (
    <section
      id="workflow"
      aria-labelledby="workflow-title"
      className="bg-ink py-(--section-space) text-paper selection:bg-paper selection:text-ink"
    >
      <div className="shell">
        <div className="grid-shell gap-y-10">
          <SectionLabel index="04" className="col-span-6 text-mute-dark md:col-span-3">
            Modern workflow
          </SectionLabel>

          <div className="col-span-6 md:col-span-9">
            <h2 id="workflow-title" className="text-headline">
              <SplitReveal
                as="span"
                text="AI doesn't replace engineering judgment."
                className="block"
              />
              <SplitReveal
                as="span"
                text="It sharpens the workflow around it."
                className="block text-mute-dark"
                delay={0.25}
              />
            </h2>
          </div>
        </div>

        <div className="mt-16 grid-shell gap-y-12 md:mt-28">
          <Reveal className="col-span-6 md:col-span-4 md:col-start-4">
            <p className="text-body text-mute-dark">
              <span className="text-paper">Claude Code</span> is part of my daily workflow. It helps
              me move quickly through the parts of a project that benefit from speed — while
              architecture, code quality and every final decision stay with me. Nothing ships that I
              haven&apos;t read, understood and would put my name on.
            </p>
          </Reveal>

          <Reveal className="col-span-6 md:col-span-5 md:col-start-8 md:self-end" delay={0.1}>
            <WorkflowLoop />
          </Reveal>
        </div>

        <ul className="mt-20 grid gap-x-(--gutter) md:mt-32 md:grid-cols-3">
          {workflowUses.map((use, i) => (
            <Reveal
              key={use.title}
              as="li"
              delay={(i % 3) * 0.08}
              className="border-t border-line-dark pt-5 pb-10 md:pb-16"
            >
              <span className="text-label text-mute-dark">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 text-[clamp(1.5rem,2.4vw,2.25rem)] leading-tight font-medium tracking-[-0.035em]">
                {use.title}
              </h3>
              <p className="mt-3 max-w-[36ch] text-body text-mute-dark">{use.description}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
