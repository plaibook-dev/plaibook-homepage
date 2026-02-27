import Link from "next/link";
import PlaibookLogo from "@/components/ui/PlaiboookLogo";
import { NAV_LINKS, DEMO_URL, LOGIN_URL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-bg-dark py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <PlaibookLogo size={24} />
          <span className="font-heading font-bold text-text-light">Plaibook</span>
        </div>

        {/* Primary links */}
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-text-light/70 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Link
            href={DEMO_URL}
            className="text-text-light/70 hover:text-primary transition-colors"
          >
            Book a Demo
          </Link>
          <a
            href={LOGIN_URL}
            className="text-text-light/70 hover:text-primary transition-colors"
          >
            Login
          </a>
        </div>

        {/* Secondary links */}
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm mt-6">
          <Link
            href="/privacy-policy"
            className="text-text-light/50 hover:text-text-light/70 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service"
            className="text-text-light/50 hover:text-text-light/70 transition-colors"
          >
            Terms of Service
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-text-light/40 text-sm mt-8">
          &copy; 2026 Plaibook. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
