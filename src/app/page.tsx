import { Hero } from "@/app/_components/hero";
import { FeaturedProjects } from "@/app/_components/featured-projects";
import { SkillsPreview } from "@/app/_components/skills-preview";
import { AboutPreview } from "@/app/_components/about-preview";
import { ContactCTA } from "@/app/_components/contact-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <SkillsPreview />
      <AboutPreview />
      <ContactCTA />
    </>
  );
}