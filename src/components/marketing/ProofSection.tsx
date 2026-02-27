"use client";

import Section from "@/components/marketing/Section";
import FadeIn from "@/components/marketing/FadeIn";
import StatBlock from "@/components/marketing/StatBlock";
import QuoteBlock from "@/components/marketing/QuoteBlock";
import { TESTIMONIALS } from "@/lib/constants";

export default function ProofSection() {
  return (
    <Section id="results" bg="dark" spacing="default">
      <FadeIn>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-light mb-12">
          Numbers from real pest control companies using Plaibook.
        </h2>
      </FadeIn>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16">
        <StatBlock value="786" label="deals closed over text in a single campaign" light />
        <StatBlock value="93%" label="of calls scored without a manager listening" light />
        <StatBlock value="$36K" label="in revenue recovered from unfollowed leads" light />
        <StatBlock value="5-15%" label="tunable SMS conversion rate across campaigns" light />
      </div>

      {/* BRD narrative */}
      <FadeIn delay={0.1}>
        <div className="max-w-3xl">
          <p className="text-text-light/80 leading-relaxed mb-2">
            One customer turned on Plaibook&apos;s SMS engine for mosquito
            upsells. It closed over $700K in new revenue before they shut it off
            &mdash; not because it stopped working, but because they sold more
            than their techs could service. That&apos;s an edge case, but it
            shows what happens when closeable leads stop falling through the
            cracks.
          </p>
          <a
            href="#"
            className="text-primary hover:text-primary-light text-sm font-medium transition-colors"
          >
            See the full case study &rarr;
          </a>
        </div>
      </FadeIn>

      {/* Nick Boettcher quote */}
      <FadeIn delay={0.15}>
        <div className="mt-12">
          <QuoteBlock
            quote={TESTIMONIALS.nickBoettcher.quote}
            name={TESTIMONIALS.nickBoettcher.name}
            company={TESTIMONIALS.nickBoettcher.company}
            variant="dark"
          />
        </div>
      </FadeIn>
    </Section>
  );
}
