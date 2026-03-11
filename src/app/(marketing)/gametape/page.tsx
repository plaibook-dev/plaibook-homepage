import type { Metadata } from "next";
import Link from "next/link";
import type { WithContext, Blog } from "schema-dts";
import { gametapePosts } from "@/lib/gametape/posts";
import Section from "@/components/marketing/Section";
import FadeIn from "@/components/marketing/FadeIn";
import {
  GAMETAPE_LABEL,
  GAMETAPE_NAME,
  GAMETAPE_URL,
  SITE_URL,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: `${GAMETAPE_LABEL} — Pest Control Sales & Revenue Insights`,
  description:
    "Data-driven insights on pest control sales, marketing ROI, call center operations, and revenue growth. Written by the team behind Plaibook.",
  alternates: {
    canonical: `${SITE_URL}${GAMETAPE_URL}`,
  },
  openGraph: {
    title: `${GAMETAPE_NAME} — Pest Control Sales & Revenue Insights`,
    description:
      "Data-driven insights on pest control sales, marketing ROI, call center operations, and revenue growth.",
    type: "website",
    url: `${SITE_URL}${GAMETAPE_URL}`,
  },
};

const gametapeJsonLd: WithContext<Blog> = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: GAMETAPE_NAME,
  description:
    "Data-driven insights on pest control sales, marketing ROI, call center operations, and revenue growth.",
  url: `${SITE_URL}${GAMETAPE_URL}`,
  publisher: {
    "@type": "Organization",
    name: "Plaibook",
    url: SITE_URL,
  },
};

const categoryLabels: Record<string, string> = {
  sales: "Sales",
  marketing: "Marketing",
  operations: "Operations",
  "case-study": "Case Study",
};

export default function GametapePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(gametapeJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <Section bg="dark" spacing="default">
        <FadeIn>
          <p className="text-xs font-mono text-primary font-medium tracking-wider uppercase mb-4">
            {GAMETAPE_LABEL}
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-text-light max-w-4xl leading-tight mb-6">
            Pest Control Sales &amp; Revenue Insights
          </h1>
          <p className="text-lg text-text-light/70 max-w-2xl">
            Data-driven articles on close rates, marketing ROI, sales coaching,
            and revenue recovery. Written by the team analyzing millions of pest
            control conversations.
          </p>
        </FadeIn>
      </Section>

      <Section bg="white" spacing="default">
        <div className="grid gap-8 md:gap-10">
          {gametapePosts.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 0.05}>
              <Link
                href={`${GAMETAPE_URL}/${post.slug}`}
                className="block group"
              >
                <article className="border border-slate-200 rounded-lg p-6 sm:p-8 hover:border-primary/40 hover:shadow-md transition-all duration-200">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-xs font-mono text-primary font-medium tracking-wider uppercase">
                      {categoryLabels[post.category]}
                    </span>
                    <span className="text-xs text-text-muted">
                      {post.readingTime}
                    </span>
                    <span className="text-xs text-text-muted">
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-text-primary group-hover:text-primary transition-colors mb-3">
                    {post.title}
                  </h2>
                  <p className="text-text-secondary leading-relaxed">
                    {post.description}
                  </p>
                </article>
              </Link>
            </FadeIn>
          ))}
        </div>
      </Section>
    </>
  );
}
