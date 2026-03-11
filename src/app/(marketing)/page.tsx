import type { Metadata } from "next";
import HeroSection from "@/components/marketing/HeroSection";
import DisconnectedSystemsSection from "@/components/marketing/DisconnectedSystemsSection";
import HowItWorksSection from "@/components/marketing/HowItWorksSection";
import TestimonialBanner from "@/components/marketing/TestimonialBanner";
import CaseStudyVideoSection from "@/components/marketing/CaseStudyVideoSection";
import FinalCTASection from "@/components/marketing/FinalCTASection";
import type { WithContext, SoftwareApplication, FAQPage } from "schema-dts";

export const metadata: Metadata = {
  title:
    "Plaibook — AI-Powered Sales Analytics & Revenue Recovery for Pest Control",
  description:
    "Plaibook analyzes every pest control sales call, scores reps on script adherence, identifies which objections kill deals, and recovers unclosed leads over SMS. Built for home service companies that sell over the phone.",
  alternates: {
    canonical: "https://plaibook.tech",
  },
  keywords: [
    "pest control sales software",
    "pest control CRM",
    "home services sales analytics",
    "call center quality assurance",
    "pest control close rate",
    "AI sales coaching",
    "pest control revenue recovery",
    "sales rep performance tracking",
  ],
};

const softwareJsonLd: WithContext<SoftwareApplication> = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Plaibook",
  applicationCategory: "BusinessApplication",
  description:
    "AI-powered sales analytics and revenue recovery platform for pest control and home service companies. Analyzes every sales call, scores rep performance, identifies objection patterns, and recovers unclosed leads via AI-powered SMS conversations.",
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
      name: "How does Plaibook work for pest control companies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Plaibook connects to your phone system and automatically transcribes, scores, and analyzes every sales call. Each call is scored against quality checkpoints like mentioning the guarantee, handling price objections, and asking for the sale. Unclosed leads are automatically followed up via AI-powered SMS that handles objections and books appointments.",
      },
    },
    {
      "@type": "Question",
      name: "What results has Plaibook produced for pest control companies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BRD Pest Solutions generated over $500,000 in new revenue from a single SMS upsell campaign, with 786 deals closed directly over text and a 17x increase in weekly appointments. Across customers, Plaibook typically recovers 5-15% of unclosed leads through automated follow-up.",
      },
    },
    {
      "@type": "Question",
      name: "What phone systems and CRMs does Plaibook integrate with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Plaibook integrates with Five9, Genesys, RingCentral, Zoom, CallRail, and GoHighLevel for call recording ingestion. It connects to FieldRoutes for CRM data, appointment scheduling, and contract management. The platform works with whatever phone system you already have.",
      },
    },
    {
      "@type": "Question",
      name: "Does Plaibook replace my sales team?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Plaibook augments your sales team. It gives managers visibility into every call, coaches reps on specific behaviors, and handles follow-up on leads that reps miss. Your closers still close. Plaibook catches what they miss and recovers revenue that would otherwise be lost.",
      },
    },
    {
      "@type": "Question",
      name: "How does Plaibook help improve pest control sales close rates?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Plaibook identifies the specific behaviors that separate your top closers from average reps. It shows you which objections kill the most deals, which reps handle them best, and which checkpoints correlate with higher close rates. Managers can coach on specific, measurable behaviors rather than just telling reps to sell more.",
      },
    },
    {
      "@type": "Question",
      name: "How does Plaibook track pest control marketing ROI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Plaibook provides closed-loop marketing attribution by connecting lead sources to actual sales outcomes. Instead of just counting how many leads a marketing channel generated, you can see how many of those leads actually closed, what revenue they produced, and what your true cost per acquisition is for each channel.",
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
