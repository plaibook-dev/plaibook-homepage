import Section from "./Section";
import FadeIn from "./FadeIn";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";

const stats = [
  { value: "10×", label: "Daily Revenue Increase", color: "text-primary" },
  { value: "75%", label: "Close Rate Achieved", color: "text-primary" },
  { value: "30s", label: "Average Response Time", color: "text-accent-gold" },
  { value: "$147K", label: "Additional Weekly Revenue", color: "text-accent-gold" },
];

export default function TestimonialSection() {
  return (
    <Section bg="cream">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Testimonial Quote */}
        <FadeIn>
          <div>
            <div className="text-6xl font-bold text-primary/30 leading-none mb-4">
              &ldquo;
            </div>
            <blockquote className="text-2xl sm:text-3xl font-medium text-text-primary leading-relaxed mb-8">
              Plaibook transformed how we think about sales. We went from guessing
              why deals fell through to knowing exactly what to fix. Our daily
              revenue increased 10X and our close rate hit 75%.
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gray-200 border-2 border-primary/20 flex items-center justify-center text-text-muted text-xs">
                Photo
              </div>
              <div>
                <p className="font-bold text-text-primary">
                  Taylor Christensen
                </p>
                <p className="text-sm text-text-muted">
                  Owner, BRD Pest Solutions
                </p>
              </div>
              <div className="ml-auto w-20 h-8 rounded bg-gray-200/80 flex items-center justify-center text-[10px] text-text-muted">
                Logo
              </div>
            </div>
            <div className="mt-8">
              <MediaPlaceholder
                type="video"
                aspectRatio="16/9"
                description="Video testimonial: Taylor Christensen on camera discussing how Plaibook transformed BRD Pest Solutions' sales process. 60-90 second clip. Play button overlay with 'Watch the full story' label."
                className="max-w-md"
              />
            </div>
          </div>
        </FadeIn>

        {/* Stats Grid */}
        <FadeIn delay={0.2}>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div
                    className={`text-3xl sm:text-4xl font-bold font-mono ${stat.color}`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-text-muted mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
