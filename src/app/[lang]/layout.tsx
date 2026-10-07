import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { site } from "@/content/site";
import { defaultLocale, localeSettings, locales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MotionProvider } from "@/components/providers/motion-provider";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = await getDictionary();
  const title = `${site.name} — ${dict.site.role}`;

  return {
    metadataBase: new URL(site.url),
    title: {
      default: title,
      template: `%s — ${site.name}`,
    },
    description: dict.site.description,
    authors: [{ name: site.name }],
    creator: site.name,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}`])),
        "x-default": `/${defaultLocale}`,
      },
    },
    openGraph: {
      type: "website",
      url: `/${locale}`,
      siteName: site.name,
      title,
      description: dict.site.description,
      locale: localeSettings[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeSettings[l].ogLocale),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: dict.site.description,
    },
    robots: site.allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#eeebe4",
  colorScheme: "light",
};

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();
  const dict = await getDictionary();

  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body suppressHydrationWarning>
        <a
          href="#main"
          className="fixed top-3 left-3 z-60 -translate-y-20 rounded-full bg-ink px-4 py-3 text-label text-paper transition-transform focus:translate-y-0"
        >
          {dict.common.skipToContent}
        </a>
        <MotionProvider>
          <Header
            locale={locale}
            dict={{ site: dict.site, nav: dict.nav, languageSwitcher: dict.languageSwitcher }}
          />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
