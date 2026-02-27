"use client";

import { DEMO_CALLS } from "@/components/mockups/data/demo-calls";
import {
  DEMO_CHECKPOINT_DATA,
  CHECKPOINT_STEPS,
} from "@/components/mockups/data/demo-checkpoints";

interface RepDrilldownScreenProps {
  agentName: string;
  onSelectCall: (callId: string) => void;
  onBack: () => void;
}

const outcomeBadge: Record<string, string> = {
  sold: "bg-emerald-100 text-emerald-700",
  qualified: "bg-amber-100 text-amber-700",
  unqualified: "bg-slate-100 text-slate-500",
  abandoned: "bg-red-100 text-red-700",
};

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function scoreColor(score: number): string {
  if (score >= 90) return "bg-emerald-500 text-white";
  if (score >= 75) return "bg-emerald-400 text-white";
  if (score >= 60) return "bg-amber-400 text-white";
  return "bg-red-400 text-white";
}

export default function RepDrilldownScreen({
  agentName,
  onSelectCall,
  onBack,
}: RepDrilldownScreenProps) {
  const agentCalls = DEMO_CALLS.filter((c) => c.agentName === agentName);

  // Stats
  const totalCalls = agentCalls.length;
  const closeRate = Math.round(
    (agentCalls.filter((c) => c.outcome === "sold").length / totalCalls) * 100
  );
  const avgQC = Math.round(
    agentCalls.reduce((sum, c) => sum + c.checkpointScore, 0) / totalCalls
  );

  // Find lowest-scoring call with needsCoaching
  const coachingCall = agentCalls.reduce<(typeof agentCalls)[number] | null>(
    (lowest, call) => {
      if (!call.needsCoaching) return lowest;
      if (!lowest || call.checkpointScore < lowest.checkpointScore)
        return call;
      return lowest;
    },
    null
  );
  // Fallback: just the lowest scoring call
  const highlightCall =
    coachingCall ??
    agentCalls.reduce((lowest, call) =>
      call.checkpointScore < lowest.checkpointScore ? call : lowest
    );

  // Checkpoint data for this rep
  const nameParts = agentName.split(" ");
  const shortName = nameParts[0] + " " + nameParts[1][0] + ".";
  const checkpointData = DEMO_CHECKPOINT_DATA.find(
    (r) => r.name === shortName
  );

  return (
    <div className="p-3">
      {/* Rep header */}
      <div className="flex items-start gap-2 mb-3">
        <button
          onClick={onBack}
          className="text-slate-400 hover:text-slate-600 mt-0.5 flex-shrink-0"
          aria-label="Go back"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-heading font-semibold text-slate-800">
            {agentName}
          </h3>
          <div className="flex items-center gap-3 mt-0.5">
            <span className="text-[10px] text-slate-500">
              {totalCalls} calls
            </span>
            <span className="text-[10px] text-slate-500">
              {closeRate}% close rate
            </span>
            <span className="text-[10px] text-slate-500">
              Avg QC {avgQC}%
            </span>
          </div>
        </div>
      </div>

      {/* Call list table */}
      <div className="space-y-0">
        {agentCalls.map((call) => {
          const isHighlight = call.id === highlightCall?.id;
          return (
            <button
              key={call.id}
              onClick={() => onSelectCall(call.id)}
              className={`flex items-center gap-2 text-xs px-2 py-2 rounded w-full text-left min-h-[44px] transition-colors hover:bg-slate-50 ${
                isHighlight ? "bg-primary/5 ring-1 ring-primary/20" : ""
              }`}
            >
              <span className="text-slate-700 font-medium w-24 truncate">
                {call.leadName}
              </span>
              <span className="bg-slate-100 text-slate-500 rounded px-1 py-0.5 text-[10px] flex-shrink-0">
                {call.leadSource}
              </span>
              <span className="font-mono tabular-nums text-slate-500 ml-auto text-[11px]">
                {formatDuration(call.duration)}
              </span>
              <span
                className={`text-[10px] rounded px-1.5 py-0.5 font-medium flex-shrink-0 ${outcomeBadge[call.outcome]}`}
              >
                {call.outcome}
              </span>
              <span className="font-mono tabular-nums text-slate-400 text-[10px] w-8 text-right flex-shrink-0">
                {call.checkpointScore}%
              </span>
              {isHighlight && (
                <span className="text-[9px] text-primary font-medium flex-shrink-0 whitespace-nowrap">
                  Review this call
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Mini QC scorecard */}
      {checkpointData && (
        <div className="mt-3">
          <p className="text-[10px] text-slate-500 mb-1.5 font-heading font-semibold">
            QC Checkpoints
          </p>
          <div className="flex flex-wrap gap-1">
            {CHECKPOINT_STEPS.map((step) => {
              const score = checkpointData.scores[step];
              return (
                <span
                  key={step}
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-medium ${scoreColor(score)}`}
                  title={`${step}: ${score}%`}
                >
                  <span className="truncate max-w-[72px]">{step}</span>
                  <span className="font-mono">{score}</span>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
