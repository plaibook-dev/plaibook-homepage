"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ── Data ──────────────────────────────────────────────────────────────────────

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DATA_2023 = [800, 980, 1284, 1600, 1720, 1765, 1800, 1800, 1803, 1803, 1803, 1803];
const DATA_2024 = [1850, 2050, 2350, 2850, 3560, 3595, 3596, 3596, 3596, 3596, 3596, 3596];
const DATA_2025 = [3600, 3850, 3958, 4400, 6250, 6600, 6650, 8100, 8500, 8600, 8600, 8614];

// ── Layout constants ──────────────────────────────────────────────────────────

const SVG_WIDTH = 800;
const SVG_HEIGHT = 420;
const PADDING = { top: 40, right: 30, bottom: 50, left: 60 };
const CHART_W = SVG_WIDTH - PADDING.left - PADDING.right;
const CHART_H = SVG_HEIGHT - PADDING.top - PADDING.bottom;

const Y_MAX = 9000;
const Y_TICKS = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000];

// ── Colors ────────────────────────────────────────────────────────────────────

const COLOR_2023 = "#5eead4"; // teal / cyan
const COLOR_2024 = "#f472b6"; // pink / coral
const COLOR_2025 = "#3b82f6"; // bold blue
const COLOR_ANNOTATION = "#94a3b8"; // understated slate for annotation line
const COLOR_ANNOTATION_TEXT = "#334155"; // darker slate for label text
const COLOR_GRID = "#e2e8f0"; // subtle grid
const COLOR_AXIS_TEXT = "#64748b";

// ── Helpers ───────────────────────────────────────────────────────────────────

function xPos(monthIndex: number): number {
  return PADDING.left + (monthIndex / (MONTHS.length - 1)) * CHART_W;
}

function yPos(value: number): number {
  return PADDING.top + CHART_H - (value / Y_MAX) * CHART_H;
}

function buildPathD(data: number[]): string {
  return data
    .map((val, i) => `${i === 0 ? "M" : "L"} ${xPos(i).toFixed(1)} ${yPos(val).toFixed(1)}`)
    .join(" ");
}

function pathLength(data: number[]): number {
  let len = 0;
  for (let i = 1; i < data.length; i++) {
    const dx = xPos(i) - xPos(i - 1);
    const dy = yPos(data[i]) - yPos(data[i - 1]);
    len += Math.sqrt(dx * dx + dy * dy);
  }
  return len;
}

// ── Animated Line Sub-component ───────────────────────────────────────────────

