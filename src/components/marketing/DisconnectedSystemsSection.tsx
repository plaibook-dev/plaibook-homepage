"use client";

import Section from "@/components/marketing/Section";
import FadeIn from "@/components/marketing/FadeIn";
import Button from "@/components/ui/Button";
import PlaibookLogo from "@/components/ui/PlaiboookLogo";
import { DEMO_URL } from "@/lib/constants";
import Image from "next/image";

const pillars = [
  {
    label: "Marketing",
    color: "bg-blue-50/80 border-blue-200/60",
    shadow: "shadow-blue-100/50",
    labelColor: "text-blue-600",
    integrations: [
      { name: "TapClicks", logo: "/images/integrations/tapclicks.png" },
      { name: "CallRail", logo: "/images/integrations/callrail.png" },
      { name: "GoHighLevel", logo: "/images/integrations/gohighlevel.png" },
      { name: "Google", logo: "/images/integrations/google.png" },
      { name: "Meta", logo: "/images/integrations/meta.png" },
    ],
  },
  {
    label: "Sales",
    color: "bg-emerald-50/80 border-emerald-200/60",
    shadow: "shadow-emerald-100/50",
    labelColor: "text-emerald-600",
    integrations: [
      { name: "Genesys Cloud", logo: "/images/integrations/genesys.png" },
      { name: "CallRail", logo: "/images/integrations/callrail.png" },
      { name: "DialPad", logo: "/images/integrations/dialpad.png" },
      { name: "GoHighLevel", logo: "/images/integrations/gohighlevel.png" },
      { name: "Five9", logo: "/images/integrations/five9.png" },
      { name: "Zoom", logo: "/images/integrations/zoom.png" },
      { name: "Nextiva", logo: "/images/integrations/nextiva.png" },
    ],
  },
  {
    label: "Ops",
    color: "bg-amber-50/80 border-amber-200/60",
    shadow: "shadow-amber-100/50",
    labelColor: "text-amber-600",
    integrations: [
      { name: "FieldRoutes", logo: "/images/integrations/fieldroutes.png" },
      { name: "ServiceTitan", logo: "/images/integrations/servicetitan.png" },
      { name: "BrioStack", logo: "/images/integrations/briostack.png" },
      { name: "PestPac", logo: "/images/integrations/pestpac.png" },
      { name: "Jobber", logo: "/images/integrations/jobber.png" },
    ],
  },
];

export default function DisconnectedSystemsSection() {
  return (
    <Section bg="cream" spacing="default">
      <div className="text-center max-w-3xl mx-auto">
        <FadeIn>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight">
            DISCONNECTED SYSTEMS LEAD TO LOST OPPORTUNITIES
          </h2>
        </FadeIn>
      </div>

      {/* Diagram - Full width */}
      <div className="mt-16 md:mt-20">
        {/* Three pillar cards - spread across full width */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 lg:gap-16 w-full px-4 md:px-8 lg:px-12">
          {pillars.map((p, i) => (
            <FadeIn key={p.label} direction="up" delay={0.1 + i * 0.1}>
              <div className="flex flex-col items-center">
                {/* Label above the box */}
                <span className={`font-heading font-semibold text-sm md:text-base tracking-tight mb-3 ${p.labelColor}`}>
                  {p.label}
                </span>
                {/* Integration logos box */}
                <div
                  className={`w-full rounded-xl border p-4 md:p-6 shadow-md ${p.color} ${p.shadow}`}
                >
                  <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4">
                    {p.integrations.map((integration) => (
                      <div
                        key={integration.name}
                        className="relative w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-white rounded-lg shadow-sm flex items-center justify-center p-2"
                        title={integration.name}
                      >
                        <Image
                          src={integration.logo}
                          alt={integration.name}
                          width={48}
                          height={48}
                          className="object-contain w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Converging connector lines via SVG */}
        <FadeIn delay={0.5}>
          <div className="w-full px-4 md:px-8 lg:px-12">
            <svg
              viewBox="0 0 400 80"
              fill="none"
              className="w-full h-auto my-4 md:my-8"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Left line - from far left */}
              <path
                d="M33 0 L33 25 Q33 45 200 55"
                stroke="currentColor"
                className="text-primary/30"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              {/* Center line */}
              <path
                d="M200 0 L200 55"
                stroke="currentColor"
                className="text-primary/30"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              {/* Right line - from far right */}
              <path
                d="M367 0 L367 25 Q367 45 200 55"
                stroke="currentColor"
                className="text-primary/30"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              {/* Continuation downward */}
              <path
                d="M200 55 L200 77"
                stroke="currentColor"
                className="text-primary/30"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              {/* Convergence dot */}
              <circle cx="200" cy="77" r="3" className="fill-primary/40" />
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
              Book a Demo
            </Button>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
