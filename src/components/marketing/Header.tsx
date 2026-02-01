"use client";

import { useState } from "react";
import Link from "next/link";
import PlaibookLogo from "@/components/ui/PlaiboookLogo";
import Button from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/constants";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement Bar */}
      <div className="bg-bg-dark text-center py-2 px-4">
        <p className="text-xs text-gray-300">
          <span className="text-accent-gold font-semibold">New:</span>{" "}
          AI-powered SMS upsales now available.{" "}
          <a
            href="/sms-upsales"
            className="text-primary-light underline underline-offset-2 hover:text-white transition-colors"
          >
            Learn more &rarr;
          </a>
        </p>
      </div>

      {/* Navigation */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <PlaibookLogo size={32} />
              <span className="text-xl font-bold text-text-primary">
                Plaibook
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) =>
                "children" in link ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button aria-expanded={dropdownOpen} aria-haspopup="true" className="flex items-center gap-1 text-sm font-medium text-text-muted hover:text-text-primary transition-colors cursor-pointer">
                      {link.label}
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {dropdownOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                        <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-4 min-w-[320px]">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-3 rounded-lg hover:bg-surface-alt transition-colors"
                            >
                              <div className="font-medium text-text-primary text-sm">
                                {child.label}
                              </div>
                              <div className="text-xs text-text-muted mt-0.5">
                                {child.description}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm font-medium text-text-muted hover:text-text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="#"
                className="text-sm font-medium text-text-muted hover:text-text-primary transition-colors"
              >
                Log in
              </a>
              <Button href="/demo" size="sm">
                Get a Demo
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Nav */}
          {mobileOpen && (
            <div className="md:hidden pb-6 pt-2 border-t border-gray-100">
              {NAV_LINKS.map((link) =>
                "children" in link ? (
                  <div key={link.label} className="py-2">
                    <div className="text-xs font-semibold text-text-muted uppercase tracking-wider px-2 mb-2">
                      {link.label}
                    </div>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-text-primary hover:text-primary transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block px-2 py-2 text-sm font-medium text-text-primary hover:text-primary transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <div className="pt-4 px-2 flex flex-col gap-3">
                <a
                  href="#"
                  className="text-sm font-medium text-text-muted hover:text-text-primary transition-colors text-center"
                >
                  Log in
                </a>
                <Button href="/demo" size="sm" className="w-full">
                  Get a Demo
                </Button>
              </div>
            </div>
          )}
        </nav>
      </header>
    </div>
  );
}
