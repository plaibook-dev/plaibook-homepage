"use client";

import Section from "@/components/marketing/Section";
import FadeIn from "@/components/marketing/FadeIn";
import { TESTIMONIALS } from "@/lib/constants";

export default function CaseStudyVideoSection() {
  return (
    <Section bg="dark" spacing="default">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <p className="text-xs font-mono uppercase tracking-widest text-primary mb-4">
            Case Study
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-light mb-4">
            BRD Pest Solutions: 10x daily revenue with outbound SMS
          </h2>
          <p className="text-text-light/60 leading-relaxed mb-10 max-w-2xl">
            See how one pest control company used Plaibook to recover abandoned
            leads over text and close $500K+ in new revenue from a single
            campaign.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <video
            controls
            preload="metadata"
            className="w-full rounded-lg shadow-2xl"
            poster=""
          >
            <source
              src={TESTIMONIALS.taylorChristensen.videoUrl}
              type="video/mp4"
            />
          </video>
          <p className="text-center text-sm text-text-light/50 mt-4">
            Taylor Christensen, Marketing Director &mdash; BRD Pest Solutions
          </p>
        </FadeIn>
      </div>
    </Section>
  );
}
