/**
 * Selected work.
 *
 * To add a project, append an object to `projects`. To remove one, delete it.
 * The order of the array is the order on the page, and the layout
 * alternates automatically (full width → right → left → …).
 *
 * Images live in /src/assets/work and are imported below, which gives them
 * automatic dimensions and a blurred placeholder while loading. Any aspect
 * ratio works — images are cropped with `object-fit: cover`.
 * Recommended: 2400px wide, JPG or WebP.
 *
 * Translated text (title, summary, role, image alt) lives in
 * `src/i18n/dictionaries/*.json` under `work.projects.<slug>` — add an entry
 * there in every language when you add a project here.
 *
 * TODO: every entry below is a SAMPLE. Replace title, summary, role, stack,
 * year, link and image with real project data, then set `isPlaceholder`
 * to `false` (or remove it) so the "Sample" tag disappears.
 */

import type { StaticImageData } from "next/image";

import placeholder01 from "@/assets/work/placeholder-01.jpg";
import placeholder02 from "@/assets/work/placeholder-02.jpg";
import placeholder03 from "@/assets/work/placeholder-03.jpg";
import placeholder04 from "@/assets/work/placeholder-04.jpg";
import type { Dictionary } from "@/i18n/dictionaries";

export type ProjectSlug = keyof Dictionary["work"]["projects"];

export type Project = {
  /** Unique, URL-safe identifier; also the key of the project's translations. */
  slug: ProjectSlug;
  stack: string[];
  year: string;
  /** External URL or case-study route. Omit to hide the link. */
  href?: string;
  image: StaticImageData;
  /** Marks sample content in the UI until real data is added. */
  isPlaceholder?: boolean;
};

export const projects: Project[] = [
  {
    slug: "headless-storefront",
    stack: ["Next.js", "Shopify", "Tailwind CSS"],
    year: "TBD",
    href: "#",
    image: placeholder01,
    isPlaceholder: true,
  },
  {
    slug: "editorial-platform",
    stack: ["WordPress", "REST API", "SCSS"],
    year: "TBD",
    href: "#",
    image: placeholder02,
    isPlaceholder: true,
  },
  {
    slug: "marketing-site",
    stack: ["Webflow", "JavaScript"],
    year: "TBD",
    href: "#",
    image: placeholder03,
    isPlaceholder: true,
  },
  {
    slug: "product-prototype",
    stack: ["FlutterFlow", "REST API"],
    year: "TBD",
    href: "#",
    image: placeholder04,
    isPlaceholder: true,
  },
];
