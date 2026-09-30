import { ProjectStatus } from "@/types/project";

const statusMap: Record<ProjectStatus, { code: string; label: string }> = {
  Deployed: { code: "200", label: "OK · Deployed" },
  Completed: { code: "201", label: "Created · Completed" },
  "In Progress": { code: "102", label: "Processing" },
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const s = statusMap[status];
  return (
    <span className="inline-flex items-center gap-1.5 rounded border border-border bg-background px-2 py-0.5 font-mono text-[11px] text-muted">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      {s.code} {s.label}
    </span>
  );
}