import Section from "./Section";
import FadeIn from "./FadeIn";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";

const problems = [
  {
    number: "01",
    title: "Invisible Revenue Loss",
    description:
      "You're spending on leads but have no idea why 60% of sales calls don't convert. The same fixable mistakes happen on every call.",
  },
  {
    number: "02",
    title: "Leads Die in Silence",
    description:
      "40% of leads never get a follow-up. Your reps are busy, leads pile up, and by the time someone calls back — they've booked with a competitor.",
  },
  {
    number: "03",
    title: "Upsells Left on the Table",
    description:
      "Your techs finish the job but nobody offers the upgrade, the add-on, or the annual plan. That's thousands in missed revenue every week.",
  },
];

export default function ProblemSection() {
  return (
    <Section bg="white">
      <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
        {/* Left column */}
        <div className="lg:col-span-2">
          <FadeIn type="default">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent-red mb-4 font-mono">
              The Problem
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight leading-tight">
              Your Competitors Optimized Their Routes. The Smart Ones Are
              Optimizing Their Sales.
            </h2>
            <p className="mt-4 text-text-secondary leading-relaxed">
              Operations software saves you time. Sales software makes you
              money. Which one grows your business faster?
            </p>
          </FadeIn>
        </div>

        {/* Right column */}
        <div className="lg:col-span-3">
          <FadeIn type="default" delay={0.1}>
            <div className="space-y-8">
              {problems.map((problem, i) => (
                <div
                  key={problem.number}
                  className={`flex gap-5${
                    i < problems.length - 1
                      ? " border-b border-gray-100 pb-8"
                      : ""
                  }`}
                >
                  <span className="text-3xl font-bold text-accent-red/20 font-mono shrink-0 w-12">
                    {problem.number}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-1">
                      {problem.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {problem.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Full-width funnel diagram */}
      <div className="mt-12 lg:mt-16">
        <FadeIn type="dramatic" delay={0.2}>
          <MediaPlaceholder
            type="diagram"
            aspectRatio="21/9"
            description="Stylized leaky funnel diagram: 1,000 leads enter the top. Red leak callouts at each stage — 'No follow-up: -400 leads', 'Slow response: -200 leads', 'No upsell attempt: -150 leads'. Only 250 closed deals remain at the bottom. Could be an infographic or a screenshot of Plaibook's funnel analytics."
            className="max-w-4xl mx-auto"
          />
        </FadeIn>
      </div>
    </Section>
  );
}
