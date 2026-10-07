"use client";

import { useCallback, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";

import { navigation, site } from "@/content/site";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { MobileMenu } from "./mobile-menu";

/**
 * Fixed header. Uses `mix-blend-difference` so it stays legible over both
 * light and dark sections, and tucks away while scrolling down.
 */
export function Header() {
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
            aria-label={`${site.name}, ${site.role} — back to top`}
            onClick={() => menuOpen && setMenuOpen(false)}
          >
            {site.name}
            <span className="block opacity-60">{site.role}</span>
          </a>

          <p className="col-span-3 hidden text-label opacity-60 lg:col-start-6 lg:block">
            Based in {site.location}
          </p>

          <nav aria-label="Primary" className="col-span-4 col-start-9 hidden justify-end md:flex">
            <ul className="flex gap-8 text-[0.9375rem] font-medium tracking-tight">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="link-underline pb-0.5">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

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
                <span className="block">Menu</span>
                <span className="block">Close</span>
              </span>
            </span>
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
