import { ApiEndpointSample } from "@/types/project";

const methodColor: Record<string, string> = {
  GET: "text-accent",
  POST: "text-emerald-500",
  PUT: "text-amber-500",
  PATCH: "text-amber-500",
  DELETE: "text-red-500",
};

export function ApiSampleList({ endpoints }: { endpoints: ApiEndpointSample[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      {endpoints.map((e, i) => (
        <div
          key={i}
          className={`flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:gap-4 ${
            i !== 0 ? "border-t border-border" : ""
          }`}
        >
          <span className={`w-16 shrink-0 font-mono text-xs font-semibold ${methodColor[e.method]}`}>
            {e.method}
          </span>
          <code className="font-mono text-sm">{e.path}</code>
          <span className="text-sm text-muted sm:ml-auto">{e.description}</span>
        </div>
      ))}
    </div>
  );
}