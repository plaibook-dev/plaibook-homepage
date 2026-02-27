"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─── Types ──────────────────────────────────────────────────────────── */

interface LeakyFunnelProps {
  className?: string;
}

/* ─── Leak data ──────────────────────────────────────────────────────── */

interface Leak {
  id: number;
  side: "left" | "right";
  label: string;
  /** Y-center of the leak on the funnel wall (in SVG coords) */
  cy: number;
  /** X position of the gap on the funnel wall */
  wallX: number;
  /** Percentage-based positions for the HTML label */
  labelStyle: {
    top: string;
    left?: string;
    right?: string;
  };
  /** SVG connector line endpoints (from leak point to label area) */
  connector: { x1: number; y1: number; x2: number; y2: number };
  /** Leak stream path data (drops flowing outward) */
  streamPath: string;
  /** Patch position */
  patchX: number;
  patchY: number;
}

const LEAKS: Leak[] = [
  {
    id: 1,
    side: "left",
    label:
      "Paying $75/lead from an agency. 40% aren\u2019t real sales opportunities.",
    cy: 185,
    wallX: 168,
    labelStyle: { top: "20%", left: "0%" },
    connector: { x1: 168, y1: 185, x2: 48, y2: 170 },
    streamPath:
      "M 164 178 Q 134 172, 118 160 M 160 188 Q 126 186, 106 178 M 158 195 Q 132 198, 112 196",
    patchX: 154,
    patchY: 172,
  },
  {
    id: 2,
    side: "right",
    label: "Rep didn\u2019t ask for the sale. No one noticed.",
    cy: 310,
    wallX: 398,
    labelStyle: { top: "38%", right: "0%" },
    connector: { x1: 398, y1: 310, x2: 542, y2: 296 },
    streamPath:
      "M 402 302 Q 436 296, 456 284 M 406 312 Q 442 310, 466 302 M 404 320 Q 440 324, 462 320",
    patchX: 390,
    patchY: 297,
  },
  {
    id: 3,
    side: "left",
    label:
      "Lead said \u2018let me think about it.\u2019 No one followed up.",
    cy: 430,
    wallX: 210,
    labelStyle: { top: "56%", left: "0%" },
    connector: { x1: 210, y1: 430, x2: 48, y2: 418 },
    streamPath:
      "M 206 422 Q 174 416, 154 404 M 204 432 Q 168 430, 146 422 M 202 440 Q 172 444, 150 440",
    patchX: 196,
    patchY: 417,
  },
  {
    id: 4,
    side: "right",
    label:
      "Account opened but never serviced. Customer churns month 1.",
    cy: 540,
    wallX: 360,
    labelStyle: { top: "72%", right: "0%" },
    connector: { x1: 360, y1: 540, x2: 542, y2: 528 },
    streamPath:
      "M 364 532 Q 394 526, 414 514 M 366 542 Q 400 540, 424 532 M 364 550 Q 398 554, 420 550",
    patchX: 352,
    patchY: 527,
  },
];

/* ─── Subcomponents ──────────────────────────────────────────────────── */

/** Small green rounded-rect patch with a white checkmark */
function PatchIcon({
  x,
  y,
  inView,
  delay,
}: {
  x: number;
  y: number;
  inView: boolean;
  delay: number;
}) {
  return (
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      animate={
        inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
      }
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay,
      }}
      style={{ transformOrigin: `${x + 14}px ${y + 12}px` }}
    >
      <rect
        x={x}
        y={y}
        width={28}
        height={24}
        rx={6}
        fill="#6AA89A"
        stroke="#54877C"
        strokeWidth={1.2}
      />
      {/* Checkmark */}
      <path
        d={`M ${x + 8} ${y + 12} l 4 4.5 l 8 -9`}
        fill="none"
        stroke="#fff"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.g>
  );
}

/** A single leak stream (animated dashes flowing outward) */
function LeakStream({
  d,
  inView,
  delay,
}: {
  d: string;
  inView: boolean;
  delay: number;
}) {
  const pathLength = 120;
  return (
    <path
      d={d}
      fill="none"
      stroke="#D93B3B"
      strokeWidth={2}
      strokeOpacity={0.35}
      strokeLinecap="round"
      style={{
        strokeDasharray: pathLength,
        strokeDashoffset: inView ? 0 : pathLength,
        transition: `stroke-dashoffset 0.8s ease-out ${delay}s`,
      }}
    />
  );
}

