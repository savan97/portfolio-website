import type { Project } from "@/content/projects";
import { ArrowUpRight } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";
import { ProjectMedia } from "./project-media";

export type CaseLayout = "full" | "right" | "left";

type ProjectCaseProps = {
  project: Project;
  index: number;
  layout: CaseLayout;
};

/** Grid placement for media and details in each layout. */
const layouts: Record<
  CaseLayout,
  { media: string; details: string; aspect: string; sizes: string }
> = {
  full: {
    media: "col-span-6 md:col-span-12",
    details: "col-span-6 md:col-span-12",
    aspect: "aspect-[4/5] md:aspect-[16/8]",
    sizes: "100vw",
  },
  right: {
    media: "col-span-6 md:col-span-6 md:col-start-7 md:row-start-1",
    details: "col-span-6 md:col-span-4 md:col-start-1 md:row-start-1 md:self-end",
    aspect: "aspect-[4/5]",
    sizes: "(min-width: 48rem) 50vw, 100vw",
  },
  left: {
    media: "col-span-6 md:col-span-8 md:col-start-1",
    details: "col-span-6 md:col-span-3 md:col-start-10 md:self-end",
    aspect: "aspect-[4/5] md:aspect-[4/3]",
    sizes: "(min-width: 48rem) 66vw, 100vw",
  },
};

function MetaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[6rem_1fr] gap-4 border-t border-line py-3">
      <dt className="text-label text-mute">{label}</dt>
      <dd className="text-[0.9375rem] leading-snug">{children}</dd>
    </div>
  );
}

/** One editorial case-study block in the Selected Work section. */
export function ProjectCase({ project, index, layout }: ProjectCaseProps) {
  const config = layouts[layout];
  const number = String(index + 1).padStart(2, "0");
  const titleId = `project-${project.slug}`;
  const isFull = layout === "full";

  const media = (
    <ProjectMedia
      src={project.image.src}
      alt={project.image.alt}
      sizes={config.sizes}
      className={cn(config.aspect, "w-full")}
      cursorLabel={project.href ? "View" : undefined}
    />
  );

  return (
    <article aria-labelledby={titleId} className="group grid-shell gap-y-8">
      <div className={config.media}>
        {project.href ? (
          // Duplicate of the CTA link below, so it is skipped by keyboard and screen readers.
          <a href={project.href} tabIndex={-1} aria-hidden="true" className="block">
            {media}
          </a>
        ) : (
          media
        )}
      </div>

      <div className={cn(config.details, isFull && "grid-shell md:gap-y-0")}>
        <Reveal className={cn(isFull && "col-span-6 md:col-span-7")}>
          <p className="flex items-center gap-3 text-label text-mute">
            <span>{number}</span>
            <span className="h-px w-8 bg-line" aria-hidden="true" />
            <span>{project.stack[0]}</span>
            {project.isPlaceholder && (
              <span className="rounded-full border border-line px-2 py-0.5 text-[0.625rem]">
                Sample
              </span>
            )}
          </p>
          <h3 id={titleId} className="mt-4 text-title">
            {project.title}
          </h3>
        </Reveal>

        <Reveal
          delay={0.1}
          className={cn(
            "mt-6",
            isFull && "col-span-6 md:col-span-4 md:col-start-9 md:mt-0 md:pt-2",
          )}
        >
          <p className="max-w-[42ch] text-body text-mute">{project.summary}</p>

          <dl className="mt-6 border-b border-line">
            <MetaRow label="Role">{project.role}</MetaRow>
            <MetaRow label="Stack">{project.stack.join(", ")}</MetaRow>
            <MetaRow label="Year">{project.year}</MetaRow>
          </dl>

          {project.href && (
            <a
              href={project.href}
              className="mt-6 inline-flex items-center gap-2 text-[0.9375rem] font-medium"
            >
              <span className="link-underline link-underline-static pb-0.5">View project</span>
              <ArrowUpRight className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span className="sr-only">: {project.title}</span>
            </a>
          )}
        </Reveal>
      </div>
    </article>
  );
}
