import { GithubIcon } from "@/app/_components/icons";
import { ArrowUpRight} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/types/project";
import { TechBadge } from "@/app/_components/tech-badge";
import { StatusBadge } from "@/app/_components/status-badge";


export function ProjectCard({ project }: { project: Project }) {
  const allTech = [
    ...(project.techStack.backend ?? []),
    ...(project.techStack.frontend ?? []),
    ...(project.techStack.database ?? []),
  ].slice(0, 4);

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-accent/50">
      <Link href={`/projects/${project.slug}`} className="relative aspect-video overflow-hidden bg-background">
        <Image
          src={project.coverImage}
          alt={`${project.name} screenshot`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold">
            <Link href={`/projects/${project.slug}`} className="hover:text-accent">
              {project.name}
            </Link>
          </h3>
<StatusBadge status={project.status} />
        </div>

        <p className="text-sm text-muted">{project.oneLiner}</p>

        <div className="flex flex-wrap gap-1.5">
          {allTech.map((tech) => (
            <TechBadge key={tech} label={tech} />
          ))}
        </div>

        <div className="mt-auto flex items-center gap-4 pt-3 text-sm">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 font-medium text-accent hover:underline"
          >
            Case Study <ArrowUpRight size={14} />
          </Link>
          <Link
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-muted hover:text-foreground"
          >
            <GithubIcon size={14} /> GitHub
          </Link>
        </div>
      </div>
    </div>
  );
}