"use client";

import Button from "@/components/ui/Button";
import FadeIn from "@/components/marketing/FadeIn";
import LeakyFunnel from "@/components/marketing/LeakyFunnel";
import { DEMO_URL } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-gradient-to-br from-bg-dark via-[#162032] to-[#1a2840] noise-texture overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="grid md:grid-cols-[55%_45%] gap-12 md:gap-8 items-center">
          {/* Text column */}
          <div>
            <FadeIn direction="up" delay={0.1}>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-text-light font-bold leading-tight">
                Pest control companies are bleeding money.
                <br />
                <span className="text-primary">
                  Plaibook finds where and stops it.
                </span>
              </h1>
            </FadeIn>

            <FadeIn direction="up" delay={0.25}>
              <p className="mt-6 text-lg text-text-light/80 max-w-xl leading-relaxed">
                We listen to every sales call your team makes, show you exactly
                where deals are breaking down, and recover missed revenue over
                text &mdash; contracts signed, payments collected, no human
                follow-up required.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.4}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href={DEMO_URL} variant="primary" size="lg">
                  Book a Demo
                </Button>
                <a
                  href="#how-it-works"
                  className="text-text-light/70 hover:text-text-light text-sm font-medium transition-colors"
                >
                  See where the money goes &darr;
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Visual column */}
          <div className="relative">
            <div className="absolute -inset-12 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <FadeIn direction="up" delay={0.5} type="dramatic">
              <LeakyFunnel className="relative" />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
