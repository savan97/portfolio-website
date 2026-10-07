import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";

import { site } from "@/content/site";
import { hasLocale, locales } from "@/i18n/config";
import { loadDictionary } from "@/i18n/dictionaries";
import { format } from "@/i18n/format";

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

/** Social share card, generated at build time for each language. */
export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await loadDictionary(lang);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 64,
        background: "#eeebe4",
        color: "#131312",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#66625b" }}
      >
        <span>{dict.site.role}</span>
        <span>{format(dict.site.basedIn, { location: dict.site.location })}</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 168,
          lineHeight: 0.85,
          letterSpacing: -10,
        }}
      >
        <span>{site.firstName}</span>
        <span style={{ display: "flex", alignItems: "flex-start" }}>
          {site.lastName}
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: 28,
              background: "#e04a1e",
              marginLeft: 16,
              marginTop: 24,
            }}
          />
        </span>
      </div>
    </div>,
    size,
  );
}
