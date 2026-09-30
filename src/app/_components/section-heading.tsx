export function SectionHeading({
  code,
  title,
  description,
}: {
  code: string; // مثلاً "200"
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="mb-2 font-mono text-xs uppercase tracking-wider text-accent">
        {code} · {title}
      </p>
      <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {description && <p className="mt-3 text-muted">{description}</p>}
    </div>
  );
}