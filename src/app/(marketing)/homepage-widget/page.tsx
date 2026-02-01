import type { Metadata } from "next";
import ProductPageTemplate from "@/components/marketing/ProductPageTemplate";
import { PRODUCT_PAGES } from "@/lib/constants";

const page = PRODUCT_PAGES[3]; // homepage-widget

export const metadata: Metadata = {
  title: "Homepage Widget — Turn Website Visitors Into Booked Jobs",
  description:
    "An AI sales agent chat widget for your website that actually books appointments. Not a chatbot — a closer.",
  alternates: {
    canonical: "https://plaibook.tech/homepage-widget",
  },
};

export default function HomepageWidgetPage() {
  return (
    <ProductPageTemplate
      eyebrow="Homepage Widget"
      headline={page.headline}
      subheadline={page.subheadline}
      problemStatement={page.problemStatement}
      features={page.features}
      stat={page.stat}
      cta={page.cta}
    />
  );
}
