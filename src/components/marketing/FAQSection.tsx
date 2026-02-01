"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/marketing/Section";

const faqs = [
  {
    question: "How does Plaibook's pricing work?",
    answer:
      "Our pricing is performance-based — we only charge based on the revenue we help you generate. No upfront costs, no long-term contracts. If we don't deliver results, you don't pay.",
  },
  {
    question: "What channels does Plaibook support?",
    answer:
      "Plaibook works across SMS, phone calls, and website chat. Our AI analyzes phone calls for coaching and scoring, sends personalized SMS follow-ups and upsale campaigns, and powers a chat widget on your website that books jobs.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most teams are up and running within a day. We integrate with your existing CRM and phone system, configure your AI agents, and start analyzing calls immediately.",
  },
  {
    question: "Can my reps tell the AI is sending messages?",
    answer:
      "Your customers think they're texting a real person. Our AI crafts personalized messages based on their service history, recent interactions, and the context of their inquiry.",
  },
  {
    question: "How fast does the AI respond to new leads?",
    answer:
      "Within 30 seconds. When a new lead comes in, Plaibook sends a personalized text immediately — before your competitor even picks up the phone.",
  },
  {
    question: "Does Plaibook integrate with my CRM?",
    answer:
      "Yes. We integrate with most popular CRMs used in home services. All lead data, call scores, and revenue attribution flow directly into your existing system.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <Section bg="white">
      <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
        {/* Left column -- Sticky heading */}
        <div className="lg:col-span-2 lg:sticky lg:top-28 lg:self-start">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4 font-mono">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
            Common Questions
          </h2>
          <p className="mt-4 text-text-secondary leading-relaxed">
            Everything you need to know about getting started with Plaibook.
          </p>
        </div>

        {/* Right column -- Accordion */}
        <div className="lg:col-span-3">
          {faqs.map((faq, i) => (
            <div key={faq.question} className="border-b border-gray-100">
              <button
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
                className="w-full flex items-center justify-between py-5 text-left cursor-pointer"
              >
                <span className="text-base font-semibold text-text-primary pr-8">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-text-muted shrink-0 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-5 text-sm text-text-secondary leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
