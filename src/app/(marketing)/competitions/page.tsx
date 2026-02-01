import type { Metadata } from "next";
import ProductPageTemplate from "@/components/marketing/ProductPageTemplate";
import { PRODUCT_PAGES } from "@/lib/constants";

const page = PRODUCT_PAGES[4]; // competitions

export const metadata: Metadata = {
  title: "Competitions — Make Sales Fun Again",
  description:
    "Sales leaderboards, challenges, and rewards that turn your team into closers. Sales reps perform 3x better when they're competing.",
  alternates: {
    canonical: "https://plaibook.tech/competitions",
  },
};

export default function CompetitionsPage() {
  return (
    <ProductPageTemplate
      eyebrow="Competitions"
      headline={page.headline}
      subheadline={page.subheadline}
      problemStatement={page.problemStatement}
      features={page.features}
      stat={page.stat}
      cta={page.cta}
    />
  );
}
