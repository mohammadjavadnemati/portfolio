import { ProjectResult } from "@/types/project";

export function ResultsGrid({ results }: { results: ProjectResult[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {results.map((r) => (
        <div key={r.label} className="rounded-lg border border-border bg-surface p-4 text-center">
          <p className="font-display text-2xl font-semibold text-accent">{r.value}</p>
          <p className="mt-1 text-xs text-muted">{r.label}</p>
        </div>
      ))}
    </div>
  );
}