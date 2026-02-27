"use client";

import {
  OBJECTION_CATEGORIES,
  getCallsByObjection,
} from "@/components/mockups/data/demo-objections";

interface ObjectionDrilldownScreenProps {
  objectionId: string;
  onSelectCall: (callId: string) => void;
  onBack: () => void;
}

const outcomeBadge: Record<string, { className: string; label: string }> = {
  lost: { className: "bg-red-100 text-red-700", label: "Lost" },
  stalled: { className: "bg-amber-100 text-amber-700", label: "Stalled" },
  recovered: { className: "bg-emerald-100 text-emerald-700", label: "Won" },
};

function formatDollars(n: number): string {
  return `$${n.toLocaleString()}`;
}

export default function ObjectionDrilldownScreen({
  objectionId,
  onSelectCall,
  onBack,
}: ObjectionDrilldownScreenProps) {
  const category = OBJECTION_CATEGORIES.find((o) => o.id === objectionId);
  if (!category) return null;

  const calls = getCallsByObjection(objectionId);

  // Stats
  const wonCount = calls.filter((c) => c.outcome === "recovered").length;
  const lostCount = calls.filter((c) => c.outcome === "lost").length;

  return (
    <div className="p-3">
      {/* Objection header */}
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
            {category.name}{" "}
            <span className="text-red-500 font-mono">
              &mdash; {formatDollars(category.revenueLost)} lost
            </span>
          </h3>
          <div className="flex items-center gap-3 mt-0.5">
            <span className="text-[10px] text-slate-500">
              {category.callCount} calls analyzed
            </span>
            <span className="text-[10px] text-emerald-600">
              {wonCount} won
            </span>
            <span className="text-[10px] text-red-500">
              {lostCount} lost
            </span>
            <span className="text-[10px] text-slate-500">
              {Math.round(category.recoveryRate * 100)}% recoverable
            </span>
          </div>
        </div>
      </div>

      {/* What Worked vs What Didn't Work — two columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
        {/* What Worked */}
        <div className="bg-emerald-50/70 rounded-lg p-2.5">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
              <svg
                width="10"
                height="10"
                viewBox="0 0 16 16"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 8.5l3.5 3.5L13 4" />
              </svg>
            </span>
            <span className="text-[11px] font-heading font-semibold text-emerald-800">
              What Worked
            </span>
          </div>
          <ul className="space-y-1.5">
            {category.whatWorked.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-emerald-500 text-[10px] mt-px flex-shrink-0 font-bold">
                  &#10003;
                </span>
                <span className="text-[10px] text-slate-700 leading-snug">
                  &ldquo;{item}&rdquo;
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* What Didn't Work */}
        <div className="bg-red-50/70 rounded-lg p-2.5">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
              <svg
                width="10"
                height="10"
                viewBox="0 0 16 16"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4l8 8" />
                <path d="M12 4l-8 8" />
              </svg>
            </span>
            <span className="text-[11px] font-heading font-semibold text-red-800">
              What Didn&apos;t Work
            </span>
          </div>
          <ul className="space-y-1.5">
            {category.whatDidntWork.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-red-500 text-[10px] mt-px flex-shrink-0 font-bold">
                  &#10007;
                </span>
                <span className="text-[10px] text-slate-700 leading-snug">
                  &ldquo;{item}&rdquo;
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recent Calls section */}
      <div>
        <p className="text-[10px] text-slate-500 font-heading font-semibold mb-1.5">
          Recent Calls with This Objection
        </p>
        <div className="space-y-0">
          {calls.slice(0, 4).map((call) => (
            <button
              key={call.id}
              onClick={() => onSelectCall(call.id)}
              className="flex items-center gap-2 text-xs px-2 py-1.5 rounded w-full text-left transition-colors hover:bg-slate-100"
            >
              <span className="text-slate-700 font-medium w-[72px] truncate flex-shrink-0">
                {call.leadName}
              </span>
              <span className="text-slate-400 text-[10px] w-[68px] truncate flex-shrink-0">
                {call.repName}
              </span>
              <span
                className={`text-[10px] rounded px-1.5 py-0.5 font-medium flex-shrink-0 ${outcomeBadge[call.outcome].className}`}
              >
                {outcomeBadge[call.outcome].label}
              </span>
              <span className="font-mono tabular-nums text-slate-600 font-semibold text-[10px] ml-auto flex-shrink-0">
                {formatDollars(call.revenueAtStake)}
              </span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-slate-300 flex-shrink-0"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
