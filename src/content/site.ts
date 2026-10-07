/**
 * Global site configuration — values that are the same in every language.
 * Translated text (role, location, description, …) lives in
 * `src/i18n/dictionaries/*.json`.
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
  timeZone: "Europe/Belgrade",
  yearsOfExperience: "5+",

  // TODO: replace with the production domain (or set NEXT_PUBLIC_SITE_URL).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  // TODO: replace with the real email address.
  email: "hello@example.com",

  // TODO: set to `false` to hide the availability badge. The text is in the dictionaries.
  showAvailability: true,

  // TODO: replace `href` values with real profile URLs.
  socials: [
    { label: "LinkedIn", href: "#" },
    { label: "GitHub", href: "#" },
  ] satisfies SocialLink[],
} as const;

/** `key` points to the label in the dictionaries' `nav` section. */
export const navigation = [
  { key: "work", href: "#work" },
  { key: "about", href: "#about" },
  { key: "contact", href: "#contact" },
] as const;
