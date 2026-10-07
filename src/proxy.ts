import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, hasLocale, LOCALE_COOKIE, locales } from "@/i18n/config";

/**
 * Sends requests without a language prefix ("/", "/anything") to the
 * visitor's previously chosen language, or to `defaultLocale`.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (pathnameHasLocale) return;

  const preferred = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = hasLocale(preferred) ? preferred : defaultLocale;

  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Next.js internals and any path with a file extension (icon.svg, robots.txt, …).
  matcher: ["/((?!_next|.*\\..*).*)"],
};
