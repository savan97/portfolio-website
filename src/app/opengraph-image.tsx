import { ImageResponse } from "next/og";

import { site } from "@/content/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social share card, generated at build time. */
export default function OpengraphImage() {
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
        <span>{site.role}</span>
        <span>Based in {site.location}</span>
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
