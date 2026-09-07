import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  low: "bg-success/25 text-success-foreground",
  medium: "bg-secondary text-secondary-foreground",
  high: "bg-warning/40 text-warning-foreground",
};

export function RiskBadge({ risk, className }: { risk: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        styles[risk] ?? "bg-muted text-muted-foreground",
        className,
      )}
    >
      {risk} risk
    </span>
  );
}
