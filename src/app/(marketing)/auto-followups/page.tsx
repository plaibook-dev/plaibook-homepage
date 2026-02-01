import type { Metadata } from "next";
import ProductPageTemplate from "@/components/marketing/ProductPageTemplate";
import { PRODUCT_PAGES } from "@/lib/constants";

const page = PRODUCT_PAGES[2]; // auto-followups

export const metadata: Metadata = {
  title: "Auto Followups — Never Lose a Lead to Silence Again",
  description:
    "Instant AI-powered lead response in 30 seconds. Automated follow-up sequences that bring cold leads back and book more jobs.",
  alternates: {
    canonical: "https://plaibook.tech/auto-followups",
  },
};

export default function AutoFollowupsPage() {
  return (
    <ProductPageTemplate
      eyebrow="Auto Followups"
      headline={page.headline}
      subheadline={page.subheadline}
      problemStatement={page.problemStatement}
      features={page.features}
      stat={page.stat}
      cta={page.cta}
    />
  );
}
