import type { Metadata } from "next";
import DemoPageClient from "./DemoPageClient";

export const metadata: Metadata = {
  title: "Book a Demo — See Your Pest Control Sales Data Through Plaibook",
  description:
    "Book a personalized demo to see how Plaibook analyzes your pest control sales calls, identifies revenue leaks, and recovers unclosed leads automatically. See your close rates, rep performance, and marketing ROI in one platform.",
  alternates: {
    canonical: "https://plaibook.tech/demo",
  },
};

export default function DemoPage() {
  return <DemoPageClient />;
}
