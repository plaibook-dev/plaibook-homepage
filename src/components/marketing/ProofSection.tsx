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
        <StatBlock value="$37K" label="in revenue traced to a single objection" light />
        <StatBlock value="110" label="abandoned leads per account per month" light />
        <StatBlock value="$650K+" label="closed from one SMS upsell campaign" light />
        <StatBlock value="100%" label="of calls scored without a manager listening" light />
      </div>

      {/* BRD narrative */}
      <FadeIn delay={0.1}>
        <div className="max-w-3xl">
          <p className="text-lg text-text-light/90 font-medium leading-relaxed mb-2">
            BRD Pest Solutions turned on Plaibook&apos;s SMS engine to upsell
            mosquito treatments to their existing customer base. It closed over
            $700K in new revenue &mdash; and they had to shut it off. Not
            because it stopped working. Because they ran out of mosquito product
            and couldn&apos;t service the accounts they&apos;d already sold.
          </p>
          <a
            href="/case-study"
            className="text-primary hover:text-primary-light text-sm font-medium transition-colors"
          >
            See the full case study &rarr;
          </a>
        </div>
      </FadeIn>

      {/* Testimonial video */}
      <FadeIn delay={0.15}>
        <div className="mt-12 max-w-4xl">
          <video
            className="w-full rounded-lg shadow-2xl"
            controls
          >
            <source
              src={TESTIMONIALS.taylorChristensen.videoUrl}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="mt-8">
          <QuoteBlock
            quote={TESTIMONIALS.taylorChristensen.quote}
            name={TESTIMONIALS.taylorChristensen.name}
            company={TESTIMONIALS.taylorChristensen.company}
            variant="dark"
          />
        </div>
      </FadeIn>

    </Section>
  );
}
