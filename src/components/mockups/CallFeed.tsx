"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BrowserFrame from "@/components/ui/BrowserFrame";
import { DEMO_CALLS, type DemoCall } from "./data/demo-calls";
import {
  DEMO_CHECKPOINT_DATA,
  CHECKPOINT_STEPS,
  type RepCheckpoints,
} from "./data/demo-checkpoints";

/* ── Outcome badge colors ─────────────────────────────────────────── */

const outcomeBadge: Record<string, string> = {
  sold: "bg-emerald-100 text-emerald-700",
  qualified: "bg-amber-100 text-amber-700",
  unqualified: "bg-slate-100 text-slate-600",
  abandoned: "bg-red-100 text-red-700",
};

/* ── Helpers ───────────────────────────────────────────────────────── */

function formatDuration(secs: number) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

/** Map full agent name → abbreviated name used in checkpoint data */
function abbreviateName(fullName: string): string {
  const parts = fullName.split(" ");
  if (parts.length < 2) return fullName;
  return `${parts[0]} ${parts[1][0]}.`;
}

/** Look up checkpoint data for a given agent */
function getCheckpointsForAgent(agentName: string): RepCheckpoints | undefined {
  const abbrev = abbreviateName(agentName);
  return DEMO_CHECKPOINT_DATA.find((r) => r.name === abbrev);
}

/** Generate a coaching note based on call data and checkpoint scores */
function generateCoachingNote(call: DemoCall, checkpoints?: RepCheckpoints): string {
  const firstName = call.agentName.split(" ")[0];

  if (call.exceptional) {
    return `${firstName} nailed this call. Strong needs assessment, clean close, and solid objection handling. This is a great example to share with the team.`;
  }

  if (call.needsCoaching) {
    // Find the weakest checkpoint
    if (checkpoints) {
      const entries = Object.entries(checkpoints.scores) as [string, number][];
      const weakest = entries.reduce((a, b) => (a[1] < b[1] ? a : b));
      return `${firstName} needs work on ${weakest[0].toLowerCase()} (${weakest[1]}%). Consider reviewing top-performer calls for this step — small improvements here could significantly lift close rates.`;
    }
    return `${firstName} has room to improve on this call. Focus on objection handling and urgency to increase conversion.`;
  }

  if (call.outcome === "abandoned") {
    return `${firstName} lost the prospect early. The call ended before reaching a close attempt. Work on building rapport quickly and addressing concerns before they disengage.`;
  }

  if (call.outcome === "unqualified") {
    return `${firstName} correctly identified this lead as outside the service area. Good qualifying, but consider offering a referral partner recommendation.`;
  }

  if (call.outcome === "qualified") {
    return `${firstName} kept the deal alive but didn't close. The follow-up summary is key — coach on creating urgency before the prospect goes cold.`;
  }

  // sold (non-exceptional)
  return `Solid close by ${firstName}. All checkpoints met with good scores. Keep reinforcing this approach.`;
}

/* ── Sub-components ────────────────────────────────────────────────── */

function CheckpointCircle({ score }: { score: number }) {
  const r = 8;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score >= 85 ? "#10b981" : score >= 70 ? "#f59e0b" : "#ef4444";

  return (
    <svg width="22" height="22" viewBox="0 0 22 22" className="flex-shrink-0">
      <circle cx="11" cy="11" r={r} fill="none" stroke="#e2e8f0" strokeWidth="2" />
      <circle
        cx="11"
        cy="11"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 11 11)"
      />
    </svg>
  );
}

function RevenueIndicator({
  outcome,
  revenue,
}: {
  outcome: string;
  revenue: number | null;
}) {
  if (revenue === null || outcome === "unqualified") {
    return (
      <span className="text-[10px] font-mono tabular-nums text-slate-300 flex-shrink-0 w-[72px] text-right">
        —
      </span>
    );
  }

  if (outcome === "sold") {
    return (
      <span className="text-[10px] font-mono tabular-nums text-emerald-600 font-medium flex-shrink-0 w-[72px] text-right">
        ${revenue}
      </span>
    );
  }

  if (outcome === "qualified") {
    return (
      <span className="text-[10px] font-mono tabular-nums text-amber-600 font-medium flex-shrink-0 w-[72px] text-right">
        ${revenue} at risk
      </span>
    );
  }

  // abandoned
  return (
    <span className="text-[10px] font-mono tabular-nums text-red-500 font-medium flex-shrink-0 w-[72px] text-right line-through">
      ${revenue}
    </span>
  );
}

/** Colored pill for an individual checkpoint score */
function CheckpointPill({ label, score }: { label: string; score: number }) {
  const color =
    score >= 85
      ? "bg-emerald-100 text-emerald-700"
      : score >= 70
        ? "bg-amber-100 text-amber-700"
        : "bg-red-100 text-red-700";

  return (
    <span className={`inline-flex items-center gap-1 text-[9px] font-medium rounded-full px-1.5 py-0.5 ${color}`}>
      {label}
      <span className="font-mono tabular-nums">{score}</span>
    </span>
  );
}

/** Revenue line for expanded detail */
function RevenueDetail({ outcome, revenue }: { outcome: string; revenue: number | null }) {
  if (revenue === null || outcome === "unqualified") return null;

  const colorClass =
    outcome === "sold"
      ? "text-emerald-600"
      : outcome === "qualified"
        ? "text-amber-600"
        : "text-red-500";

  const label =
    outcome === "sold"
      ? "Closed"
      : outcome === "qualified"
        ? "At risk"
        : "Lost";

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[10px] text-slate-400">Revenue:</span>
      <span className={`text-[11px] font-mono font-semibold tabular-nums ${colorClass}`}>
        ${revenue.toLocaleString()}
      </span>
      <span className={`text-[9px] rounded px-1 py-0.5 font-medium ${outcomeBadge[outcome]}`}>
        {label}
      </span>
    </div>
  );
}

