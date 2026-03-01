"use client";

import dynamic from "next/dynamic";
import Section from "@/components/marketing/Section";
import FadeIn from "@/components/marketing/FadeIn";
import CallFeed from "@/components/mockups/CallFeed";
import SMSConversation from "@/components/mockups/SMSConversation";

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
    <Section id="how-it-works" bg="white" spacing="none" className="pt-14 pb-16 sm:pb-24">
      <FadeIn direction="up">
        <p className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-16">
          Here&apos;s what happens when you turn Plaibook on.
        </p>
      </FadeIn>

      <div className="space-y-20 md:space-y-28">
        {/* Beat 1 */}
        <Beat
          number="01"
          headline="Every interaction is analyzed and graded."
          body="Every sales call is scored against your quality control checkpoints the moment it ends. Not a sample. Not the ones your reps choose to report. Every call, every rep, every day."
          caption="Your entire team scored in real time. No spreadsheets. No sampling."
        >
          <CallFeed />
        </Beat>

        {/* Beat 2 */}
        <Beat
          number="02"
          headline="Know how customers are won and lost."
          body={`See which objections are killing deals, what your top reps do differently, and where coaching will move the needle. Click any objection to drill into the calls behind it.`}
          caption="Revenue lost by objection. What worked. What didn't. All the way down to the call."
          reversed
        >
          <InteractiveDemo />
        </Beat>

        {/* Beat 3 */}
        <Beat
          number="03"
          headline="Close missed deals."
          body={`When a lead doesn\u2019t close on the call, Plaibook picks it up over text \u2014 handles objections, answers questions, and closes the deal. Contract signed, payment collected, automatically.`}
          caption="A real conversation. A real close. That revenue would have slipped away."
        >
          <div className="flex justify-center">
            <SMSConversation />
          </div>
        </Beat>
      </div>

    </Section>
  );
}
