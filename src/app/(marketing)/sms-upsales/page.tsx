import type { Metadata } from "next";
import ProductPageTemplate from "@/components/marketing/ProductPageTemplate";
import { PRODUCT_PAGES } from "@/lib/constants";

const page = PRODUCT_PAGES[1]; // sms-upsales

export const metadata: Metadata = {
  title: "SMS Upsales — AI That Sells While You Sleep",
  description:
    "AI-powered SMS conversations that close upsale deals automatically. Not bulk SMS — real personalized selling for home service businesses.",
  alternates: {
    canonical: "https://plaibook.tech/sms-upsales",
  },
};

export default function SMSUpsalesPage() {
  return (
    <ProductPageTemplate
      eyebrow="SMS Upsales"
      headline={page.headline}
      subheadline={page.subheadline}
      problemStatement={page.problemStatement}
      features={page.features}
      stat={page.stat}
      cta={page.cta}
    />
  );
}
