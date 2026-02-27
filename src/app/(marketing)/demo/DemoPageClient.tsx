"use client";

import FadeIn from "@/components/marketing/FadeIn";

const benefits = [
  "How Plaibook analyzes every sales call your team takes in real time",
  "Where your leads are falling through the cracks (and how much it costs you)",
  "How AI agents recover missed opportunities over SMS while you sleep",
  "Live walkthrough of the platform customized to your business",
];

const stats = [
  { value: "17×", label: "appointment increase" },
  { value: "$700K+", label: "upsell revenue" },
  { value: "786", label: "AI-driven sales" },
];

const trustIndicators = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    text: "No credit card required",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    text: "Setup in 24 hours",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    text: "Outcome-based pricing",
  },
];

const inputClasses =
  "w-full px-4 py-3 rounded-lg border border-gray-200 bg-surface-alt text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-colors";

export default function DemoPageClient() {
  return (
    <>
      {/* Dark hero section */}
      <section className="relative bg-bg-dark pt-20 pb-16 sm:pt-28 sm:pb-24 overflow-hidden noise-texture">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4 font-mono">
                Book a Demo
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-light tracking-tight leading-[1.1] mb-6">
                See How Much Revenue{" "}
                <span className="text-primary">You&apos;re Missing</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
                Get a personalized walkthrough. We&apos;ll show you exactly
                where leads are falling through the cracks and how
                Plaibook&apos;s AI recovers them automatically.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Main content - split layout */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-20">
            {/* Left column - pitch */}
            <FadeIn className="mb-12 lg:mb-0">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight mb-6">
                  In 30 minutes, you&apos;ll see exactly how Plaibook turns
                  missed calls into booked jobs.
                </h2>

                {/* Benefits list */}
                <div className="space-y-4 mb-10">
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-primary"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-text-secondary leading-relaxed">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Stats row */}
                <div className="flex flex-wrap gap-8 mb-10 pb-10 border-b border-gray-100">
                  {stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="text-2xl font-bold text-primary font-mono">
                        {stat.value}
                      </div>
                      <div className="text-xs text-text-muted mt-0.5">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Testimonial */}
                <blockquote className="relative">
                  <div className="absolute -top-3 -left-2 text-5xl text-primary/15 font-serif leading-none select-none">
                    &ldquo;
                  </div>
                  <p className="text-text-secondary italic leading-relaxed pl-4 border-l-2 border-primary/20">
                    Plaibook recovered revenue we didn&apos;t even know we were
                    leaving on the table. The AI agents booked appointments from
                    leads our team had already written off.
                  </p>
                  <footer className="mt-3 pl-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                        BK
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-text-primary">
                          Brian K.
                        </p>
                        <p className="text-xs text-text-muted">
                          GM, BRD Pest Solutions
                        </p>
                      </div>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </FadeIn>

            {/* Right column - form */}
            <FadeIn delay={0.2}>
              <div className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-10 shadow-xl shadow-gray-100/50 lg:sticky lg:top-28">
                <h3 className="text-xl font-bold text-text-primary mb-1">
                  Request Your Demo
                </h3>
                <p className="text-sm text-text-muted mb-8">
                  Fill out the form and we&apos;ll reach out within one business
                  day.
                </p>

                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="space-y-5"
                >
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="demo-name"
                      className="block text-sm font-medium text-text-primary mb-1.5"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="demo-name"
                      name="name"
                      placeholder="John Smith"
                      className={inputClasses}
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label
                      htmlFor="demo-company"
                      className="block text-sm font-medium text-text-primary mb-1.5"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="demo-company"
                      name="company"
                      placeholder="Acme Pest Control"
                      className={inputClasses}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="demo-email"
                      className="block text-sm font-medium text-text-primary mb-1.5"
                    >
                      Work Email
                    </label>
                    <input
                      type="email"
                      id="demo-email"
                      name="email"
                      placeholder="john@acmepest.com"
                      className={inputClasses}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="demo-phone"
                      className="block text-sm font-medium text-text-primary mb-1.5"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="demo-phone"
                      name="phone"
                      placeholder="(555) 123-4567"
                      className={inputClasses}
                    />
                  </div>

                  {/* Number of Agents */}
                  <div>
                    <label
                      htmlFor="demo-agents"
                      className="block text-sm font-medium text-text-primary mb-1.5"
                    >
                      Number of Sales Agents
                    </label>
                    <select
                      id="demo-agents"
                      name="agents"
                      defaultValue=""
                      className={`${inputClasses} appearance-none`}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238B90A0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 16px center",
                      }}
                    >
                      <option value="" disabled>
                        Select team size
                      </option>
                      <option value="1-5">1 - 5 agents</option>
                      <option value="6-15">6 - 15 agents</option>
                      <option value="16-30">16 - 30 agents</option>
                      <option value="31-50">31 - 50 agents</option>
                      <option value="50+">50+ agents</option>
                    </select>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full bg-primary text-white font-semibold py-3.5 px-6 rounded-lg hover:bg-primary-dark shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] text-base cursor-pointer"
                  >
                    Request Demo
                  </button>
                </form>

                {/* Trust indicators */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                    {trustIndicators.map((item) => (
                      <div
                        key={item.text}
                        className="flex items-center gap-2 text-text-muted"
                      >
                        <span className="text-primary/60">{item.icon}</span>
                        <span className="text-xs">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mailto fallback */}
                <p className="text-xs text-text-muted text-center mt-6">
                  Prefer email? Reach us at{" "}
                  <a
                    href="mailto:team@plaibook.tech?subject=Demo Request"
                    className="text-primary hover:underline"
                  >
                    team@plaibook.tech
                  </a>
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
