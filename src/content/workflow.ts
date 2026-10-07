/**
 * How AI fits into the development workflow.
 */

export type WorkflowUse = {
  title: string;
  description: string;
};

export const workflowUses: WorkflowUse[] = [
  {
    title: "Rapid prototyping",
    description:
      "Turning an idea into something clickable in hours, so decisions are made on real interfaces.",
  },
  {
    title: "Exploration",
    description: "Comparing approaches and unfamiliar APIs quickly before committing to one.",
  },
  {
    title: "Refactoring",
    description:
      "Handling wide, mechanical changes while I define the structure and review every diff.",
  },
  {
    title: "Debugging",
    description:
      "A second pair of eyes for tracing issues, with conclusions verified against the code.",
  },
  {
    title: "Documentation",
    description: "Keeping READMEs, comments and handover notes in step with the code.",
  },
  {
    title: "Acceleration",
    description:
      "Less time on boilerplate, more time on the details that make a product feel right.",
  },
];

/** The loop: who does what. */
export const workflowLoop = [
  { label: "Intent", owner: "Me" },
  { label: "Draft", owner: "Claude Code" },
  { label: "Review & own", owner: "Me" },
] as const;
