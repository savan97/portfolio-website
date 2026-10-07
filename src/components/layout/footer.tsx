import { site } from "@/content/site";

/** Cached at build time so the prerendered page stays fully static. */
async function getCurrentYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await getCurrentYear();

  return (
    <footer className="shell border-t border-line py-8">
      <div className="grid-shell gap-y-6 text-[0.875rem] leading-snug">
        <p className="col-span-3 font-medium">
          {site.name}
          <span className="block font-normal text-mute">{site.role}</span>
        </p>

        <p className="col-span-3 text-mute md:col-span-3">
          {site.availability ?? `Based in ${site.location}`}
        </p>

        <ul className="col-span-3 flex gap-6 md:col-span-3 md:col-start-7">
          {site.socials.map((social) => (
            <li key={social.label}>
              <a href={social.href} className="link-underline pb-0.5">
                {social.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="col-span-3 flex justify-end gap-6 text-mute md:col-start-10">
          <p>© {year}</p>
          <a href="#top" className="link-underline pb-0.5 text-ink">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
