import { notFound } from "next/navigation";
import { lang } from "next/root-params";

import { hasLocale, type Locale } from "./config";
import type en from "./dictionaries/en.json";

/** `en.json` is the reference shape; every other dictionary must match it. */
export type Dictionary = typeof en;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  sr: () => import("./dictionaries/sr.json").then((module) => module.default),
  en: () => import("./dictionaries/en.json").then((module) => module.default),
};

/** The locale of the current route (the `[lang]` segment). */
export async function getLocale(): Promise<Locale> {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  return locale;
}

/** Translations for a given locale. */
export const loadDictionary = (locale: Locale) => dictionaries[locale]();

/** Translations for the current route's locale. Server Components only. */
export async function getDictionary(): Promise<Dictionary> {
  return loadDictionary(await getLocale());
}
