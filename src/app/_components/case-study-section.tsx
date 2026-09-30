export function CaseStudySection({
  code,
  title,
  children,
}: {
  code: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border py-10 first:border-t-0 first:pt-0">
      <p className="mb-3 font-mono text-xs uppercase tracking-wider text-accent">
        {code} · {title}
      </p>
      <div className="prose-sm max-w-none text-foreground">{children}</div>
    </section>
  );
}