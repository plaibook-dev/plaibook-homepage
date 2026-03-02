"use client";

import { useEffect, useRef, useState } from "react";
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
      <div className="border border-text-muted/20 rounded-2xl p-6 md:p-8">
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
      <div className="border border-text-muted/20 rounded-2xl p-6 md:p-8">
        <FadeIn direction="up" delay={0.15}>
          {children}
          <p className="text-center text-xs text-text-muted mt-3">{caption}</p>
        </FadeIn>
      </div>
    </div>
  );
}

function ProgressLine({ progress, activeStep }: { progress: number; activeStep: number }) {
  return (
    <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-0.5 hidden md:block">
      {/* Background line */}
      <div className="absolute inset-0 bg-text-muted/20" />

      {/* Filled progress line */}
      <div
        className="absolute top-0 left-0 right-0 bg-primary transition-all duration-150 ease-out"
        style={{ height: `${progress}%` }}
      />

      {/* Dots for each step */}
      {[0, 1, 2].map((step) => (
        <div
          key={step}
          className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
            step <= activeStep
              ? "bg-primary border-primary"
              : "bg-white border-text-muted/40"
          }`}
          style={{ top: `${step * 50}%` }}
        >
          {/* Inner dot */}
          <div
            className={`absolute inset-1 rounded-full transition-all duration-300 ${
              step <= activeStep ? "bg-white" : "bg-transparent"
            }`}
          />
        </div>
      ))}
    </div>
  );
}

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate progress through the section
      // Start filling when section enters viewport, complete when section exits
      const startOffset = windowHeight * 0.3; // Start when 30% into viewport
      const scrolled = startOffset - sectionTop;
      const totalScrollable = sectionHeight - windowHeight * 0.4;

      const rawProgress = (scrolled / totalScrollable) * 100;
      const clampedProgress = Math.min(100, Math.max(0, rawProgress));

      setProgress(clampedProgress);

      // Determine active step based on progress
      if (clampedProgress >= 66) {
        setActiveStep(2);
      } else if (clampedProgress >= 33) {
        setActiveStep(1);
      } else if (clampedProgress > 5) {
        setActiveStep(0);
      } else {
        setActiveStep(-1);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Section id="how-it-works" bg="white" spacing="none" className="pt-14 pb-16 sm:pb-24">
      <FadeIn direction="up">
        <p className="font-heading text-xl md:text-2xl font-bold text-text-primary mb-16 text-center">
          Here&apos;s what happens when you turn Plaibook on.
        </p>
      </FadeIn>

      <div ref={sectionRef} className="relative">
        {/* Progress line with dots */}
        <ProgressLine progress={progress} activeStep={activeStep} />

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
      </div>

    </Section>
  );
}
