import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/app/_components/container";
import { SectionHeading } from "@/app/_components/section-heading";
import { ProjectFilter } from "@/app/_components/project-filter";
import { ProjectGrid } from "@/app/_components/project-grid";
import { getProjectsByCategory } from "@/data/projects";
import { ProjectCategory } from "@/types/project";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Real, production-oriented projects across backend, full-stack, and machine learning.",
};

export default function ProjectsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const category = (searchParams.category ?? "All") as ProjectCategory | "All";
  const projects = getProjectsByCategory(category);

  return (
    <Container className="py-16">
      <SectionHeading
        code="200"
        title="Projects"
        description="A full list of things I've built end-to-end — from architecture to deployment."
      />

      <Suspense fallback={null}>
        <ProjectFilter />
      </Suspense>

      <div className="mt-8">
        <ProjectGrid projects={projects} />
      </div>
    </Container>
  );
}