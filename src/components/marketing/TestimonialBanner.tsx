"use client";

import { useState } from "react";
import { TESTIMONIALS } from "@/lib/constants";

const testimonials = Object.values(TESTIMONIALS).map((t) => ({
  quote: t.quote,
  name: t.name,
  company: t.company,
}));

export default function TestimonialBanner() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="bg-surface-alt py-12 sm:py-16 overflow-hidden">
      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-surface-alt to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-surface-alt to-transparent z-10 pointer-events-none" />

        <div
          className="flex animate-marquee"
          style={{ animationPlayState: isPaused ? "paused" : "running" }}
        >
          {[0, 1].map((copy) => (
            <div key={copy} className="flex gap-6 shrink-0 pr-6">
              {testimonials.map((t, i) => (
                <div
                  key={`${t.company}-${i}-${copy}`}
                  className="flex-shrink-0 w-[340px] sm:w-[400px] rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <p className="text-text-secondary text-sm leading-relaxed line-clamp-3 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                      {(t.name || t.company).charAt(0)}
                    </div>
                    <div>
                      {t.name ? (
                        <p className="text-sm font-medium text-text-primary">
                          {t.name}, {t.company}
                        </p>
                      ) : (
                        <p className="text-sm font-medium text-text-primary">
                          {t.company}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
