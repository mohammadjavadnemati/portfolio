"use client";
// قبل: import { Menu, X, Github } from "lucide-react";
import { Menu, X } from "lucide-react";
import { GithubIcon } from "@/app/_components/icons";

// و هرجا <Github size={16} /> بود:
<GithubIcon size={16} />
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/app/_components/container";
import { ThemeToggle } from "@/app/_components/theme-toggle";
import { LinkButton } from "@/app/_components/ui/button";
import { siteConfig } from "@/config/site";


export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight">
          {siteConfig.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {siteConfig.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors hover:text-accent ${
                  active ? "text-accent font-medium" : "text-muted"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <LinkButton href={siteConfig.links.github} external variant="outline" className="px-3">
            <GithubIcon size={16} /> GitHub
          </LinkButton>
          <LinkButton href="/resume" variant="primary">
            Resume
          </LinkButton>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border md:hidden">
          <Container className="flex flex-col gap-1 py-3">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-sm text-foreground hover:bg-surface"
              >
                {item.label}
              </Link>
            ))}
            <LinkButton
              href={siteConfig.links.github}
              external
              variant="secondary"
              className="mt-2 justify-start"
            >
              <GithubIcon size={16} /> GitHub
            </LinkButton>
          </Container>
        </div>
      )}
    </header>
  );
}