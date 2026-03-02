"use client";

import Section from "@/components/marketing/Section";
import FadeIn from "@/components/marketing/FadeIn";
import Button from "@/components/ui/Button";
import PlaibookLogo from "@/components/ui/PlaiboookLogo";
import { DEMO_URL } from "@/lib/constants";

const pillars = [
  {
    label: "Marketing",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
    color: "bg-blue-50/80 text-blue-600 border-blue-200/60",
    shadow: "shadow-blue-100/50",
  },
  {
    label: "Sales",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
      </svg>
    ),
    color: "bg-emerald-50/80 text-emerald-600 border-emerald-200/60",
    shadow: "shadow-emerald-100/50",
  },
  {
    label: "Ops",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
    color: "bg-amber-50/80 text-amber-600 border-amber-200/60",
    shadow: "shadow-amber-100/50",
  },
];

export default function DisconnectedSystemsSection() {
  return (
    <Section bg="white" spacing="default">
      <div className="text-center max-w-3xl mx-auto">
        <FadeIn>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight">
            DISCONNECTED SYSTEMS LEAD TO LOST OPPORTUNITIES
          </h2>
        </FadeIn>
      </div>

      {/* Diagram */}
      <div className="mt-16 md:mt-20">
        {/* Three pillar cards */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
          {pillars.map((p, i) => (
            <FadeIn key={p.label} direction="up" delay={0.1 + i * 0.1}>
              <div
                className={`flex flex-col items-center gap-3 rounded-xl border p-5 md:p-7 shadow-md ${p.color} ${p.shadow}`}
              >
                <div className="w-11 h-11 md:w-13 md:h-13 rounded-lg flex items-center justify-center">
                  {p.icon}
                </div>
                <span className="font-heading font-semibold text-sm md:text-base tracking-tight">
                  {p.label}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Converging connector lines via SVG */}
        <FadeIn delay={0.5}>
          <div className="max-w-2xl mx-auto px-4 md:px-8">
            <svg
              viewBox="0 0 300 75"
              fill="none"
              className="w-full h-auto my-4 md:my-6"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Left line */}
              <path
                d="M50 0 L50 20 Q50 35 150 45"
                stroke="currentColor"
                className="text-primary/30"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              {/* Center line */}
              <path
                d="M150 0 L150 45"
                stroke="currentColor"
                className="text-primary/30"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              {/* Right line */}
              <path
                d="M250 0 L250 20 Q250 35 150 45"
                stroke="currentColor"
                className="text-primary/30"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              {/* Continuation downward */}
              <path
                d="M150 45 L150 72"
                stroke="currentColor"
                className="text-primary/30"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              {/* Convergence dot */}
              <circle cx="150" cy="72" r="3" className="fill-primary/40" />
            </svg>
          </div>
        </FadeIn>

        {/* Logo + tagline */}
        <FadeIn delay={0.65}>
          <div className="flex flex-col items-center gap-5">
            <div className="w-16 h-16 rounded-2xl shadow-lg shadow-primary/25 flex items-center justify-center bg-white ring-1 ring-primary/15">
              <PlaibookLogo size={40} />
            </div>
            <p className="font-heading text-lg md:text-xl font-semibold text-text-primary text-center leading-snug">
              Connect your systems, get analytics that act.
            </p>
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={0.8}>
          <div className="mt-10 text-center">
            <Button href={DEMO_URL} variant="primary" size="lg">
              Get a Demo
            </Button>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
