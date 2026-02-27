"use client";

import dynamic from "next/dynamic";
import Section from "@/components/marketing/Section";
import FadeIn from "@/components/marketing/FadeIn";
import QuoteBlock from "@/components/marketing/QuoteBlock";
import CallFeed from "@/components/mockups/CallFeed";
import SMSConversation from "@/components/mockups/SMSConversation";
import { TESTIMONIALS } from "@/lib/constants";

const InteractiveDemo = dynamic(
  () => import("@/components/mockups/InteractiveDemo"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[400px] bg-slate-50 rounded-xl animate-pulse" />
    ),
  }
);

interface BeatProps {
  number: string;
  headline: string;
  body: string;
  caption: string;
  children: React.ReactNode;
  reversed?: boolean;
}

function Beat({
  number,
  headline,
  body,
  caption,
  children,
  reversed,
}: BeatProps) {
  return (
    <div
      className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${
        reversed ? "md:[direction:rtl] md:*:[direction:ltr]" : ""
      }`}
    >
      <div>
        <FadeIn direction="up">
          <p className="text-xs font-mono text-primary font-medium tracking-wider uppercase mb-3">
            {number}
          </p>
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-4">
            {headline}
          </h3>
          <p className="text-text-secondary leading-relaxed">{body}</p>
        </FadeIn>
      </div>
      <div>
        <FadeIn direction="up" delay={0.15}>
          {children}
          <p className="text-center text-xs text-text-muted mt-3">{caption}</p>
        </FadeIn>
      </div>
    </div>
  );
}

export default function HowItWorksSection() {
  return (
    <Section id="how-it-works" bg="white" spacing="default">
      <FadeIn>
        <p className="text-sm text-text-muted font-medium mb-12 max-w-xl">
          Here&apos;s what changes when you turn Plaibook on.
        </p>
      </FadeIn>

      <div className="space-y-20 md:space-y-28">
        {/* Beat 1 */}
        <Beat
          number="01"
          headline="We hear everything."
          body="Every sales call — both sides — recorded, transcribed, and scored against your quality control checkpoints. Not a sample. Not the ones your reps choose to report. Every call, every time, tied to the outcome in FieldRoutes."
          caption="Both sides. Every call. Scored automatically."
        >
          <CallFeed />
        </Beat>

        {/* Beat 2 */}
        <Beat
          number="02"
          headline="You see where deals break."
          body="Click any chart and see exactly which calls are behind that number. Click a call and you're reading the transcript, seeing which checkpoints were hit or missed, reading the coaching notes. You're never stuck at the summary level."
          caption="Click any data point. See exactly what's behind it."
          reversed
        >
          <InteractiveDemo />
        </Beat>

        {/* Beat 3 */}
        <Beat
          number="03"
          headline="Missed deals get closed."
          body={`When a lead doesn\u2019t close on the call, Plaibook picks it up over text \u2014 handles objections, answers questions, and closes the deal. Subscription created in FieldRoutes, contract signed, payment collected. Not \u201Cbooks a callback.\u201D Closed.`}
          caption="A real conversation. A real close. No human follow-up."
        >
          <div className="flex justify-center">
            <SMSConversation />
          </div>
        </Beat>
      </div>

      {/* Matt Muller quote */}
      <FadeIn delay={0.1}>
        <div className="mt-20">
          <QuoteBlock
            quote={TESTIMONIALS.mattMuller.quote}
            name={TESTIMONIALS.mattMuller.name}
            company={TESTIMONIALS.mattMuller.company}
            variant="fullWidth"
          />
        </div>
      </FadeIn>
    </Section>
  );
}
