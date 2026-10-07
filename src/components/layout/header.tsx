"use client";

import { useCallback, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";

import { navigation, site } from "@/content/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { format } from "@/i18n/format";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { LanguageSwitcher } from "./language-switcher";
import { MobileMenu } from "./mobile-menu";

export type HeaderDictionary = Pick<Dictionary, "site" | "nav" | "languageSwitcher">;

type HeaderProps = {
  locale: Locale;
  dict: HeaderDictionary;
};

/**
 * Fixed header. Uses `mix-blend-difference` so it stays legible over both
 * light and dark sections, and tucks away while scrolling down.
 */
export function Header({ locale, dict }: HeaderProps) {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(current > 160 && current > previous);
  });

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 shell text-paper mix-blend-difference"
        animate={{ y: hidden && !menuOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
      >
        <div className="grid-shell h-(--header-height) items-center">
          <a
            href="#top"
            className="col-span-4 text-[0.9375rem] leading-tight font-medium tracking-tight md:col-span-3"
            aria-label={format(dict.nav.homeLink, { name: site.name, role: dict.site.role })}
            onClick={() => menuOpen && setMenuOpen(false)}
          >
            {site.name}
            <span className="block opacity-60">{dict.site.role}</span>
          </a>

          <p className="col-span-3 hidden text-label opacity-60 lg:col-start-6 lg:block">
            {format(dict.site.basedIn, { location: dict.site.location })}
          </p>

          <div className="col-span-4 col-start-9 hidden items-center justify-end gap-8 text-[0.9375rem] font-medium tracking-tight md:flex">
            <nav aria-label={dict.nav.label}>
              <ul className="flex gap-8">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="link-underline pb-0.5">
                      {dict.nav[item.key]}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <LanguageSwitcher locale={locale} label={dict.languageSwitcher.label} />
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className="col-span-2 col-start-5 -mr-2 justify-self-end p-2 text-[0.9375rem] font-medium tracking-tight md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span aria-hidden="true" className="relative block h-[1.25em] overflow-hidden">
              <span
                className="block transition-transform duration-500 ease-out-expo"
                style={{ transform: menuOpen ? "translateY(-100%)" : "translateY(0)" }}
              >
                <span className="block">{dict.nav.menu}</span>
                <span className="block">{dict.nav.close}</span>
              </span>
            </span>
            <span className="sr-only">{menuOpen ? dict.nav.closeMenu : dict.nav.openMenu}</span>
          </button>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={closeMenu} locale={locale} dict={dict} />
    </>
  );
}
