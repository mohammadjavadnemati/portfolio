import { Container } from "@/app/_components/container";
import { SectionHeading } from "@/app/_components/section-heading";
import { TechBadge } from "@/app/_components/tech-badge";
import { skillCategories } from "@/data/skills";

export function SkillsPreview() {
  return (
    <section className="border-b border-border py-16">
      <Container>
        <SectionHeading
          code="102"
          title="Technical Skills"
          description="Skills grounded in real projects, not arbitrary percentages."
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => (
            <div key={category.title}>
              <h3 className="mb-3 text-sm font-semibold text-muted">{category.title}</h3>
              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <TechBadge key={skill} label={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}