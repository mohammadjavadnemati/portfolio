import { TechnicalDecision } from "@/types/project";

export function TechnicalDecisions({ decisions }: { decisions: TechnicalDecision[] }) {
  return (
    <div className="space-y-5">
      {decisions.map((d) => (
        <div key={d.question}>
          <p className="font-medium">{d.question}</p>
          <p className="mt-1 text-sm text-muted">{d.answer}</p>
        </div>
      ))}
    </div>
  );
}