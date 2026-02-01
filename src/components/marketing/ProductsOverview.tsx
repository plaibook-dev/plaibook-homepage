"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import FadeIn from "./FadeIn";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";

const products = [
  {
    id: "analytics",
    label: "Analytics",
    title: "See Every Dollar. Track Every Call.",
    stat: "2.3\u00d7",
    statLabel: "close rate improvement",
    description:
      "AI-powered revenue attribution and call scoring that shows you exactly where every dollar is won or lost.",
    features: [
      "Call-level revenue attribution",
      "AI call scoring on every conversation",
      "Real-time revenue dashboards",
      "Funnel leak detection",
    ],
    href: "/analytics",
    media: {
      description:
        "Full analytics dashboard showing revenue attribution chart, call scoring leaderboard with rep rankings, and funnel health metrics.",
    },
  },
  {
    id: "sms-upsales",
    label: "SMS Upsales",
    title: "AI That Sells While You Sleep",
    stat: "$147K",
    statLabel: "additional weekly revenue",
    description:
      "Real AI-powered conversations with thousands of customers simultaneously \u2014 each one personalized, each one closing.",
    features: [
      "Intelligent conversation engine",
      "Multi-touch sequences",
      "Smart timing optimization",
      "Revenue per message tracking",
    ],
    href: "/sms-upsales",
    media: {
      description:
        "SMS campaign builder interface showing an active upsale campaign with conversation preview, response rates, and revenue generated metric.",
    },
  },
  {
    id: "auto-followups",
    label: "Auto Followups",
    title: "Never Lose a Lead to Silence Again",
    stat: "30s",
    statLabel: "average response time",
    description:
      "Every lead gets followed up on \u2014 instantly, intelligently, automatically. Your competitor called back in 30 minutes. Plaibook texted in 30 seconds.",
    features: [
      "Instant lead response",
      "Persistent re-engagement",
      "Smart handoff to reps",
      "Lead scoring and prioritization",
    ],
    href: "/auto-followups",
    media: {
      description:
        "Lead queue dashboard showing instant AI responses with timestamps ('responded in 12 seconds'), lead status progression, and handoff notifications.",
    },
  },
  {
    id: "homepage-widget",
    label: "Homepage Widget",
    title: "Turn Website Visitors Into Booked Jobs",
    stat: "3.2\u00d7",
    statLabel: "more website conversions",
    description:
      "An AI sales agent on your website that books appointments \u2014 not a chatbot that sends people to a FAQ.",
    features: [
      "AI sales agent (not a chatbot)",
      "Instant booking capability",
      "24/7 availability",
      "Seamless human handoff",
    ],
    href: "/homepage-widget",
    media: {
      description:
        "A website with the Plaibook chat widget open in the bottom-right corner, showing an AI conversation booking a pest control appointment with availability times.",
    },
  },
  {
    id: "competitions",
    label: "Competitions",
    title: "Make Sales Fun Again",
    stat: "3\u00d7",
    statLabel: "rep performance improvement",
    description:
      "Leaderboards, challenges, and rewards that turn your sales team into closers.",
    features: [
      "Live leaderboards",
      "Custom challenges",
      "Automated rewards",
      "Team vs. team competitions",
    ],
    href: "/competitions",
    media: {
      description:
        "Sales competition leaderboard showing rep rankings with profile photos, current challenge progress bars, and reward tier indicators.",
    },
  },
];

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M13.3 4.3a1 1 0 0 1 0 1.4l-6 6a1 1 0 0 1-1.4 0l-3-3a1 1 0 1 1 1.4-1.4L6.6 9.6l5.3-5.3a1 1 0 0 1 1.4 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function ProductsOverview() {
  const [activeId, setActiveId] = useState(products[0].id);
  const activeProduct = products.find((p) => p.id === activeId)!;

  return (
    <Section bg="green-tint" id="products">
      <SectionHeading
        eyebrow="The Platform"
        title="Everything You Need to Close More Deals"
        description="Five products, one platform. Each one attacks a different part of your revenue leak."
      />

      {/* Tab selector */}
      <FadeIn>
        <div className="flex justify-center mb-10">
          <div className="inline-flex gap-2 overflow-x-auto max-w-full px-1 py-1">
            {products.map((product) => (
              <button
                key={product.id}
                onClick={() => setActiveId(product.id)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                  activeId === product.id
                    ? "text-white"
                    : "bg-white text-text-secondary hover:text-text-primary"
                }`}
              >
                {activeId === product.id && (
                  <motion.div
                    layoutId="activeProductTab"
                    className="absolute inset-0 bg-primary rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{product.label}</span>
              </button>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Tab content area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProduct.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <div className="grid lg:grid-cols-[45%_55%] gap-10 lg:gap-14 items-center">
            {/* Left column -- text */}
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-3">
                {activeProduct.title}
              </h3>
              <p className="text-text-secondary leading-relaxed mb-6">
                {activeProduct.description}
              </p>

              {/* Stat callout */}
              <div className="mb-6">
                <span className="text-3xl font-bold text-accent-gold font-mono">
                  {activeProduct.stat}
                </span>
                <p className="text-sm text-text-muted">
                  {activeProduct.statLabel}
                </p>
              </div>

              {/* Feature list */}
              <ul className="space-y-0.5 mb-2">
                {activeProduct.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 py-1.5 text-sm text-text-secondary"
                  >
                    <span className="text-primary">
                      <CheckIcon />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Learn more link */}
              <Link
                href={activeProduct.href}
                className="inline-flex items-center gap-1 text-primary font-semibold text-sm mt-4 hover:underline"
              >
                Learn more &rarr;
              </Link>
            </div>

            {/* Right column -- visual */}
            <div>
              <MediaPlaceholder
                type="screenshot"
                aspectRatio="4/3"
                description={activeProduct.media.description}
                browserChrome
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
