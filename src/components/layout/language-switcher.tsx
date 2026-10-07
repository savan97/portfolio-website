"use client";

import { LOCALE_COOKIE, localeSettings, locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
  className?: string;
};

function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

/**
 * Links to the same page in every language. The choice is remembered in a
 * cookie, so visiting "/" later opens the last language used.
 */
export function LanguageSwitcher({ locale, label, className }: LanguageSwitcherProps) {
  return (
    <nav aria-label={label} className={className}>
      <ul className="flex items-center gap-1.5">
        {locales.map((code, i) => {
          const current = code === locale;
          return (
            <li key={code} className="flex items-center gap-1.5">
              {i > 0 && (
                <span aria-hidden="true" className="opacity-40">
                  /
                </span>
              )}
              <a
                href={`/${code}`}
                hrefLang={code}
                lang={code}
                aria-current={current ? "page" : undefined}
                onClick={() => rememberLocale(code)}
                className={cn(
                  "link-underline pb-0.5 transition-opacity duration-300",
                  !current && "opacity-50 hover:opacity-100",
                )}
              >
                <span aria-hidden="true">{localeSettings[code].label}</span>
                <span className="sr-only">{localeSettings[code].name}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
