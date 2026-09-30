import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllSlugs, getProjectBySlug } from "@/data/projects";
import { Container } from "@/app/_components/container";
import { ProjectHero } from "@/app/_components/project-hero";
import { CaseStudySection } from "@/app/_components/case-study-section";
import { FeatureList } from "@/app/_components/feature-list";
import { ImplementationList } from "@/app/_components/implementation-list";
import { TechnicalDecisions } from "@/app/_components/technical-decisions";
import { ChallengeList } from "@/app/_components/challenge-list";
import { ScreenshotGallery } from "@/app/_components/screenshot-gallery";
import { ApiSampleList } from "@/app/_components/api-sample-list";
import { ResultsGrid } from "@/app/_components/results-grid";
import { LinkButton } from "@/app/_components/ui/button";
import { GithubIcon } from "@/app/_components/icons";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.oneLiner,
    openGraph: {
      title: project.name,
      description: project.oneLiner,
      images: [project.coverImage],
    },
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const { caseStudy } = project;

  return (
    <Container className="max-w-3xl py-16">
      <ProjectHero project={project} />

      <CaseStudySection code="100" title="Overview">
        <p className="text-muted">{caseStudy.overview}</p>
      </CaseStudySection>

      <CaseStudySection code="400" title="Problem">
        <p className="text-muted">{caseStudy.problem}</p>
      </CaseStudySection>

      <CaseStudySection code="200" title="Solution">
        <p className="text-muted">{caseStudy.solution}</p>
      </CaseStudySection>

      {caseStudy.keyFeatures.length > 0 && (
        <CaseStudySection code="201" title="Key Features">
          <FeatureList features={caseStudy.keyFeatures} />
        </CaseStudySection>
      )}

      {caseStudy.architectureDiagram && (
        <CaseStudySection code="300" title="Architecture">
          <div className="relative aspect-video overflow-hidden rounded-lg border border-border bg-surface">
            <Image
              src={caseStudy.architectureDiagram}
              alt={`${project.name} architecture diagram`}
              fill
              className="object-contain p-4"
            />
          </div>
        </CaseStudySection>
      )}

      {caseStudy.implementation.length > 0 && (
        <CaseStudySection code="500" title="Technical Implementation">
          <ImplementationList items={caseStudy.implementation} />
        </CaseStudySection>
      )}

      {caseStudy.technicalDecisions.length > 0 && (
        <CaseStudySection code="300" title="Technical Decisions">
          <TechnicalDecisions decisions={caseStudy.technicalDecisions} />
        </CaseStudySection>
      )}

      {caseStudy.challenges.length > 0 && (
        <CaseStudySection code="409" title="Challenges & Solutions">
          <ChallengeList challenges={caseStudy.challenges} />
        </CaseStudySection>
      )}

      {caseStudy.screenshots.length > 0 && (
        <CaseStudySection code="200" title="Screenshots">
          <ScreenshotGallery screenshots={caseStudy.screenshots} />
        </CaseStudySection>
      )}

      {caseStudy.apiSamples && caseStudy.apiSamples.length > 0 && (
        <CaseStudySection code="API" title="API Reference">
          <ApiSampleList endpoints={caseStudy.apiSamples} />
        </CaseStudySection>
      )}

      {caseStudy.results && caseStudy.results.length > 0 && (
        <CaseStudySection code="200" title="Results">
          <ResultsGrid results={caseStudy.results} />
        </CaseStudySection>
      )}

      <CaseStudySection code="303" title="Links">
        <div className="flex flex-wrap gap-3">
          <LinkButton href={project.links.github} external variant="outline">
            <GithubIcon size={16} /> GitHub
          </LinkButton>
          {project.links.liveDemo && (
            <LinkButton href={project.links.liveDemo} external variant="primary">
              Live Demo
            </LinkButton>
          )}
          {project.links.documentation && (
            <LinkButton href={project.links.documentation} external variant="ghost">
              Documentation
            </LinkButton>
          )}
        </div>
      </CaseStudySection>
    </Container>
  );
}