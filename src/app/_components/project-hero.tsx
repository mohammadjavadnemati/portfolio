import { Project } from "@/types/project";
import { StatusBadge } from "@/app/_components/status-badge";
import { TechBadge } from "@/app/_components/tech-badge";
import { LinkButton } from "@/app/_components/ui/button";
import { GithubIcon } from "@/app/_components/icons";
import { ArrowUpRight } from "lucide-react";

export function ProjectHero({ project }: { project: Project }) {
  const allTech = [
    ...(project.techStack.backend ?? []),
    ...(project.techStack.frontend ?? []),
    ...(project.techStack.database ?? []),
    ...(project.techStack.devops ?? []),
    ...(project.techStack.other ?? []),
  ];

  return (
    <header className="border-b border-border pb-10">
      <div className="flex flex-wrap items-center gap-3">
        <StatusBadge status={project.status} />
        <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted">
          {project.category}
        </span>
      </div>

      <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
        {project.name}
      </h1>
      <p className="mt-2 max-w-xl text-muted">{project.oneLiner}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {allTech.map((tech) => (
          <TechBadge key={tech} label={tech} />
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {project.links.liveDemo && (
          <LinkButton href={project.links.liveDemo} external variant="primary">
            Live Demo <ArrowUpRight size={14} />
          </LinkButton>
        )}
        <LinkButton href={project.links.github} external variant="outline">
          <GithubIcon size={16} /> GitHub
        </LinkButton>
        {project.links.documentation && (
          <LinkButton href={project.links.documentation} external variant="ghost">
            Documentation <ArrowUpRight size={14} />
          </LinkButton>
        )}
      </div>
    </header>
  );
}