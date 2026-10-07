"use client";

import { useSyncExternalStore } from "react";

type LocalTimeProps = {
  timeZone: string;
  className?: string;
};

function subscribe(callback: () => void) {
  const id = window.setInterval(callback, 1000);
  return () => window.clearInterval(id);
}

/**
 * Live clock for a given time zone. Renders a neutral placeholder on the
 * server and only shows the real time after hydration, so prerendered
 * HTML stays deterministic.
 */
export function LocalTime({ timeZone, className }: LocalTimeProps) {
  const time = useSyncExternalStore(
    subscribe,
    () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone,
      }).format(Date.now()),
    () => null,
  );

  return (
    <time className={className} suppressHydrationWarning>
      {time ?? "--:--"}
    </time>
  );
}
