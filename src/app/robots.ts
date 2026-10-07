import type { MetadataRoute } from "next";

import { site } from "@/content/site";

/**
 * Crawling stays allowed even when indexing is off: a crawler has to fetch
 * a page to see its `noindex`, and a page blocked here can still be listed
 * on Google by its URL alone.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: site.allowIndexing ? `${site.url}/sitemap.xml` : undefined,
  };
}