/* ─── Main component ─────────────────────────────────────────────────── */

export default function LeakyFunnel({ className = "" }: LeakyFunnelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-[680px] mx-auto ${className}`}
    >
      {/* ── SVG Funnel ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <svg
          viewBox="0 0 600 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          aria-hidden="true"
        >
          <defs>
            {/* Subtle interior gradient */}
            <linearGradient id="funnel-fill" x1="300" y1="80" x2="300" y2="620" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0F172A" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0F172A" stopOpacity="0.95" />
            </linearGradient>
            {/* Flow gradient inside funnel */}
            <linearGradient id="flow-gradient" x1="300" y1="100" x2="300" y2="600" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#6AA89A" stopOpacity="0.04" />
              <stop offset="50%" stopColor="#6AA89A" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* ── Funnel body ──────────────────────────────────────── */}
          {/* Left wall */}
          <path
            d="M 120 100 L 120 120 L 168 185"
            fill="none"
            stroke="#6AA89A"
            strokeWidth={1.6}
            strokeOpacity={0.5}
          />
          <path
            d="M 168 195 L 210 430"
            fill="none"
            stroke="#6AA89A"
            strokeWidth={1.6}
            strokeOpacity={0.5}
          />
          <path
            d="M 210 440 L 245 600"
            fill="none"
            stroke="#6AA89A"
            strokeWidth={1.6}
            strokeOpacity={0.5}
          />

          {/* Right wall */}
          <path
            d="M 480 100 L 480 120 L 398 310"
            fill="none"
            stroke="#6AA89A"
            strokeWidth={1.6}
            strokeOpacity={0.5}
          />
          <path
            d="M 398 320 L 360 540"
            fill="none"
            stroke="#6AA89A"
            strokeWidth={1.6}
            strokeOpacity={0.5}
          />
          <path
            d="M 360 550 L 355 600"
            fill="none"
            stroke="#6AA89A"
            strokeWidth={1.6}
            strokeOpacity={0.5}
          />

          {/* Top opening */}
          <line x1="120" y1="100" x2="480" y2="100" stroke="#6AA89A" strokeWidth={1.6} strokeOpacity={0.5} />

          {/* Bottom spout */}
          <line x1="245" y1="600" x2="355" y2="600" stroke="#6AA89A" strokeWidth={1.6} strokeOpacity={0.5} />

          {/* Fill shape */}
          <path
            d="M 120 100 L 480 100 L 398 310 L 398 320 L 360 540 L 360 550 L 355 600 L 245 600 L 210 440 L 210 430 L 168 195 L 168 185 Z"
            fill="url(#funnel-fill)"
          />
          {/* Interior flow overlay */}
          <path
            d="M 125 104 L 475 104 L 394 310 L 394 320 L 356 540 L 356 550 L 352 596 L 248 596 L 214 440 L 214 430 L 172 195 L 172 185 Z"
            fill="url(#flow-gradient)"
          />

          {/* ── Top-of-funnel entering leads ─────────────────────── */}
          {[240, 270, 300, 330, 360].map((x, i) => (
            <motion.g
              key={`lead-${i}`}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.3 }}
            >
              <path
                d={`M ${x} 56 L ${x} 78`}
                stroke="#6AA89A"
                strokeWidth={1.6}
                strokeOpacity={0.5}
                strokeLinecap="round"
              />
              <path
                d={`M ${x - 5} 72 L ${x} 80 L ${x + 5} 72`}
                stroke="#6AA89A"
                strokeWidth={1.4}
                strokeOpacity={0.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </motion.g>
          ))}

          {/* "Leads" label */}
          <text
            x="300"
            y="46"
            textAnchor="middle"
            fill="#6AA89A"
            fillOpacity={0.6}
            fontSize="12"
            fontFamily="var(--font-sans), sans-serif"
            fontWeight={500}
            letterSpacing="0.08em"
          >
            LEADS
          </text>

          {/* ── Bottom revenue output ────────────────────────────── */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            <path
              d="M 285 605 L 285 650 M 300 605 L 300 658 M 315 605 L 315 650"
              stroke="#F59E0B"
              strokeWidth={2}
              strokeOpacity={0.6}
              strokeLinecap="round"
            />
            {/* Downward arrow */}
            <path
              d="M 290 652 L 300 666 L 310 652"
              stroke="#F59E0B"
              strokeWidth={2}
              strokeOpacity={0.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <text
              x="300"
              y="690"
              textAnchor="middle"
              fill="#F59E0B"
              fillOpacity={0.7}
              fontSize="12"
              fontFamily="var(--font-sans), sans-serif"
              fontWeight={600}
              letterSpacing="0.08em"
            >
              REVENUE
            </text>
          </motion.g>

          {/* ── Leak streams ─────────────────────────────────────── */}
          {LEAKS.map((leak) => (
            <g key={`stream-${leak.id}`}>
              {leak.streamPath.split(" M ").map((segment, i) => {
                const d = i === 0 ? segment : `M ${segment}`;
                return (
                  <LeakStream
                    key={`${leak.id}-${i}`}
                    d={d}
                    inView={inView}
                    delay={0.3 + leak.id * 0.15}
                  />
                );
              })}
            </g>
          ))}

          {/* ── Patches (green seals) ────────────────────────────── */}
          {LEAKS.map((leak) => (
            <PatchIcon
              key={`patch-${leak.id}`}
              x={leak.patchX}
              y={leak.patchY}
              inView={inView}
              delay={0.8 + leak.id * 0.15}
            />
          ))}

          {/* ── Connector lines (desktop only, hidden on mobile via CSS) ── */}
          <g className="hidden md:block">
            {LEAKS.map((leak) => (
              <motion.line
                key={`connector-${leak.id}`}
                x1={leak.connector.x1}
                y1={leak.connector.y1}
                x2={leak.connector.x2}
                y2={leak.connector.y2}
                stroke="#94A3B8"
                strokeWidth={0.8}
                strokeDasharray="4 3"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 0.5 } : {}}
                transition={{ delay: 0.9 + leak.id * 0.15, duration: 0.3 }}
              />
            ))}
          </g>

          {/* ── Subtle inner grid lines for depth ────────────────── */}
          {[200, 340, 480].map((y, i) => {
            // Calculate x positions on the funnel walls at this y
            const progress = (y - 100) / 500;
            const xLeft = 120 + progress * (245 - 120);
            const xRight = 480 - progress * (480 - 355);
            return (
              <line
                key={`grid-${i}`}
                x1={xLeft + 8}
                y1={y}
                x2={xRight - 8}
                y2={y}
                stroke="#6AA89A"
                strokeWidth={0.5}
                strokeOpacity={0.1}
              />
            );
          })}
        </svg>
      </motion.div>

      {/* ── Desktop labels (positioned over the SVG) ────────────── */}
      <div className="hidden md:block">
        {LEAKS.map((leak) => (
          <motion.div
            key={`label-${leak.id}`}
            className={`absolute bg-white/90 backdrop-blur-sm rounded-lg border border-slate-200 shadow-sm px-3 py-2 max-w-[220px] text-xs leading-relaxed text-slate-700`}
            style={leak.labelStyle}
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: 0.9 + leak.id * 0.15,
              duration: 0.4,
              ease: "easeOut",
            }}
          >
            <span className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full bg-accent-red/10 text-accent-red text-[10px] font-bold mr-1.5 flex-shrink-0 align-middle">
              {leak.id}
            </span>
            {leak.label}
          </motion.div>
        ))}
      </div>

      {/* ── Mobile labels (stacked list below the SVG) ──────────── */}
      <div className="md:hidden mt-6 space-y-3 px-2">
        {LEAKS.map((leak) => (
          <motion.div
            key={`mobile-label-${leak.id}`}
            className="flex items-start gap-3 bg-white/90 backdrop-blur-sm rounded-lg border border-slate-200 shadow-sm px-3 py-2.5 text-xs leading-relaxed text-slate-700"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: 0.6 + leak.id * 0.12,
              duration: 0.35,
              ease: "easeOut",
            }}
          >
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-accent-red/10 text-accent-red text-[10px] font-bold flex-shrink-0 mt-0.5">
              {leak.id}
            </span>
            <span>{leak.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
