import { TechImplementationDetail } from "@/types/project";

export function ImplementationList({ items }: { items: TechImplementationDetail[] }) {
  return (
    <dl className="grid gap-5 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="rounded-lg border border-border bg-surface p-4">
          <dt className="font-mono text-xs font-medium text-accent">{item.label}</dt>
          <dd className="mt-1.5 text-sm text-muted">{item.description}</dd>
        </div>
      ))}
    </dl>
  );
}