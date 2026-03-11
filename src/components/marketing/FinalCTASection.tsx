import Link from "next/link";
import Section from "@/components/marketing/Section";
import FadeIn from "@/components/marketing/FadeIn";
import Button from "@/components/ui/Button";
import { DEMO_URL, GAMETAPE_LABEL, GAMETAPE_URL } from "@/lib/constants";

export default function FinalCTASection() {
  return (
    <Section bg="dark" spacing="loose">
      <div className="text-center max-w-2xl mx-auto">
        <FadeIn>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-light mb-6">
            Ready to stop leaving money on the table?
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-text-light/70 text-lg mb-10 leading-relaxed">
            See what Plaibook finds in your first 30&nbsp;days&thinsp;&mdash;&thinsp;free.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <Button href={DEMO_URL} variant="white" size="lg">
            Book a Demo
          </Button>
          <p className="text-text-light/50 text-sm mt-6">
            Free for 30&nbsp;days. No credit card. Cancel anytime.
          </p>
          <p className="text-text-light/40 text-sm mt-4">
            Not ready yet?{" "}
            <Link
              href={GAMETAPE_URL}
              className="text-primary/70 hover:text-primary transition-colors underline"
            >
              Read the {GAMETAPE_LABEL}
            </Link>{" "}
            for pest control sales benchmarks and tips from real call data.
          </p>
        </FadeIn>
      </div>
    </Section>
  );
}
