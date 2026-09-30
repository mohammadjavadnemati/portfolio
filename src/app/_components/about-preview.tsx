import { Container } from "@/app/_components/container";
import { LinkButton } from "@/app/_components/ui/button";
import { siteConfig } from "@/config/site";

export function AboutPreview() {
  return (
    <section className="border-b border-border py-16">
      <Container className="max-w-2xl">
        <p className="mb-2 font-mono text-xs uppercase tracking-wider text-accent">
          About
        </p>
        <p className="text-lg leading-relaxed">
          Recent Computer Engineering graduate from the University of Isfahan (GPA 18/20),
          focused on building REST APIs with ASP.NET Core and Django, and designing systems
          with Clean Architecture, PostgreSQL, Docker, and message-driven infrastructure
          like RabbitMQ and Redis. Also experienced with computer vision and deep learning
          using TensorFlow.
        </p>
        <LinkButton href="/about" variant="ghost" className="mt-4 px-0 text-accent">
          More about me →
        </LinkButton>
      </Container>
    </section>
  );
}