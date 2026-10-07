/**
 * Technologies, grouped by discipline.
 * `note` is a short description of how the tool is used — keep it factual.
 */

export type Capability = {
  name: string;
  note: string;
};

export type CapabilityGroup = {
  label: string;
  items: Capability[];
};

export const capabilityGroups: CapabilityGroup[] = [
  {
    label: "Build",
    items: [
      { name: "Next.js", note: "Routing, rendering & performance" },
      { name: "React", note: "Component architecture & state" },
      { name: "JavaScript", note: "The foundation underneath it all" },
      { name: "REST APIs", note: "Integrating data & services" },
    ],
  },
  {
    label: "Style",
    items: [
      { name: "Tailwind CSS", note: "Utility-first design systems" },
      { name: "SCSS", note: "Structured, maintainable styles" },
    ],
  },
  {
    label: "Platforms",
    items: [
      { name: "Shopify", note: "Commerce & storefronts" },
      { name: "WordPress", note: "Content-driven websites" },
      { name: "Webflow", note: "Visual development & CMS" },
      { name: "FlutterFlow", note: "Cross-platform app prototypes" },
    ],
  },
  {
    label: "Workflow",
    items: [
      { name: "Claude Code", note: "Agentic coding in the terminal" },
      { name: "AI-assisted development", note: "Faster loops, same standards" },
    ],
  },
];

/** Flat list used by the marquee. */
export const allCapabilities = capabilityGroups.flatMap((group) =>
  group.items.map((item) => item.name),
);
