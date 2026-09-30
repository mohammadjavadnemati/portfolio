import { Container } from "@/app/_components/container";
import { LinkButton } from "@/app/_components/ui/button";

export function ContactCTA() {
  return (
    <section className="py-20">
      <Container className="flex flex-col items-center text-center">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Let's work together
        </h2>
        <p className="mt-3 max-w-md text-muted">
          Open to backend and full-stack opportunities. Feel free to reach out.
        </p>
        <LinkButton href="/contact" variant="primary" className="mt-6">
          Contact Me
        </LinkButton>
      </Container>
    </section>
  );
}