/** Expanded detail panel for a call row */
function ExpandedDetail({ call }: { call: DemoCall }) {
  const checkpoints = getCheckpointsForAgent(call.agentName);
  const coachingNote = generateCoachingNote(call, checkpoints);

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <div className="pt-2 pb-1 pl-14 pr-3 space-y-2.5">
        {/* Transcript preview */}
        <div>
          <p className="text-[10px] text-slate-400 font-heading font-semibold mb-0.5">
            Transcript
          </p>
          <p className="text-[11px] text-slate-600 italic leading-relaxed">
            &ldquo;{call.transcriptPreview}&rdquo;
          </p>
        </div>

        {/* Checkpoint breakdown */}
        {checkpoints && (
          <div>
            <p className="text-[10px] text-slate-400 font-heading font-semibold mb-1">
              QC Checkpoints
            </p>
            <div className="flex flex-wrap gap-1">
              {CHECKPOINT_STEPS.map((step) => (
                <CheckpointPill
                  key={step}
                  label={step}
                  score={checkpoints.scores[step]}
                />
              ))}
            </div>
          </div>
        )}

        {/* Revenue indicator */}
        <RevenueDetail outcome={call.outcome} revenue={call.revenueAtStake} />

        {/* Coaching note */}
        <div className="rounded-lg border-l-3 border-primary bg-primary/5 p-2.5">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-4 h-4 rounded bg-primary flex items-center justify-center">
              <span className="text-white text-[8px] font-bold">P</span>
            </div>
            <span className="text-[10px] font-heading font-semibold text-slate-700">
              Plaibook Coach
            </span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            {coachingNote}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Financial summary (computed once) ─────────────────────────────── */

const closedTotal = DEMO_CALLS.filter((c) => c.outcome === "sold").reduce(
  (sum, c) => sum + (c.revenueAtStake ?? 0),
  0
);
const atRiskTotal = DEMO_CALLS.filter((c) => c.outcome === "qualified").reduce(
  (sum, c) => sum + (c.revenueAtStake ?? 0),
  0
);

/* ── Main component ────────────────────────────────────────────────── */

export default function CallFeed({ className = "" }: { className?: string }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Pause scrolling when hovering or when a row is expanded
  const isPaused = isHovering || expandedId !== null;

  // Double the list for seamless looping
  const doubledCalls = useMemo(() => [...DEMO_CALLS, ...DEMO_CALLS], []);

  function handleRowClick(callId: string) {
    setExpandedId((prev) => (prev === callId ? null : callId));
  }

  return (
    <BrowserFrame className={className}>
      <div className="bg-slate-50">
        {/* Header */}
        <div className="px-3 py-2 border-b border-slate-200 bg-white flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-heading font-semibold text-slate-800">Live Call Feed</span>
          <span className="ml-auto flex items-center gap-3 text-[10px] font-mono tabular-nums">
            <span className="text-slate-400">
              {DEMO_CALLS.length} calls today
            </span>
            <span className="text-emerald-600 font-medium">
              ${closedTotal.toLocaleString()} closed
            </span>
            <span className="text-amber-600 font-medium">
              ${atRiskTotal.toLocaleString()} at risk
            </span>
          </span>
        </div>

        {/* Scrolling container */}
        <div
          className="relative max-h-[340px] overflow-hidden"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div
            className="flex flex-col"
            style={{
              animation: "scroll 25s linear infinite",
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {doubledCalls.map((call, i) => {
              // Only allow expansion in the first copy to avoid duplicate expanded rows
              const isFirstCopy = i < DEMO_CALLS.length;
              const isExpanded = isFirstCopy && expandedId === call.id;

              return (
                <div
                  key={`${call.id}-${i}`}
                  className={`border-b border-slate-100 transition-colors duration-150 ${
                    isExpanded
                      ? "bg-primary/5"
                      : "bg-white hover:bg-slate-50"
                  } ${isFirstCopy ? "cursor-pointer" : ""}`}
                  onClick={isFirstCopy ? () => handleRowClick(call.id) : undefined}
                >
                  <div className="px-3 py-2 flex items-center gap-1.5 text-xs min-w-0">
                    <span className="text-slate-400 font-mono tabular-nums w-11 flex-shrink-0 text-[10px]">
                      {call.timestamp}
                    </span>
                    <span className="font-medium text-slate-800 truncate w-20 flex-shrink-0">
                      {call.agentName}
                    </span>
                    <span className="text-slate-500 truncate w-20 flex-shrink-0">{call.leadName}</span>
                    <span className="text-[10px] bg-slate-100 text-slate-500 rounded px-1 py-0.5 flex-shrink-0">
                      {call.leadSource}
                    </span>
                    <span className="font-mono tabular-nums text-slate-500 flex-shrink-0 ml-auto">
                      {formatDuration(call.duration)}
                    </span>
                    <span
                      className={`text-[10px] rounded px-1 py-0.5 font-medium flex-shrink-0 ${
                        outcomeBadge[call.outcome]
                      }`}
                    >
                      {call.outcome}
                    </span>
                    <RevenueIndicator outcome={call.outcome} revenue={call.revenueAtStake} />
                    <CheckpointCircle score={call.checkpointScore} />
                  </div>

                  {/* Expanded detail */}
                  <AnimatePresence initial={false}>
                    {isExpanded && <ExpandedDetail call={call} />}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none" />
        </div>
      </div>
    </BrowserFrame>
  );
}
