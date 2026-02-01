"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-surface-warm">
      {/* Subtle dot grid background pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(106, 168, 154, 0.04) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 w-full">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left column — text */}
          <div>
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm font-semibold uppercase tracking-widest text-primary mb-6 font-mono"
            >
              AI-Powered Sales Optimization
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary tracking-tight leading-[1.1]"
            >
              Your Sales Funnel Is{" "}
              <span className="text-accent-red">Leaking.</span>
              <br />
              We <span className="text-primary">Plug the Holes.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg text-text-secondary max-w-xl leading-relaxed"
            >
              Your techs are on time. Your routes are optimized. But are your
              reps actually closing? Plaibook uses AI to analyze every sales
              call, automate follow-ups, and turn missed opportunities into
              revenue.
            </motion.p>

            {/* Stat callout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex items-center gap-3"
            >
              <span className="text-3xl font-bold text-accent-gold font-mono">
                $147K
              </span>
              <div>
                <span className="text-sm text-text-secondary">
                  additional revenue per week
                </span>
                <span className="text-xs text-text-muted block">
                  — BRD Pest Solutions
                </span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <Button href="/demo" size="lg">
                Book a Demo
              </Button>
              <Button href="#how-it-works" variant="soft" size="lg">
                See How It Works
              </Button>
            </motion.div>
          </div>

          {/* Right column — product visual */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-12 lg:mt-0"
          >
            <MediaPlaceholder
              type="screenshot"
              aspectRatio="4/3"
              description="Plaibook analytics dashboard showing revenue chart trending upward, call scoring sidebar with rep rankings, and a highlighted 'Close Rate: 75%' metric. Address bar shows app.plaibook.tech."
              browserChrome
              className="lg:rotate-1 shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
