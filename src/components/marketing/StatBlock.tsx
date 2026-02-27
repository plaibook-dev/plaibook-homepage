"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

interface Props {
  value: string;
  label: string;
  light?: boolean;
}

/**
 * Parse a stat value like "$700K", "17×", "786", "1,360", "$0", "93%"
 * into { prefix, number, suffix, hasComma, decimals }.
 */
function parseStatValue(value: string) {
  const match = value.match(/^([^0-9]*)([0-9][0-9,]*\.?[0-9]*)(.*)$/);
  if (!match) return null;
  const prefix = match[1];
  const numStr = match[2];
  const suffix = match[3];
  const hasComma = numStr.includes(",");
  const cleanNum = numStr.replace(/,/g, "");
  const number = parseFloat(cleanNum);
  const decimalParts = cleanNum.split(".");
  const decimals = decimalParts.length > 1 ? decimalParts[1].length : 0;
  if (isNaN(number)) return null;
  return { prefix, number, suffix, hasComma, decimals };
}

function formatNumber(num: number, hasComma: boolean, decimals: number) {
  let formatted: string;
  if (decimals > 0) {
    formatted = num.toFixed(decimals);
  } else {
    formatted = Math.round(num).toString();
  }
  if (hasComma) {
    const parts = formatted.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    formatted = parts.join(".");
  }
  return formatted;
}

export default function StatBlock({ value, label, light = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [displayValue, setDisplayValue] = useState(value);
  const parsed = useMemo(() => parseStatValue(value), [value]);

  useEffect(() => {
    if (!isInView || !parsed) return;

    const controls = animate(0, parsed.number, {
      duration: 2,
      ease: "easeOut",
      onUpdate(latest) {
        setDisplayValue(
          `${parsed.prefix}${formatNumber(latest, parsed.hasComma, parsed.decimals)}${parsed.suffix}`
        );
      },
      onComplete() {
        // Ensure final value matches exactly
        setDisplayValue(value);
      },
    });

    return () => controls.stop();
  }, [isInView, parsed, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="text-center"
    >
      <div className="text-5xl sm:text-6xl font-bold text-primary mb-2 font-mono tabular-nums">
        {isInView ? displayValue : value}
      </div>
      <div
        className={`text-sm uppercase tracking-wider font-medium ${
          light ? "text-gray-400" : "text-text-muted"
        }`}
      >
        {label}
      </div>
    </motion.div>
  );
}
