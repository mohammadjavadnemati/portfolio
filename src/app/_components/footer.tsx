import Link from "next/link";
import { Mail } from "lucide-react";
import { Container } from "@/app/_components/container";
import { GithubIcon, LinkedinIcon } from "@/app/_components/icons";
import { siteConfig } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <div>
          <p className="text-sm font-medium">{siteConfig.name}</p>
          <p className="text-sm text-muted">{siteConfig.role}</p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted transition-colors hover:text-accent"
          >
            <GithubIcon size={18} />
          </Link>
          <Link
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted transition-colors hover:text-accent"
          >
            <LinkedinIcon size={18} />
          </Link>
          <Link
            href={`mailto:${siteConfig.links.email}`}
            aria-label="Email"
            className="text-muted transition-colors hover:text-accent"
          >
            <Mail size={18} />
          </Link>
        </div>

        <p className="text-xs text-muted">
          © {year} {siteConfig.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}