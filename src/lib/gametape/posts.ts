export interface GametapePost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  category: "sales" | "marketing" | "operations" | "case-study";
  readingTime: string;
  keywords: string[];
}

export const gametapePosts: GametapePost[] = [
  {
    slug: "pest-control-close-rate-benchmarks",
    title:
      "What's a Good Close Rate for Pest Control Sales? Real Benchmarks from Call Data",
    description:
      "Most pest control companies guess at their close rate. We analyzed thousands of pest control sales calls to find what good actually looks like — and what separates top-performing reps from the rest.",
    publishedAt: "2026-03-10",
    category: "sales",
    readingTime: "8 min read",
    keywords: [
      "pest control close rate",
      "pest control sales benchmarks",
      "home services close rate",
      "pest control sales metrics",
      "inside sales close rate",
    ],
  },
  {
    slug: "cost-of-missed-follow-ups-home-services",
    title:
      "The Real Cost of Missed Follow-Ups in Pest Control (And How to Fix It)",
    description:
      "Every missed follow-up is a customer you already paid to acquire walking out the door. Here's how to calculate what it's costing you and what the best pest control companies do differently.",
    publishedAt: "2026-03-08",
    category: "sales",
    readingTime: "7 min read",
    keywords: [
      "pest control follow-up",
      "missed follow-ups cost",
      "home services lead management",
      "pest control lead follow-up",
      "sales follow-up automation",
    ],
  },
  {
    slug: "pest-control-marketing-roi-audit",
    title:
      "How to Tell If Your Pest Control Marketing Agency Is Inflating Your Lead Count",
    description:
      "Your agency says they sent you 500 leads last month. But how many were real? Here's a framework for auditing your pest control marketing spend and holding agencies accountable with actual data.",
    publishedAt: "2026-03-05",
    category: "marketing",
    readingTime: "9 min read",
    keywords: [
      "pest control marketing ROI",
      "pest control lead quality",
      "marketing agency accountability",
      "pest control advertising",
      "home services marketing",
    ],
  },
  {
    slug: "how-to-coach-pest-control-sales-reps",
    title:
      "How to Coach Pest Control Sales Reps Without Listening to Every Call",
    description:
      "You have 15 reps making 200 calls a day. You can listen to maybe five. Here's how the best pest control sales managers coach effectively at scale using data instead of gut feel.",
    publishedAt: "2026-03-03",
    category: "operations",
    readingTime: "10 min read",
    keywords: [
      "pest control sales training",
      "sales coaching",
      "call center quality assurance pest control",
      "sales rep performance tracking",
      "pest control sales management",
    ],
  },
  {
    slug: "pest-control-objections-top-reps-handle",
    title:
      'The #1 Objection Killing Pest Control Sales — And How Top Reps Handle It',
    description:
      "Price isn't the real problem. After analyzing thousands of pest control sales calls, we found the objection that kills the most deals — and it's not what most managers think.",
    publishedAt: "2026-02-28",
    category: "sales",
    readingTime: "8 min read",
    keywords: [
      "pest control sales objections",
      "pest control sales script",
      "handling price objections pest control",
      "pest control sales tips",
      "home services sales techniques",
    ],
  },
  {
    slug: "brd-pest-solutions-sms-campaign-results",
    title:
      "How One Pest Control Company Generated $500K in Upsells with AI-Powered SMS",
    description:
      "BRD Pest Solutions texted 30,000 customers about mosquito control. The campaign started 28,000 conversations, closed 786 deals over text, and had to be shut off because they ran out of supplies.",
    publishedAt: "2026-02-25",
    category: "case-study",
    readingTime: "12 min read",
    keywords: [
      "pest control upselling",
      "SMS marketing pest control",
      "pest control revenue growth",
      "AI sales automation",
      "pest control customer retention",
    ],
  },
];

export function getGametapePostBySlug(slug: string): GametapePost | undefined {
  return gametapePosts.find((post) => post.slug === slug);
}