function AnimatedLine({
  data,
  color,
  delay,
  isInView,
}: {
  data: number[];
  color: string;
  delay: number;
  isInView: boolean;
}) {
  const d = buildPathD(data);
  const len = pathLength(data);

  return (
    <g>
      {/* Line */}
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ strokeDasharray: len, strokeDashoffset: len }}
        animate={isInView ? { strokeDashoffset: 0 } : { strokeDashoffset: len }}
        transition={{ duration: 1.4, ease: "easeInOut", delay }}
      />
      {/* Dot markers */}
      {data.map((val, i) => (
        <motion.circle
          key={i}
          cx={xPos(i)}
          cy={yPos(val)}
          r={2.5}
          fill={color}
          stroke="#fff"
          strokeWidth={1.2}
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{
            duration: 0.25,
            delay: delay + 0.1 + i * 0.08,
            ease: "easeOut",
          }}
        />
      ))}
    </g>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function CumulativeChart() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Annotation position: July 2025 = index 6
  const annotationMonthIndex = 6;
  const annotationX = xPos(annotationMonthIndex);
  const annotationY = yPos(DATA_2025[annotationMonthIndex]);

  return (
    <div ref={ref} className="mt-10 max-w-4xl">
      <p className="text-xs font-mono text-text-muted tracking-wider uppercase mb-3">
        Cumulative Mosquito Appointments by Year
      </p>

      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm">
        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          className="w-full h-auto"
          aria-label="Cumulative mosquito appointments chart showing 2023, 2024, and 2025 data"
          role="img"
        >
          {/* ── Grid lines ──────────────────────────────────── */}
          {Y_TICKS.map((tick) => (
            <line
              key={tick}
              x1={PADDING.left}
              y1={yPos(tick)}
              x2={SVG_WIDTH - PADDING.right}
              y2={yPos(tick)}
              stroke={COLOR_GRID}
              strokeWidth={tick === 0 ? 1 : 0.5}
              strokeDasharray={tick === 0 ? undefined : "4 4"}
            />
          ))}

          {/* ── Y-axis labels ───────────────────────────────── */}
          {Y_TICKS.map((tick) => (
            <text
              key={tick}
              x={PADDING.left - 10}
              y={yPos(tick) + 4}
              textAnchor="end"
              fill={COLOR_AXIS_TEXT}
              fontSize={11}
              fontFamily="var(--font-mono), monospace"
            >
              {tick === 0 ? "0" : `${(tick / 1000).toFixed(0)}k`}
            </text>
          ))}

          {/* ── X-axis labels ───────────────────────────────── */}
          {MONTHS.map((m, i) => (
            <text
              key={m}
              x={xPos(i)}
              y={SVG_HEIGHT - PADDING.bottom + 24}
              textAnchor="middle"
              fill={COLOR_AXIS_TEXT}
              fontSize={11}
              fontFamily="var(--font-mono), monospace"
            >
              {m}
            </text>
          ))}

          {/* ── Data lines (animated) ───────────────────────── */}
          <AnimatedLine data={DATA_2023} color={COLOR_2023} delay={0} isInView={isInView} />
          <AnimatedLine data={DATA_2024} color={COLOR_2024} delay={0.4} isInView={isInView} />
          <AnimatedLine data={DATA_2025} color={COLOR_2025} delay={0.9} isInView={isInView} />

          {/* ── "Plaibook Started Here" annotation ──────────── */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 2.0 }}
          >
            {/* Vertical dashed reference line from point down to x-axis */}
            <line
              x1={annotationX}
              y1={annotationY}
              x2={annotationX}
              y2={PADDING.top + CHART_H}
              stroke={COLOR_ANNOTATION}
              strokeWidth={0.8}
              strokeDasharray="3 3"
              opacity={0.4}
            />

            {/* Small dot on the data point */}
            <circle
              cx={annotationX}
              cy={annotationY}
              r={4}
              fill="none"
              stroke={COLOR_ANNOTATION}
              strokeWidth={1.2}
              opacity={0.6}
            />

            {/* Thin connecting line from point down-right to label */}
            <line
              x1={annotationX + 3}
              y1={annotationY + 4}
              x2={annotationX + 22}
              y2={annotationY + 22}
              stroke={COLOR_ANNOTATION}
              strokeWidth={0.8}
              opacity={0.5}
            />

            {/* Label text — positioned down and to the right */}
            <text
              x={annotationX + 26}
              y={annotationY + 30}
              textAnchor="start"
              fill={COLOR_ANNOTATION_TEXT}
              fontSize={11}
              fontWeight={500}
              fontFamily="var(--font-sans), sans-serif"
              letterSpacing="0.01em"
            >
              Plaibook started here
            </text>
          </motion.g>

          {/* ── Legend ───────────────────────────────────────── */}
          <g transform={`translate(${PADDING.left + 8}, ${PADDING.top + 4})`}>
            {/* 2023 */}
            <line x1={0} y1={0} x2={20} y2={0} stroke={COLOR_2023} strokeWidth={1.8} strokeLinecap="round" />
            <circle cx={10} cy={0} r={2.5} fill={COLOR_2023} />
            <text x={28} y={4} fill={COLOR_AXIS_TEXT} fontSize={11} fontFamily="var(--font-sans), sans-serif">
              2023
            </text>

            {/* 2024 */}
            <line x1={80} y1={0} x2={100} y2={0} stroke={COLOR_2024} strokeWidth={1.8} strokeLinecap="round" />
            <circle cx={90} cy={0} r={2.5} fill={COLOR_2024} />
            <text x={108} y={4} fill={COLOR_AXIS_TEXT} fontSize={11} fontFamily="var(--font-sans), sans-serif">
              2024
            </text>

            {/* 2025 */}
            <line x1={160} y1={0} x2={180} y2={0} stroke={COLOR_2025} strokeWidth={1.8} strokeLinecap="round" />
            <circle cx={170} cy={0} r={2.5} fill={COLOR_2025} />
            <text x={188} y={4} fill={COLOR_AXIS_TEXT} fontSize={11} fontFamily="var(--font-sans), sans-serif">
              2025
            </text>
          </g>
        </svg>
      </div>

      <p className="text-xs text-text-muted mt-2">
        2023 and 2024 flatlined by mid-year. In 2025, the Plaibook campaign launched in July and
        drove sustained growth through Q3 and beyond.
      </p>
    </div>
  );
}
