# Savan Oljaca — Portfolio

Personal portfolio built with Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS v4 and Motion.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (fully static)
npm run lint
npm run typecheck
npm run format
```

## Editing content

All copy and data live in `src/content/` — components never hold content.

| File | What it controls |
| --- | --- |
| `site.ts` | Name, role, location, email, social links, availability badge, site URL |
| `projects.ts` | Selected work (order, text, stack, links, images) |
| `capabilities.ts` | Technology list, grouped by discipline |
| `experience.ts` | Experience timeline |
| `workflow.ts` | AI-assisted workflow section |

### Before launch — replace the placeholders

Search the codebase for `TODO` to find all of them:

- **Email, LinkedIn and GitHub** — `src/content/site.ts`
- **Production URL** — set `NEXT_PUBLIC_SITE_URL` (used for canonical URLs, Open Graph, sitemap)
- **Projects** — all four entries are samples marked `isPlaceholder: true` (shown with a "Sample" tag)
- **Experience** — all entries are placeholders marked `isPlaceholder: true`
- **Availability** — set `availability` to `null` in `site.ts` to hide the badge

### Adding a project

1. Put the image in `src/assets/work/` (≈2400px wide, JPG/WebP).
2. Import it at the top of `src/content/projects.ts`.
3. Add an entry to the `projects` array.

Layouts alternate automatically (full-width → right → left, with the last project always full-width), so no layout settings are needed. The placeholder photos are from Unsplash.

## Structure

```
src/
  app/                  layout, page, metadata, OG image, icon, robots, sitemap
  content/              editable data (see above)
  components/
    layout/             header, mobile menu, footer
    sections/           one file (or folder) per page section
    ui/                 reusable primitives: Reveal, SplitReveal, ScrollWords,
                        Magnetic, Marquee, LocalTime, SectionLabel, icons
    providers/          MotionConfig (respects prefers-reduced-motion)
  lib/                  easing constants, class-name helper
```

Design tokens (colours, type scale, grid, easing) are defined in `src/app/globals.css`.

## Notes

- **Motion**: CSS for entrance, marquee and hover effects; Motion for scroll-linked and in-view reveals. Everything respects `prefers-reduced-motion`. The hero canvas pauses while off-screen.
- **Accessibility**: skip link, semantic landmarks and headings, a mobile menu that handles focus (Escape closes it; the page behind is made `inert`), visible focus styles, and colour pairs checked for AA contrast.
- **Cache Components**: anything time-based is either client-only after hydration (the local clock) or cached at build time (the footer year), so the page prerenders as fully static.
