import Section from "./Section";
import SectionHeading from "./SectionHeading";
import FadeIn from "./FadeIn";
import Button from "@/components/ui/Button";

const pricingSteps = [
  {
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "$0 Upfront",
    description: "No setup fees, no monthly minimums. We invest in your success first.",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "We Generate Revenue",
    description: "Plaibook finds and closes deals your team is currently missing.",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "We Share the Upside",
    description: "Our fee is a percentage of new revenue we help you capture.",
  },
];

export default function PricingSection() {
  return (
    <Section bg="gray" id="pricing">
      <SectionHeading
        eyebrow="Pricing"
        title="We Only Win When You Win"
        description="Performance-based pricing tied to the revenue we generate. No upfront costs, no long-term contracts."
        eyebrowColor="gold"
      />

      <div className="max-w-3xl mx-auto">
        <FadeIn>
          {/* Pricing model visual */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-12">
            {/* 3-step pricing flow */}
            <div className="grid sm:grid-cols-3 gap-8 mb-10">
              {pricingSteps.map((step) => (
                <div key={step.title} className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary-lightest flex items-center justify-center mx-auto mb-4">
                    {step.icon}
                  </div>
                  <h3 className="font-bold text-text-primary mb-1">{step.title}</h3>
                  <p className="text-sm text-text-muted">{step.description}</p>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 pt-8">
              <div className="text-center mb-8">
                <p className="text-text-secondary">
                  Plans scale with your team. Whether you have 3 reps or 300, we build a package around your goals.
                </p>
              </div>

              {/* Compact tier indicators */}
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 rounded-xl bg-surface-alt">
                  <div className="text-sm font-semibold text-text-primary">Small Teams</div>
                  <div className="text-xs text-text-muted mt-1">1–5 reps</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-primary-lightest border border-primary/20">
                  <div className="text-sm font-semibold text-primary">Growing Teams</div>
                  <div className="text-xs text-text-muted mt-1">5–20 reps</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-surface-alt">
                  <div className="text-sm font-semibold text-text-primary">Enterprise</div>
                  <div className="text-xs text-text-muted mt-1">20+ reps</div>
                </div>
              </div>

              <div className="text-center">
                <Button href="/demo" size="lg">
                  Get Your Custom Quote
                </Button>
                <p className="text-xs text-text-muted mt-3">No credit card required</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
