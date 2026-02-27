"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PlaibookLogo from "@/components/ui/PlaiboookLogo";
import Button from "@/components/ui/Button";
import { NAV_LINKS, DEMO_URL, LOGIN_URL } from "@/lib/constants";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <PlaibookLogo size={28} />
          <span
            className={`font-heading font-bold text-lg transition-colors duration-300 ${
              scrolled ? "text-text-primary" : "text-text-light"
            }`}
          >
            Plaibook
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-300 hover:text-primary ${
                scrolled ? "text-text-secondary" : "text-text-light/80"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href={LOGIN_URL}
            className={`text-sm font-medium transition-colors duration-300 hover:text-primary ${
              scrolled ? "text-text-secondary" : "text-text-light/80"
            }`}
          >
            Login
          </a>
          <Button href={DEMO_URL} variant="primary" size="sm">
            Book a Demo
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 -mr-2"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <svg
            className={`w-6 h-6 transition-colors duration-300 ${
              scrolled ? "text-text-primary" : "text-text-light"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-80" : "max-h-0"
        }`}
      >
        <div className="bg-white shadow-lg px-4 pb-6 pt-2 space-y-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm font-medium text-text-secondary hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          <a
            href={LOGIN_URL}
            onClick={() => setMobileOpen(false)}
            className="block py-3 text-sm font-medium text-text-secondary hover:text-primary"
          >
            Login
          </a>
          <div className="pt-3">
            <Button href={DEMO_URL} variant="primary" size="md" className="w-full">
              Book a Demo
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
