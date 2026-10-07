import { getDictionary } from "@/i18n/dictionaries";
import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { SplitReveal } from "@/components/ui/split-reveal";

/**
 * Technologies, grouped by discipline — edit them in the dictionaries
 * (`capabilities.groups`). `note` is a short description of how the tool is
 * used; keep it factual. Groups with `isAI` get an "AI" tag.
 */
export async function Capabilities() {
  const dict = await getDictionary();
  const capabilityGroups = dict.capabilities.groups;
  const allCapabilities = capabilityGroups.flatMap((group) => group.items.map((item) => item.name));

  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-title"
      className="pb-(--section-space)"
    >
      <Marquee
        items={allCapabilities}
        className="mb-20 border-y border-line py-[0.12em] text-headline md:mb-32"
        duration={60}
      />

      <div className="shell">
        <header className="mb-14 grid-shell gap-y-8 md:mb-20">
          <SectionLabel index="03" className="col-span-6 text-mute md:col-span-3">
            {dict.capabilities.label}
          </SectionLabel>
          <SplitReveal
            id="capabilities-title"
            text={dict.capabilities.title}
            className="col-span-6 max-w-[14ch] text-title md:col-span-9"
          />
        </header>

        <div className="flex flex-col gap-14 md:gap-20">
          {capabilityGroups.map((group, groupIndex) => (
            <Reveal key={group.label} className="grid-shell gap-y-4">
              <h3 className="col-span-6 flex items-center gap-2 self-start text-label text-mute md:col-span-3 md:pt-4">
                <span aria-hidden="true">{String(groupIndex + 1).padStart(2, "0")}</span>
                {group.label}
              </h3>

              <ul className="col-span-6 border-t border-line md:col-span-9 [@media(hover:hover)]:[&:has(li:hover)_li:not(:hover)]:opacity-30">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="group/item flex flex-col gap-1 border-b border-line py-4 transition-opacity duration-500 md:flex-row md:items-baseline md:justify-between md:gap-8 md:py-5"
                  >
                    <span className="flex items-baseline gap-3 text-[clamp(2rem,4.6vw,4.5rem)] leading-[0.95] font-medium tracking-[-0.045em] transition-transform duration-700 ease-out-expo [@media(hover:hover)]:group-hover/item:translate-x-4">
                      {item.name}
                      {group.isAI && (
                        <span className="inline-flex items-center gap-1.5 self-center rounded-full bg-ink px-2 py-0.5 text-label text-[0.625rem] tracking-normal text-paper">
                          <span className="size-1 rounded-full bg-accent" aria-hidden="true" />
                          AI
                        </span>
                      )}
                    </span>
                    <span className="text-[0.9375rem] text-mute md:text-right">{item.note}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
