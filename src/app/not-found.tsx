"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Header from "@/components/marketing/Header";
import Footer from "@/components/marketing/Footer";
import Button from "@/components/ui/Button";
import {
  DEMO_URL,
  GAMETAPE_LABEL,
  GAMETAPE_URL,
} from "@/lib/constants";

const quickLinks = [
  {
    title: "Home",
    href: "/",
    description: "Get back to the main pitch and product overview.",
  },
  {
    title: GAMETAPE_LABEL,
    href: GAMETAPE_URL,
    description: "Review sales breakdowns, benchmarks, and real call data.",
  },
  {
    title: "Case Study",
    href: "/case-study",
    description: "See how Plaibook drove revenue in a real campaign.",
  },
  {
    title: "Book a Demo",
    href: DEMO_URL,
    description: "Skip the tour and look at your own data instead.",
  },
] as const;

export default function NotFound() {
  const pathname = usePathname();
  const router = useRouter();

  const suggestedPath = pathname?.startsWith("/blog")
    ? pathname.replace(/^\/blog(?=\/|$)/, GAMETAPE_URL)
    : null;

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/");
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-dark text-text-light pt-24">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(66,217,200,0.20),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(245,158,11,0.14),transparent_24%),linear-gradient(180deg,#0f172a_0%,#111827_100%)]" />
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:32px_32px]" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] items-start">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-mono uppercase tracking-[0.25em] text-primary">
                  404
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Lost The Tape
                </div>

                <h1 className="mt-6 font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-[0.95]">
                  This play is not on the board.
                </h1>

                <p className="mt-6 max-w-2xl text-base sm:text-lg text-text-light/72 leading-relaxed">
                  The page you were looking for is missing, retired, or got
                  moved during a route change. We kept the recovery path simple:
                  go back, jump home, or head straight into the places people
                  usually want next.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Button href="/" variant="primary" size="lg">
                    Return Home
                  </Button>
                  <Button onClick={handleBack} variant="dark" size="lg">
                    Go Back
                  </Button>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  {quickLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-white/10"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-heading text-xl text-white">
                            {link.title}
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-text-light/65">
                            {link.description}
                          </p>
                        </div>
                        <span className="text-primary transition-transform duration-200 group-hover:translate-x-1">
                          {"->"}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <aside className="relative">
                <div className="absolute -inset-3 rounded-[28px] bg-primary/10 blur-2xl" />
                <div className="relative rounded-[28px] border border-white/10 bg-slate-950/65 p-6 sm:p-7 shadow-2xl shadow-black/30 backdrop-blur-md">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.24em] text-primary">
                        Route Review
                      </p>
                      <h2 className="mt-2 font-heading text-2xl font-bold text-white">
                        Recover the miss fast
                      </h2>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-right">
                      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-light/45">
                        Status
                      </p>
                      <p className="mt-1 text-sm font-semibold text-accent-gold">
                        No match
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-text-light/45">
                      Requested Path
                    </p>
                    <p className="mt-2 break-all font-mono text-sm text-text-light/80">
                      {pathname || "/"}
                    </p>
                  </div>

                  {suggestedPath ? (
                    <div className="mt-4 rounded-2xl border border-primary/25 bg-primary/[0.08] p-4">
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary">
                        Likely Recovery
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-text-light/72">
                        Old blog routes now live under {GAMETAPE_LABEL}. If you
                        were looking for the same page, this is the closest
                        match.
                      </p>
                      <Link
                        href={suggestedPath}
                        className="mt-4 inline-flex items-center rounded-lg border border-primary/30 bg-primary/[0.12] px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/20"
                      >
                        Try {suggestedPath}
                      </Link>
                    </div>
                  ) : (
                    <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-text-light/45">
                        Plaibook Hint
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-text-light/72">
                        If you came here from an old link, the destination may
                        have been retired or renamed. The {GAMETAPE_LABEL},
                        case study, and demo are the highest-signal recovery
                        paths.
                      </p>
                    </div>
                  )}

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-light/45">
                        Signal
                      </p>
                      <p className="mt-2 font-heading text-2xl text-white">01</p>
                      <p className="mt-1 text-xs text-text-light/55">
                        Missing route detected
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-light/45">
                        Signal
                      </p>
                      <p className="mt-2 font-heading text-2xl text-white">02</p>
                      <p className="mt-1 text-xs text-text-light/55">
                        Best next paths surfaced
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-light/45">
                        Signal
                      </p>
                      <p className="mt-2 font-heading text-2xl text-white">03</p>
                      <p className="mt-1 text-xs text-text-light/55">
                        Session recovered
                      </p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
