import Button from "@/components/ui/Button";
import FadeIn from "./FadeIn";

interface Props {
  headline?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
}

const stats = [
  { value: "10\u00D7", label: "Revenue increase" },
  { value: "75%", label: "Close rate" },
  { value: "30s", label: "Response time" },
];

export default function CTASection({
  headline = "Ready to Close More Deals?",
  description = "See how Plaibook can help your team turn missed opportunities into revenue \u2014 with a personalized demo.",
  ctaText = "Book a Demo",
  ctaHref = "/demo",
}: Props) {
  return (
    <section className="bg-primary py-20 sm:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          {/* Mini stat bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-10">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white font-mono">
                  {stat.value}
                </div>
                <div className="text-xs text-white/70 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
            {headline}
          </h2>

          {/* Description */}
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            {description}
          </p>

          {/* CTA Button - white button on green bg */}
          <Button
            href={ctaHref}
            variant="white"
            size="lg"
          >
            {ctaText}
          </Button>

          {/* Friction reducer */}
          <p className="text-sm text-white/60 mt-4">
            No credit card required. Setup takes one day.
          </p>

          {/* Social proof mini */}
          <div className="mt-10 flex items-center justify-center gap-2">
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full bg-white/20 border-2 border-primary"
                />
              ))}
            </div>
            <span className="text-sm text-white/70 ml-2">
              Trusted by 50+ home service companies
            </span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
