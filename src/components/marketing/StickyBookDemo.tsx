"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import { DEMO_URL } from "@/lib/constants";

export default function StickyBookDemo() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-40 md:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-white/95 backdrop-blur-sm shadow-[0_-2px_12px_rgba(0,0,0,0.1)] px-4 py-3">
        <Button href={DEMO_URL} variant="primary" size="md" className="w-full">
          Book a Demo
        </Button>
      </div>
    </div>
  );
}
