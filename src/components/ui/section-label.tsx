import { cn } from "@/lib/cn";

type SectionLabelProps = {
  index: string;
  children: React.ReactNode;
  className?: string;
};

/** Small mono index label, e.g. "(02) Selected work". */
export function SectionLabel({ index, children, className }: SectionLabelProps) {
  return (
    <p className={cn("flex items-baseline gap-3 text-label", className)}>
      <span aria-hidden="true">({index})</span>
      <span>{children}</span>
    </p>
  );
}
