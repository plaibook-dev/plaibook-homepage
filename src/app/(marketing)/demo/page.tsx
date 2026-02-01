import type { Metadata } from "next";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Book a Demo",
  description:
    "See how Plaibook can help your home service business close more deals. Book a personalized demo with our team.",
  alternates: {
    canonical: "https://plaibook.tech/demo",
  },
};

export default function DemoPage() {
  return (
    <>
      <section className="bg-bg-dark pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4 font-mono">
              Book a Demo
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-text-light tracking-tight leading-[1.1] mb-6">
              See Plaibook in Action
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed mb-10">
              Get a personalized walkthrough of the platform. We&apos;ll show
              you exactly how Plaibook can find and fix the revenue leaks in
              your sales funnel.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-12 text-center">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Ready to get started?
            </h2>
            <p className="text-text-muted mb-8">
              Reach out to our team and we&apos;ll set up a time to walk you
              through the platform.
            </p>
            <Button
              href="mailto:team@plaibook.tech?subject=Demo Request"
              size="lg"
            >
              Contact Us
            </Button>
            <p className="text-sm text-text-muted mt-6">
              Or email us directly at{" "}
              <a
                href="mailto:team@plaibook.tech"
                className="text-primary hover:underline"
              >
                team@plaibook.tech
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
