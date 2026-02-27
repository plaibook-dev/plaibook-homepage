"use client";

import Button from "@/components/ui/Button";
import FadeIn from "@/components/marketing/FadeIn";
import PixelatedVideo from "@/components/ui/PixelatedVideo";
import { DEMO_URL } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] overflow-hidden"
    >
      <PixelatedVideo
        src="https://plaibook-homepage-assets.s3.amazonaws.com/videos/hero-background.mp4"
      />
      <div className="absolute inset-0 z-10 flex items-center justify-end px-4 sm:px-6 lg:px-24">
        <div>
          {/* Text column */}
          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 max-w-xl" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.7)' }}>
            <FadeIn direction="up" delay={0.1}>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-text-light font-bold leading-tight">
                Your Call Center
                <br />
                <span className="text-accent-red">Bleeds Money</span>
              </h1>
            </FadeIn>

            <FadeIn direction="up" delay={0.25}>
              <p className="mt-6 text-xl text-text-light/90 font-medium leading-relaxed">
                Plaibook shows you exactly how much revenue you&apos;re losing,
                which objections are killing your deals, and then recovers the
                ones your reps dropped &mdash; automatically.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.4}>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <Button href={DEMO_URL} variant="primary" size="lg">
                  Book a Demo
                </Button>
                <a
                  href="#how-it-works"
                  className="text-text-light/80 hover:text-text-light text-base font-medium transition-colors"
                >
                  See how much you&apos;re losing &darr;
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
