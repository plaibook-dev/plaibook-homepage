import type { Metadata } from "next";
import HeroSection from "@/components/marketing/HeroSection";
import DisconnectedSystemsSection from "@/components/marketing/DisconnectedSystemsSection";
import HowItWorksSection from "@/components/marketing/HowItWorksSection";
import TestimonialBanner from "@/components/marketing/TestimonialBanner";
import CaseStudyVideoSection from "@/components/marketing/CaseStudyVideoSection";
import FinalCTASection from "@/components/marketing/FinalCTASection";
import type { WithContext, SoftwareApplication, FAQPage } from "schema-dts";

export const metadata: Metadata = {
  title: "Plaibook — Everything You Need to Hit All Your Sales Targets",
  description:
    "Plaibook shows you exactly how much revenue your call center is losing, which objections are killing deals, and recovers the ones your reps dropped — contracts signed, payments collected, automatically.",
  alternates: {
    canonical: "https://plaibook.tech",
  },
};

const softwareJsonLd: WithContext<SoftwareApplication> = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Plaibook",
  applicationCategory: "BusinessApplication",
  description:
    "Plaibook shows you exactly how much revenue your call center is losing, which objections are killing deals, and recovers missed revenue over text. Built for pest control and home service businesses.",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description:
      "Book a demo to see your sales floor through Plaibook.",
  },
};

const faqJsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does Plaibook work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Plaibook records and transcribes every sales call, scores them against quality control checkpoints, and automatically follows up with leads that didn't close via SMS — handling objections and closing deals without human involvement.",
      },
    },
    {
      "@type": "Question",
      name: "What results has Plaibook produced?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "One customer closed over $700,000 in new revenue from a single SMS upsell campaign. Across customers, Plaibook scores 93% of calls automatically and recovers 5-15% of unclosed leads over text.",
      },
    },
    {
      "@type": "Question",
      name: "What phone systems does Plaibook integrate with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Plaibook integrates with major phone systems and connects to FieldRoutes to verify call outcomes against actual CRM records.",
      },
    },
    {
      "@type": "Question",
      name: "Does Plaibook replace my sales team?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Plaibook augments your team by handling follow-ups and recovering leads that would otherwise be lost. Your closers still close — Plaibook catches what they miss.",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <HeroSection />
      <DisconnectedSystemsSection />
      <HowItWorksSection />
      <TestimonialBanner />
      <CaseStudyVideoSection />
      <FinalCTASection />
    </>
  );
}
