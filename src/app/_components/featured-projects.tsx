import { Container } from "@/app/_components/container";
import { SectionHeading } from "@/app/_components/section-heading";
import { ProjectCard } from "@/app/_components/project-card";
import { LinkButton } from "@/app/_components/ui/button";
import { getFeaturedProjects } from "@/data/projects";

export function FeaturedProjects() {
  const featured = getFeaturedProjects();

  if (featured.length === 0) return null;

  return (
    <section className="border-b border-border py-16">
      <Container>
        <div className="flex items-end justify-between">
          <SectionHeading
  code="200"
  title="Featured Projects"
  description="Real, end-to-end projects — from architecture to deployment."
/>
          <LinkButton href="/projects" variant="ghost" className="hidden sm:inline-flex">
            View all →
          </LinkButton>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}