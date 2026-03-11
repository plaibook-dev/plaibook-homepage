"use client";

import { useEffect, useRef } from "react";
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
          <p className="text-xs font-mono text-primary font-medium tracking-widest uppercase mb-3">
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

function ProgressLine() {
  const lineRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerDotRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-0.5 hidden md:block">
      <div className="absolute inset-0 bg-text-muted/20" />
      <div
        ref={lineRef}
        className="progress-line-fill absolute top-0 left-0 right-0 bg-primary"
        style={{ height: "0%" }}
      />
      {[0, 1, 2].map((step) => (
        <div
          key={step}
          ref={(el) => { dotRefs.current[step] = el; }}
          className="progress-dot absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 bg-white border-text-muted/40"
          style={{ top: `${step * 50}%`, transition: "background-color 0.3s, border-color 0.3s" }}
        >
          <div
            ref={(el) => { innerDotRefs.current[step] = el; }}
            className="absolute inset-1 rounded-full bg-transparent"
            style={{ transition: "background-color 0.3s" }}
          />
        </div>
      ))}
    </div>
  );
}

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const line = section.querySelector<HTMLDivElement>(".progress-line-fill");
    const dots = section.querySelectorAll<HTMLDivElement>(".progress-dot");
    if (!line) return;

    let prevStep = -1;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Each dot activates when it crosses the 3/4 line on the viewport
      const triggerLine = windowHeight * 0.75;
      const scrolled = triggerLine - rect.top;
      const pct = Math.min(100, Math.max(0, (scrolled / rect.height) * 100));

      // Direct DOM write — no React re-render
      line.style.height = `${pct}%`;

      // Dots are at 0%, 50%, 100% — activate each when the line reaches it
      const step = pct >= 99 ? 2 : pct >= 50 ? 1 : pct > 2 ? 0 : -1;
      if (step !== prevStep) {
        prevStep = step;
        dots.forEach((dot, i) => {
          const active = i <= step;
          dot.style.backgroundColor = active ? "var(--color-primary)" : "white";
          dot.style.borderColor = active ? "var(--color-primary)" : "var(--color-text-muted)";
          const inner = dot.firstElementChild as HTMLDivElement | null;
          if (inner) inner.style.backgroundColor = active ? "white" : "transparent";
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Section id="how-it-works" bg="white" spacing="none" className="pt-14 pb-16 sm:pb-24">
      <FadeIn direction="up">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-16 text-center">
          Here&apos;s what happens when you turn Plaibook on.
        </h2>
      </FadeIn>

      <div ref={sectionRef} className="relative">
        {/* Progress line with dots */}
        <ProgressLine />

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
