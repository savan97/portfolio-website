/**
 * Professional experience, newest first.
 *
 * TODO: every entry below is a PLACEHOLDER. Replace with real roles —
 * company, role, period and a short summary — and remove `isPlaceholder`.
 * Do not add achievements or metrics that cannot be verified.
 */

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  summary: string;
  /** Optional highlights, rendered as a short list. */
  highlights?: string[];
  isPlaceholder?: boolean;
};

export const experience: ExperienceEntry[] = [
  {
    company: "Company name",
    role: "Role title",
    period: "20XX — Present",
    summary: "A short description of responsibilities and the kind of work delivered.",
    isPlaceholder: true,
  },
  {
    company: "Company name",
    role: "Role title",
    period: "20XX — 20XX",
    summary: "A short description of responsibilities and the kind of work delivered.",
    isPlaceholder: true,
  },
  {
    company: "Company name",
    role: "Role title",
    period: "20XX — 20XX",
    summary: "A short description of responsibilities and the kind of work delivered.",
    isPlaceholder: true,
  },
];
