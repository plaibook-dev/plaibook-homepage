"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Section from "./Section";
import FadeIn from "./FadeIn";
import FeatureCard from "./FeatureCard";
import CTASection from "./CTASection";

interface Feature {
  readonly title: string;
  readonly description: string;
}

interface Stat {
  readonly value: string;
  readonly label: string;
}

interface Props {
  eyebrow: string;
  headline: string;
  subheadline: string;
  problemStatement: string;
  features: readonly Feature[];
  stat: Stat;
  cta: string;
}

export default function ProductPageTemplate({
  eyebrow,
  headline,
  subheadline,
  problemStatement,
  features,
  stat,
  cta,
}: Props) {
  return (
    <>
      {/* Hero */}
      <section className="bg-surface-warm pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm font-semibold uppercase tracking-widest text-primary mb-4 font-mono"
            >
              {eyebrow}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary tracking-tight leading-[1.1]"
            >
              {headline}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg text-text-secondary max-w-2xl leading-relaxed"
            >
              {subheadline}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <Button href="/demo" size="lg">
                {cta}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-accent-red mb-3 font-mono">
                The Problem
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
                Sound Familiar?
              </h2>
              <p className="text-text-secondary leading-relaxed text-lg">
                {problemStatement}
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex justify-center">
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold text-primary font-mono">
                  {stat.value}
                </div>
                <div className="text-sm text-text-muted mt-2">{stat.label}</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Features */}
      <Section bg="gray">
        <FadeIn className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3 font-mono">
            Features
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
            How It Works
          </h2>
        </FadeIn>
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              index={i}
            />
          ))}
        </div>
      </Section>

      {/* CTA */}
      <CTASection
        headline="Ready to Get Started?"
        description="See how this works for your business with a personalized demo."
        ctaText={cta}
        ctaHref="/demo"
      />
    </>
  );
}
