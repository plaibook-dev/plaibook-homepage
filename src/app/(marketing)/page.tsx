import type { Metadata } from "next";
import HeroSection from "@/components/marketing/HeroSection";
import TrustBar from "@/components/marketing/TrustBar";
import ProblemSection from "@/components/marketing/ProblemSection";
import HowItWorksSection from "@/components/marketing/HowItWorksSection";
import ProductsOverview from "@/components/marketing/ProductsOverview";
import TestimonialSection from "@/components/marketing/TestimonialSection";
import ComparisonSection from "@/components/marketing/ComparisonSection";
import PricingSection from "@/components/marketing/PricingSection";
import FAQSection from "@/components/marketing/FAQSection";
import CTASection from "@/components/marketing/CTASection";
import type { WithContext, SoftwareApplication, FAQPage } from "schema-dts";

export const metadata: Metadata = {
  title: "Plaibook — AI Sales Optimization for Home Services",
  description:
    "Your sales funnel is leaking. Plaibook uses AI to analyze every call, automate follow-ups, and turn missed opportunities into revenue for home service businesses.",
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
    "AI-powered sales optimization for home service businesses. Analyze every call, automate follow-ups, and close more deals.",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Custom pricing — we only win when you win.",
  },
};

const faqJsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does Plaibook's pricing work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our pricing is performance-based. There are no upfront costs or long-term contracts. We tie our pricing to the additional revenue we generate for your business.",
      },
    },
    {
      "@type": "Question",
      name: "What channels does Plaibook support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Plaibook works across SMS, phone calls, and your website chat widget — all from one platform.",
      },
    },
    {
      "@type": "Question",
      name: "How long does setup take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most teams are up and running within a day. We integrate with your existing phone system and CRM.",
      },
    },
    {
      "@type": "Question",
      name: "How fast does the AI respond to new leads?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Within 30 seconds. When a new lead comes in, Plaibook sends a personalized text immediately.",
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
      <TrustBar />
      <ProblemSection />
      <HowItWorksSection />
      <ProductsOverview />
      <TestimonialSection />
      <ComparisonSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
