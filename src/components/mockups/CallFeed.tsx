"use client";

import BrowserFrame from "@/components/ui/BrowserFrame";
import { DEMO_CALLS } from "./data/demo-calls";

const outcomeBadge: Record<string, string> = {
  sold: "bg-emerald-100 text-emerald-700",
  qualified: "bg-amber-100 text-amber-700",
  unqualified: "bg-slate-100 text-slate-600",
  abandoned: "bg-red-100 text-red-700",
};

function formatDuration(secs: number) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

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

export default function CallFeed({ className = "" }: { className?: string }) {
  const expandedId = "c-001";

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
          <span className="ml-auto text-[10px] text-slate-400 font-mono tabular-nums">
            {DEMO_CALLS.length} calls today
          </span>
        </div>

        {/* Scrolling container */}
        <div className="relative max-h-[340px] overflow-hidden">
          <div className="animate-[scroll_25s_linear_infinite] flex flex-col">
            {[...DEMO_CALLS, ...DEMO_CALLS].map((call, i) => (
              <div
                key={`${call.id}-${i}`}
                className={`px-3 py-2 border-b border-slate-100 ${
                  call.id === expandedId && i < DEMO_CALLS.length ? "bg-primary/5" : "bg-white"
                }`}
              >
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400 font-mono tabular-nums w-14 flex-shrink-0 text-[10px]">
                    {call.timestamp}
                  </span>
                  <span className="font-medium text-slate-800 truncate w-24 flex-shrink-0">
                    {call.agentName}
                  </span>
                  <span className="text-slate-500 truncate w-24 flex-shrink-0">{call.leadName}</span>
                  <span className="text-[10px] bg-slate-100 text-slate-500 rounded px-1.5 py-0.5 flex-shrink-0">
                    {call.leadSource}
                  </span>
                  <span className="font-mono tabular-nums text-slate-500 flex-shrink-0 ml-auto">
                    {formatDuration(call.duration)}
                  </span>
                  <span
                    className={`text-[10px] rounded px-1.5 py-0.5 font-medium flex-shrink-0 ${
                      outcomeBadge[call.outcome]
                    }`}
                  >
                    {call.outcome}
                  </span>
                  <CheckpointCircle score={call.checkpointScore} />
                </div>

                {/* Expanded row */}
                {call.id === expandedId && i < DEMO_CALLS.length && (
                  <div className="mt-1.5 pl-14 text-[11px] text-slate-500 italic leading-relaxed">
                    &ldquo;{call.transcriptPreview}&rdquo;
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none" />
        </div>
      </div>

    </BrowserFrame>
  );
}
