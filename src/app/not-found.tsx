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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(66,217,200,0.18),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(245,158,11,0.10),transparent_24%),linear-gradient(180deg,#0f172a_0%,#111827_100%)]" />
          <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:32px_32px]" />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="mx-auto max-w-3xl rounded-[32px] border border-white/10 bg-white/[0.04] p-8 sm:p-10 shadow-2xl shadow-black/25 backdrop-blur-md">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-mono uppercase tracking-[0.25em] text-primary">
                404
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Lost The Tape
              </div>

              <h1 className="mt-6 font-heading text-4xl sm:text-5xl font-bold leading-[0.98]">
                This play is not in the book.
              </h1>

              <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-text-light/72">
                The route you tried does not exist anymore. Go back, head home,
                or jump into one of the core Plaibook pages.
              </p>

              <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-3">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-light/45">
                  Requested Path
                </p>
                <p className="mt-2 break-all font-mono text-sm text-text-light/80">
                  {pathname || "/"}
                </p>
              </div>

              {suggestedPath && (
                <div className="mt-4 rounded-2xl border border-primary/20 bg-primary/[0.07] px-4 py-3">
                  <p className="text-sm leading-relaxed text-text-light/72">
                    Old blog routes now live under {GAMETAPE_LABEL}.{" "}
                    <Link
                      href={suggestedPath}
                      className="font-semibold text-primary hover:text-primary-light"
                    >
                      Try {suggestedPath}
                    </Link>
                  </p>
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/" variant="primary" size="lg">
                  Return Home
                </Button>
                <Button onClick={handleBack} variant="dark" size="lg">
                  Go Back
                </Button>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-text-light/60">
                <Link href={GAMETAPE_URL} className="hover:text-primary">
                  Open {GAMETAPE_LABEL}
                </Link>
                <Link href="/case-study" className="hover:text-primary">
                  View Case Study
                </Link>
                <Link href={DEMO_URL} className="hover:text-primary">
                  Book a Demo
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
