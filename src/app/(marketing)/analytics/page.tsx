import type { Metadata } from "next";
import ProductPageTemplate from "@/components/marketing/ProductPageTemplate";
import { PRODUCT_PAGES } from "@/lib/constants";

const page = PRODUCT_PAGES[0]; // analytics

export const metadata: Metadata = {
  title: "Analytics — See Every Dollar, Track Every Call",
  description:
    "AI-powered revenue attribution and call scoring for home service businesses. Know exactly where every dollar is won or lost in your sales funnel.",
  alternates: {
    canonical: "https://plaibook.tech/analytics",
  },
};

export default function AnalyticsPage() {
  return (
    <ProductPageTemplate
      eyebrow="Analytics"
      headline={page.headline}
      subheadline={page.subheadline}
      problemStatement={page.problemStatement}
      features={page.features}
      stat={page.stat}
      cta={page.cta}
    />
  );
}
