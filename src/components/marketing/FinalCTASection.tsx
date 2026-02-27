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
          <p className="text-text-light/70 text-lg mb-4 leading-relaxed">
            We&apos;ll connect to your calls, backfill 30&nbsp;days of data, and
            show you exactly where the money is going&thinsp;&mdash;&thinsp;free.
          </p>
          <p className="text-text-light/50 text-sm mb-10 leading-relaxed">
            We&apos;re not an SMS blast tool. We listen to your calls first, find
            the right leads, then follow up intelligently.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <Button href={DEMO_URL} variant="white" size="lg">
            Book a Demo
          </Button>
          <p className="text-text-light/50 text-sm mt-6">
            Free for 30&nbsp;days. No credit card. Cancel anytime.
          </p>
        </FadeIn>
      </div>
    </Section>
  );
}
