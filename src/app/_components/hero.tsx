import { Download, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/app/_components/icons";
import { Container } from "@/app/_components/container";
import { LinkButton } from "@/app/_components/ui/button";
import { siteConfig } from "@/config/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-dot-grid bg-dot-grid opacity-[0.4] [mask-image:linear-gradient(to_bottom,black,transparent)]" />

      <Container className="relative py-20 sm:py-28">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          GET /developers/mohammad-javad-nemati
        </p>

        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">
          {siteConfig.name}
        </h1>
        <p className="mt-3 font-mono text-lg text-accent">{siteConfig.role}</p>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
          {siteConfig.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <LinkButton href="/projects" variant="primary">View Projects</LinkButton>
          <LinkButton href={siteConfig.links.github} external variant="outline">
            <GithubIcon size={16} /> GitHub
          </LinkButton>
          <LinkButton href={siteConfig.cvPath} external variant="secondary">
            <Download size={16} /> Download CV
          </LinkButton>
          <LinkButton href="/contact" variant="ghost">
            <Mail size={16} /> Contact Me
          </LinkButton>
        </div>

        <LinkButton
          href={siteConfig.links.linkedin}
          external
          variant="ghost"
          className="mt-3 px-0 text-muted hover:text-accent"
        >
          <LinkedinIcon size={16} /> Connect on LinkedIn
        </LinkButton>
      </Container>
    </section>
  );
}