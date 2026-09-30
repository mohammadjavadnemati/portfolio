import { Check } from "lucide-react";

export function FeatureList({ features }: { features: string[] }) {
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2">
      {features.map((feature) => (
        <li key={feature} className="flex items-start gap-2 text-sm">
          <Check size={16} className="mt-0.5 shrink-0 text-accent" />
          <span className="text-muted">{feature}</span>
        </li>
      ))}
    </ul>
  );
}