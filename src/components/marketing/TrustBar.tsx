const companies = [
  "BRD Pest Solutions",
  "Midwest Outdoor",
  "Frontline Pest",
  "Summit HVAC",
  "ProShield Lawn Care",
];

export default function TrustBar() {
  return (
    <section className="bg-surface-alt border-y border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          <span className="text-sm text-text-muted font-medium shrink-0">
            Trusted by home service leaders
          </span>
          <div className="flex items-center gap-8 sm:gap-12 flex-wrap justify-center">
            {companies.map((company) => (
              <div key={company} className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-gray-300/50 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-sm bg-gray-400/60" />
                </div>
                <span className="text-sm font-semibold text-text-secondary tracking-tight">
                  {company}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
