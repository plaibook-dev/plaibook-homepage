import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { WithContext, Article } from "schema-dts";
import { blogPosts, getPostBySlug } from "@/lib/blog/posts";
import Section from "@/components/marketing/Section";
import FadeIn from "@/components/marketing/FadeIn";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { DEMO_URL, SITE_URL } from "@/lib/constants";

import PestControlCloseRate from "./posts/pest-control-close-rate-benchmarks";
import CostOfMissedFollowUps from "./posts/cost-of-missed-follow-ups-home-services";
import PestControlMarketingRoi from "./posts/pest-control-marketing-roi-audit";
import HowToCoachReps from "./posts/how-to-coach-pest-control-sales-reps";
import PestControlObjections from "./posts/pest-control-objections-top-reps-handle";
import BrdCaseStudy from "./posts/brd-pest-solutions-sms-campaign-results";

const postComponents: Record<string, React.ComponentType> = {
  "pest-control-close-rate-benchmarks": PestControlCloseRate,
  "cost-of-missed-follow-ups-home-services": CostOfMissedFollowUps,
  "pest-control-marketing-roi-audit": PestControlMarketingRoi,
  "how-to-coach-pest-control-sales-reps": HowToCoachReps,
  "pest-control-objections-top-reps-handle": PestControlObjections,
  "brd-pest-solutions-sms-campaign-results": BrdCaseStudy,
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Plaibook`,
      description: post.description,
      type: "article",
      url: `${SITE_URL}/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: ["Plaibook"],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const PostContent = postComponents[slug];
  if (!PostContent) notFound();

  const articleJsonLd: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Organization",
      name: "Plaibook",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Plaibook",
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    keywords: post.keywords.join(", "),
  };

  // Find related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Header */}
      <Section bg="dark" spacing="default">
        <FadeIn>
          <div className="max-w-3xl">
            <Link
              href="/blog"
              className="text-xs font-mono text-primary font-medium tracking-wider uppercase mb-4 inline-block hover:text-primary-light transition-colors"
            >
              &larr; Back to Blog
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-mono text-primary font-medium tracking-wider uppercase">
                {post.category === "case-study"
                  ? "Case Study"
                  : post.category.charAt(0).toUpperCase() +
                    post.category.slice(1)}
              </span>
              <span className="text-xs text-text-light/60">
                {post.readingTime}
              </span>
              <span className="text-xs text-text-light/60">
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-text-light leading-tight mb-6">
              {post.title}
            </h1>
            <p className="text-lg text-text-light/70">{post.description}</p>
          </div>
        </FadeIn>
      </Section>

      {/* Article content */}
      <Section bg="white" spacing="default">
        <article className="max-w-3xl">
          <PostContent />
        </article>
      </Section>

      {/* CTA */}
      <Section bg="gray" spacing="tight">
        <FadeIn>
          <div className="text-center py-4">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-text-primary mb-4">
              See what Plaibook finds in your data.
            </h2>
            <p className="text-text-secondary mb-6 max-w-lg mx-auto">
              Plaibook analyzes every call, scores every rep, and recovers the
              deals your team drops. Book a demo to see your sales floor through
              Plaibook.
            </p>
            <Button href={DEMO_URL} variant="primary" size="lg">
              Book a Demo
            </Button>
          </div>
        </FadeIn>
      </Section>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <Section bg="white" spacing="default">
          <h2 className="font-heading text-2xl font-bold text-text-primary mb-8">
            More from the Blog
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="block group"
              >
                <article className="border border-slate-200 rounded-lg p-5 hover:border-primary/40 hover:shadow-md transition-all duration-200 h-full">
                  <span className="text-xs font-mono text-primary font-medium tracking-wider uppercase">
                    {related.category === "case-study"
                      ? "Case Study"
                      : related.category.charAt(0).toUpperCase() +
                        related.category.slice(1)}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-text-primary group-hover:text-primary transition-colors mt-2 mb-2">
                    {related.title}
                  </h3>
                  <p className="text-sm text-text-secondary line-clamp-2">
                    {related.description}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
