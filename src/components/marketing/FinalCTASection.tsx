import Section from "@/components/marketing/Section";
import FadeIn from "@/components/marketing/FadeIn";
import Button from "@/components/ui/Button";
import { DEMO_URL } from "@/lib/constants";

export default function FinalCTASection() {
  return (
    <Section bg="dark" spacing="loose">
      <div className="text-center max-w-2xl mx-auto">
        <FadeIn>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-light mb-6">
            See where your revenue is leaking.
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-text-light/70 text-lg mb-10 leading-relaxed">
            Book a 20-minute walkthrough. We&apos;ll show you your sales floor
            through Plaibook &mdash; where leads are slipping, where reps are
            struggling, and where money is sitting on the table.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <Button href={DEMO_URL} variant="white" size="lg">
            Book a Demo
          </Button>
          <p className="text-text-light/50 text-sm mt-6">
            No credit card. No commitment. Just a clear look at what
            you&apos;re missing.
          </p>
        </FadeIn>
      </div>
    </Section>
  );
}
