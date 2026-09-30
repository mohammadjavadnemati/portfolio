import { ChallengeItem } from "@/types/project";

export function ChallengeList({ challenges }: { challenges: ChallengeItem[] }) {
  return (
    <div className="space-y-6">
      {challenges.map((c, i) => (
        <div key={i} className="rounded-lg border border-border bg-surface p-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-muted">Problem</p>
              <p className="mt-1.5 text-sm">{c.problem}</p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-accent">Solution</p>
              <p className="mt-1.5 text-sm">{c.solution}</p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-muted">Result</p>
              <p className="mt-1.5 text-sm">{c.result}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}