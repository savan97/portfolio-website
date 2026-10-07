"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";

import { navigation, site } from "@/content/site";
import { EASE_IN_OUT_QUART, EASE_OUT_EXPO } from "@/lib/motion";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

/**
 * Full-screen mobile navigation. While open, the page behind it is made
 * inert and non-scrollable; Escape closes it and returns focus to the toggle.
 */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;

    const background = document.querySelectorAll<HTMLElement>("main, footer");
    background.forEach((el) => (el.inert = true));
    document.documentElement.style.overflow = "hidden";
    firstLinkRef.current?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const desktop = window.matchMedia("(min-width: 48rem)");
    const onResize = () => desktop.matches && onClose();

    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onResize);

    return () => {
      background.forEach((el) => (el.inert = false));
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onResize);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          className="fixed inset-0 z-40 flex shell flex-col bg-paper pt-(--header-height) pb-8 md:hidden"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.8, ease: EASE_IN_OUT_QUART }}
        >
          <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center">
            <ul className="border-t border-line">
              {navigation.map((item, i) => (
                <li key={item.href} className="overflow-hidden border-b border-line">
                  <motion.a
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-baseline justify-between py-4 text-[clamp(3rem,15vw,5rem)] leading-none font-medium tracking-[-0.05em]"
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "100%", transition: { duration: 0.4, ease: EASE_IN_OUT_QUART } }}
                    transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.25 + i * 0.07 }}
                  >
                    {item.label}
                    <span className="text-label text-mute" aria-hidden="true">
                      0{i + 1}
                    </span>
                  </motion.a>
                </li>
              ))}
            </ul>
          </nav>

          <motion.div
            className="grid grid-cols-2 gap-4 text-[0.9375rem]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.55, duration: 0.6 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <a href={`mailto:${site.email}`} className="col-span-2 font-medium">
              {site.email}
            </a>
            {site.socials.map((social) => (
              <a key={social.label} href={social.href} className="text-mute">
                {social.label}
              </a>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
