"use client";

import Button from "@/components/ui/Button";
import FadeIn from "@/components/marketing/FadeIn";
import HeroDashboard from "@/components/mockups/HeroDashboard";
import { DEMO_URL } from "@/lib/constants";
import HeroParticles from "@/components/marketing/HeroParticles";

const CLIENT_LOGOS = [
  { name: "Frontline Pest Control", src: "/images/clients/frontline.webp", url: "https://www.frontlinepestcontrol.com", h: 56 },
  { name: "BRD Pest Solutions", src: "/images/clients/brd.png", url: "https://brdpestsolutions.com", h: 52 },
  { name: "Ridd Pest Control", src: "/images/clients/ridd.png", url: "https://www.ridd.com", h: 28 },
  { name: "Vinx Pest Control", src: "/images/clients/vinx.png", url: "https://vinxpestcontrol.com", h: 40 },
  { name: "Vult Inside Sales", src: "/images/clients/vult.png", url: "https://vultinsidesales.com", h: 28 },
  { name: "BugBros", src: "/images/clients/bugbros.webp", url: "https://bugbros.com", h: 34 },
  { name: "Preventive Pest Control", src: "/images/clients/preventive.png", url: "https://www.preventivepestcontrol.com", h: 48 },
  { name: "Rock Pest Control", src: "/images/clients/rockpest.png", url: "https://rockpest.com", h: 36 },
  { name: "Evo Pest Control", src: "/images/clients/evo.webp", url: "https://evopest.com", h: 36 },
  { name: "Arete Pest Control", src: "/images/clients/arete.gif", url: "https://aretepestcontrol.com", h: 40 },
  { name: "Atlas Pest Services", src: "/images/clients/atlas.png", url: "https://atlaspest.com", h: 36 },
  { name: "PestCom", src: "/images/clients/pestcom.png", url: "https://www.pestcom.com", h: 36 },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] overflow-hidden bg-bg-dark"
    >
      {/* Particles — confined above the client carousel */}
      <div className="absolute inset-x-0 top-0 bottom-[140px] lg:bottom-[160px] overflow-hidden">
        <HeroParticles />
      </div>

      {/* Subtle background patterns */}
      <div className="absolute inset-0 noise-texture" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 70% 50%, rgba(106,168,154,0.15), transparent)",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — copy + CTA */}
          <div>
            <FadeIn direction="up" delay={0.1}>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] text-text-light font-bold leading-[1.1] tracking-tight">
                EVERYTHING YOU NEED TO HIT <span className="text-primary">ALL YOUR GROWTH TARGETS</span>
              </h1>
            </FadeIn>

            <FadeIn direction="up" delay={0.25}>
              <p className="mt-6 text-lg text-text-light/70 leading-relaxed max-w-lg">
                Score every call, find where deals die, and recover lost revenue
                over text&thinsp;&mdash;&thinsp;automatically.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.4}>
              <div className="mt-8">
                <Button href={DEMO_URL} variant="primary" size="lg">
                  Get a Demo
                </Button>
              </div>
            </FadeIn>
          </div>

          {/* Right — interactive platform demo */}
          <FadeIn direction="up" delay={0.3}>
            <div className="lg:translate-x-4">
              <HeroDashboard />
            </div>
          </FadeIn>
        </div>

        {/* Client logo carousel */}
        <FadeIn direction="up" delay={0.55}>
          <div className="mt-16 lg:mt-20">
            <p className="text-xs font-mono uppercase tracking-widest text-text-light/30 mb-4 text-center">
              Trusted by:
            </p>
            <div className="border border-white/10 rounded-2xl p-6 overflow-hidden">
              <div className="relative">
                <div className="flex animate-marquee w-max items-center hover:[animation-play-state:paused]" style={{ animationDuration: "48s" }}>
                  {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((client, i) => (
                    <a
                      key={`${client.name}-${i}`}
                      href={client.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 h-14 w-auto flex items-center mr-12"
                    >
                      <img
                        src={client.src}
                        alt={client.name}
                        style={{ height: client.h }}
                        className="w-auto object-contain brightness-0 invert opacity-50 hover:opacity-80 transition-opacity"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
