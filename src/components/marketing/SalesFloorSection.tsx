"use client";

import Section from "@/components/marketing/Section";
import FadeIn from "@/components/marketing/FadeIn";
import QuoteBlock from "@/components/marketing/QuoteBlock";
import QCScorecard from "@/components/mockups/QCScorecard";
import CampaignRecoveryView from "@/components/mockups/CampaignRecoveryView";
import MarketingAttributionView from "@/components/mockups/MarketingAttributionView";
import { TESTIMONIALS } from "@/lib/constants";

interface BlockProps {
  headline: string;
  body: string;
  caption: string;
  children: React.ReactNode;
  reversed?: boolean;
}

function SalesFloorBlock({
  headline,
  body,
  caption,
  children,
  reversed,
}: BlockProps) {
  return (
    <div
      className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${
        reversed ? "md:[direction:rtl] md:*:[direction:ltr]" : ""
      }`}
    >
      <div>
        <FadeIn direction="up">
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-4">
            &ldquo;{headline}&rdquo;
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

export default function SalesFloorSection() {
  return (
    <Section bg="gray" spacing="default">
      <FadeIn>
        <p className="text-sm text-text-muted font-medium mb-12">
          What your Monday morning looks like with Plaibook — whether you run the sales floor or the ad spend.
        </p>
      </FadeIn>

      <div className="space-y-20 md:space-y-28">
        {/* Block 1: QC Scorecard */}
        <SalesFloorBlock
          headline="Are my reps following the process?"
          body="Every call scored against your quality control checkpoints automatically — did they ask for the sale, handle the price objection, mention the upsell. You see the whole team at a glance, every day, without listening to a single recording. When someone's slipping, the AI Coach sends them specific feedback tied to their actual calls, so you don't have to have the conversation yourself."
          caption="Every rep. Every checkpoint. Every day. No listening required."
        >
          <QCScorecard />
        </SalesFloorBlock>

        {/* Block 2: Campaign Recovery */}
        <SalesFloorBlock
          headline="What's happening to the deals we don't close?"
          body="Leads that don't close on the call get picked up automatically. You can see which leads are in active SMS conversations, which ones have been re-engaged, and which ones closed over text. The revenue your team would have left on the table shows up in your dashboard as recovered deals."
          caption="Deals your team lost, recovered automatically."
          reversed
        >
          <CampaignRecoveryView />
        </SalesFloorBlock>

        {/* Block 3: Marketing Attribution */}
        <SalesFloorBlock
          headline="Which campaigns actually make money?"
          body="See revenue per lead per campaign — not just clicks or calls, but actual closed deals traced back to the keyword that started them. When 26% of your termite-inspection leads are unqualified because of WDI documentation requests, you'll know to reallocate that spend before the month is over."
          caption="Revenue-per-lead by source. Not vanity metrics — closed deals."
        >
          <MarketingAttributionView />
        </SalesFloorBlock>
      </div>

      {/* David Evans quote */}
      <FadeIn delay={0.1}>
        <div className="mt-16">
          <QuoteBlock
            quote={TESTIMONIALS.jeffDavis.quote}
            name={TESTIMONIALS.jeffDavis.name}
            company={TESTIMONIALS.jeffDavis.company}
            variant="inline"
          />
        </div>
      </FadeIn>
    </Section>
  );
}
