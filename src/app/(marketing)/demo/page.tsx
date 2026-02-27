import type { Metadata } from "next";
import DemoPageClient from "./DemoPageClient";

export const metadata: Metadata = {
  title: "Book a Demo",
  description:
    "See how Plaibook can help your home service business recover lost revenue. Book a personalized demo with our team.",
  alternates: {
    canonical: "https://plaibook.tech/demo",
  },
};

export default function DemoPage() {
  return <DemoPageClient />;
}
