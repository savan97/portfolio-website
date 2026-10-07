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
 * TODO: every entry below is a SAMPLE. Replace title, summary, role, stack,
 * year, link and image with real project data, then set `isPlaceholder`
 * to `false` (or remove it) so the "Sample" tag disappears.
 */

import type { StaticImageData } from "next/image";

import placeholder01 from "@/assets/work/placeholder-01.jpg";
import placeholder02 from "@/assets/work/placeholder-02.jpg";
import placeholder03 from "@/assets/work/placeholder-03.jpg";
import placeholder04 from "@/assets/work/placeholder-04.jpg";

export type Project = {
  /** Unique, URL-safe identifier. */
  slug: string;
  title: string;
  /** One or two sentences. */
  summary: string;
  role: string;
  stack: string[];
  year: string;
  /** External URL or case-study route. Omit to hide the link. */
  href?: string;
  image: {
    src: StaticImageData;
    alt: string;
  };
  /** Marks sample content in the UI until real data is added. */
  isPlaceholder?: boolean;
};

export const projects: Project[] = [
  {
    slug: "headless-storefront",
    title: "Headless Storefront",
    summary:
      "A headless commerce experience pairing a Shopify backend with a fast, custom-built Next.js storefront.",
    role: "Frontend Development",
    stack: ["Next.js", "Shopify", "Tailwind CSS"],
    year: "TBD",
    href: "#",
    image: {
      src: placeholder01,
      alt: "Placeholder image: curved orange architectural facade against a blue sky",
    },
    isPlaceholder: true,
  },
  {
    slug: "editorial-platform",
    title: "Editorial Platform",
    summary:
      "A content-driven publishing site with a flexible WordPress backend and a carefully tuned reading experience.",
    role: "Frontend Development",
    stack: ["WordPress", "REST API", "SCSS"],
    year: "TBD",
    href: "#",
    image: {
      src: placeholder02,
      alt: "Placeholder image: glass building facade with a repeating angular pattern",
    },
    isPlaceholder: true,
  },
  {
    slug: "marketing-site",
    title: "Marketing Website",
    summary:
      "A motion-rich marketing website built in Webflow, with custom interactions layered on top.",
    role: "Design & Development",
    stack: ["Webflow", "JavaScript"],
    year: "TBD",
    href: "#",
    image: {
      src: placeholder03,
      alt: "Placeholder image: white geometric building with angled glass volumes",
    },
    isPlaceholder: true,
  },
  {
    slug: "product-prototype",
    title: "Product Prototype",
    summary:
      "A mobile product prototype taken from idea to clickable app in FlutterFlow, connected to live data through REST APIs.",
    role: "Frontend Development",
    stack: ["FlutterFlow", "REST API"],
    year: "TBD",
    href: "#",
    image: {
      src: placeholder04,
      alt: "Placeholder image: blue and white striped curved architecture viewed from below",
    },
    isPlaceholder: true,
  },
];
