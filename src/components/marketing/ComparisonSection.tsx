import Section from "./Section";
import SectionHeading from "./SectionHeading";
import FadeIn from "./FadeIn";

const withoutItems = [
  "Leads wait hours (or days) for a callback",
  "No visibility into why deals fall through",
  "Upsell opportunities missed after every job",
  "Manual follow-ups that reps forget to send",
  "Revenue guesswork — no attribution per call",
  "Same mistakes repeated on every sales call",
];

const withItems = [
  "Every lead gets a response in 30 seconds",
  "Every call scored and analyzed by AI",
  "AI upsale campaigns run automatically",
  "Persistent follow-ups until the deal closes",
  "Revenue attributed to every single call",
  "AI coaching insights for every rep",
];

export default function ComparisonSection() {
  return (
    <Section bg="white">
      <SectionHeading
        eyebrow="Why Plaibook"
        title="The Difference Is Revenue"
        description="See what changes when AI handles your sales follow-through."
      />
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <FadeIn delay={0}>
          <div className="rounded-2xl border border-red-200 bg-red-50/50 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-accent-red/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-accent-red" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text-primary">Without Plaibook</h3>
            </div>
            <ul className="space-y-4">
              {withoutItems.map(item => (
                <li key={item} className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-accent-red mt-1 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-text-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="rounded-2xl border border-green-200 bg-primary-lightest/50 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text-primary">With Plaibook</h3>
            </div>
            <ul className="space-y-4">
              {withItems.map(item => (
                <li key={item} className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-primary mt-1 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-text-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>
      <p className="text-center text-sm text-text-muted mt-10 max-w-2xl mx-auto">
        Plaibook works alongside your existing operations software — not instead of it.
      </p>
    </Section>
  );
}
