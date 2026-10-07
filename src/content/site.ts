/**
 * Global site configuration.
 *
 * Everything marked TODO is a placeholder — replace it with real values
 * before going live. Nothing here should be invented: if a value is
 * unknown, leave the placeholder in place.
 */

export type SocialLink = {
  label: string;
  href: string;
};

export const site = {
  name: "Savan Oljaca",
  firstName: "Savan",
  lastName: "Oljaca",
  /** Second word of the hero headline, shown after `firstName`. */
  heroSuffix: "Dev",
  role: "Frontend Developer",
  location: "Serbia",
  timeZone: "Europe/Belgrade",
  yearsOfExperience: "5+",

  // TODO: replace with the production domain (or set NEXT_PUBLIC_SITE_URL).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  description:
    "Savan Oljaca is a frontend developer from Serbia with 5+ years of experience building fast, considered websites and digital products with React, Next.js and modern tooling.",

  // TODO: replace with the real email address.
  email: "hello@example.com",

  // TODO: set to `null` to hide the availability badge.
  availability: "Available for new projects",

  // TODO: replace `href` values with real profile URLs.
  socials: [
    { label: "LinkedIn", href: "#" },
    { label: "GitHub", href: "#" },
  ] satisfies SocialLink[],
} as const;

export const navigation = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;
