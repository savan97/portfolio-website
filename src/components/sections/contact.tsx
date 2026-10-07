import { site } from "@/content/site";
import { getDictionary } from "@/i18n/dictionaries";
import { ArrowUpRight } from "@/components/ui/icons";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { SplitReveal } from "@/components/ui/split-reveal";

export async function Contact() {
  const dict = await getDictionary();

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="flex min-h-svh shell flex-col justify-between border-t border-line pt-6 pb-(--section-space)"
    >
      <SectionLabel index="06" className="text-mute">
        {dict.contact.label}
      </SectionLabel>

      <div className="py-20">
        <p className="mb-8 text-label text-mute">{dict.contact.prompt}</p>
        <h2 id="contact-title" className="text-display max-md:text-[16.5vw]">
          <SplitReveal as="span" text={dict.contact.titleLead} className="block" stagger={0.08} />
          <SplitReveal
            as="span"
            text={dict.contact.titleTail}
            className="block md:pl-[16.66%]"
            delay={0.16}
            stagger={0.08}
          />
        </h2>
      </div>

      <div className="grid-shell items-end gap-y-12">
        <Reveal className="col-span-6 md:col-span-6">
          <Magnetic className="inline-block" strength={0.2}>
            <a
              href={`mailto:${site.email}`}
              className="group/mail inline-flex items-center gap-4 rounded-full bg-ink py-5 pr-6 pl-8 text-[clamp(1.125rem,2vw,1.75rem)] font-medium tracking-[-0.02em] text-paper transition-colors duration-500 hover:bg-accent-deep focus-visible:bg-accent-deep md:py-7 md:pr-8 md:pl-10"
            >
              {site.email}
              <span className="grid size-9 place-items-center rounded-full bg-paper text-ink transition-transform duration-700 ease-out-expo group-hover/mail:rotate-45 md:size-11">
                <ArrowUpRight className="size-4" />
              </span>
            </a>
          </Magnetic>
        </Reveal>

        <Reveal className="col-span-6 md:col-span-4 md:col-start-9" delay={0.1}>
          <ul className="border-t border-line">
            {site.socials.map((social) => (
              <li key={social.label} className="border-b border-line">
                <a
                  href={social.href}
                  className="group/social flex items-center justify-between py-4 text-[1.0625rem] font-medium tracking-tight"
                >
                  {social.label}
                  <ArrowUpRight className="size-4 transition-transform duration-500 ease-out-expo group-hover/social:translate-x-0.5 group-hover/social:-translate-y-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
