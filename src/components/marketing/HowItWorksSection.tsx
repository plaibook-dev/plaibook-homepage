import Section from "./Section";
import SectionHeading from "./SectionHeading";
import FadeIn from "./FadeIn";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";

const steps = [
  {
    step: "01",
    title: "We Listen to Every Call",
    description:
      "Plaibook's AI analyzes every sales call — scoring objection handling, upselling, closing technique, and customer sentiment in real-time.",
    media: {
      type: "screenshot" as const,
      aspectRatio: "4/3",
      description:
        "Call analysis interface showing a call recording waveform with AI-generated annotations overlaid: 'Objection handled well', 'Missed upsell opportunity', 'Customer sentiment: positive'. A call score badge shows 'Score: 82/100'.",
      browserChrome: true,
    },
  },
  {
    step: "02",
    title: "We Find the Leaks",
    description:
      "Our analytics pinpoint exactly where leads drop off, which reps need coaching, and what patterns lead to closed deals versus lost ones.",
    media: {
      type: "screenshot" as const,
      aspectRatio: "4/3",
      description:
        "Revenue analytics dashboard showing a bar chart of close rates by rep, a funnel health indicator, and a highlighted insight card: 'Top leak: 34% of leads receive no follow-up within 24h'.",
      browserChrome: true,
    },
  },
  {
    step: "03",
    title: "AI Follows Up Automatically",
    description:
      "Every missed opportunity gets an instant, personalized follow-up. AI-powered SMS conversations re-engage leads and close upsales — 24/7.",
    media: {
      type: "screenshot" as const,
      aspectRatio: "9/16",
      description:
        "Phone showing an AI-powered SMS conversation with a customer. Customer asks about pricing, AI responds with a personalized quote referencing their recent pest inspection, customer responds 'sounds good, when can you come out?' Subtle 'AI' badge shows it's automated.",
      phoneFrame: true,
    },
  },
  {
    step: "04",
    title: "Revenue Goes Up",
    description:
      "Close rates improve, average ticket size grows, and no lead ever falls through the cracks again. More revenue from the same leads.",
    media: {
      type: "diagram" as const,
      aspectRatio: "4/3",
      description:
        "Before/after revenue chart. Left side shows flat monthly revenue around $80K, right side (after Plaibook implementation, marked with a green dotted line) shows a clear upward trend reaching $230K. Callout: '+$147K/week'.",
      browserChrome: true,
    },
  },
];

export default function HowItWorksSection() {
  return (
    <Section bg="cream" id="how-it-works">
      <SectionHeading
        eyebrow="How It Works"
        title="From Leaky Funnel to Revenue Machine"
        description="Four steps to closing more deals with the leads you already have."
        align="center"
      />

      <div className="mt-12 lg:mt-16">
        {steps.map((step, i) => {
          const isReversed = i % 2 === 1;
          const isPhoneStep = !!step.media.phoneFrame;

          return (
            <div key={step.step}>
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* Text side */}
                <div className={isReversed ? "lg:order-2" : ""}>
                  <FadeIn type="default" delay={0.1}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold font-mono">
                        {step.step}
                      </div>
                      <div className="h-px bg-primary/20 flex-1" />
                    </div>
                    <h3 className="text-2xl font-bold text-text-primary mb-3">
                      {step.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </FadeIn>
                </div>

                {/* Visual side */}
                <div className={isReversed ? "lg:order-1" : ""}>
                  <FadeIn
                    type="dramatic"
                    delay={0.2}
                    direction={isReversed ? "left" : "right"}
                  >
                    {isPhoneStep ? (
                      <div className="flex justify-center">
                        <MediaPlaceholder
                          type={step.media.type}
                          aspectRatio={step.media.aspectRatio}
                          description={step.media.description}
                          browserChrome={step.media.browserChrome || false}
                          phoneFrame={step.media.phoneFrame || false}
                          className="mx-auto"
                        />
                      </div>
                    ) : (
                      <MediaPlaceholder
                        type={step.media.type}
                        aspectRatio={step.media.aspectRatio}
                        description={step.media.description}
                        browserChrome={step.media.browserChrome || false}
                        phoneFrame={step.media.phoneFrame || false}
                      />
                    )}
                  </FadeIn>
                </div>
              </div>

              {/* Connecting line between steps */}
              {i < steps.length - 1 && (
                <div className="flex justify-center py-4 lg:py-8">
                  <div className="w-px h-12 bg-primary/20" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
