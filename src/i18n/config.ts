/**
 * Language configuration.
 *
 * To change the primary language, set `defaultLocale`. Visitors who open
 * the bare domain ("/") are sent to it unless they have picked a language
 * before (remembered in the `LOCALE_COOKIE` cookie).
 *
 * To add a language:
 *   1. add its code to `locales` and an entry to `localeSettings`,
 *   2. create `dictionaries/<code>.json` with the same keys as `en.json`,
 *   3. register it in `dictionaries.ts`.
 */

export const locales = ["en", "sr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeSettings: Record<
  Locale,
  {
    /** Shown in the language switcher. */
    label: string;
    /** Full name, used for screen readers. */
    name: string;
    /** Open Graph locale, e.g. `sr_RS`. */
    ogLocale: string;
    /** BCP 47 tag for `Intl` formatting. */
    intl: string;
  }
> = {
  sr: { label: "SR", name: "Srpski", ogLocale: "sr_RS", intl: "sr-Latn-RS" },
  en: { label: "EN", name: "English", ogLocale: "en_US", intl: "en-GB" },
};

export const LOCALE_COOKIE = "NEXT_LOCALE";

export const hasLocale = (value: string | undefined): value is Locale =>
  locales.includes(value as Locale);
