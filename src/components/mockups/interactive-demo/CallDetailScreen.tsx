"use client";

import {
  OBJECTION_CALLS,
  OBJECTION_CATEGORIES,
  getTranscriptForCall,
} from "@/components/mockups/data/demo-objections";

interface CallDetailScreenProps {
  callId: string;
  objection: string;
  onBack: () => void;
}

const outcomeBadge: Record<string, string> = {
  lost: "bg-red-100 text-red-700",
  stalled: "bg-amber-100 text-amber-700",
  recovered: "bg-emerald-100 text-emerald-700",
};

function scoreBadge(score: number): string {
  if (score >= 85) return "bg-emerald-100 text-emerald-700";
  if (score >= 70) return "bg-amber-100 text-amber-700";
  return "bg-red-100 text-red-700";
}

function formatDollars(n: number): string {
  return `$${n.toLocaleString()}`;
}

/**
 * Build a coaching note that references the what-worked / what-didn't patterns
 * for calls that don't have a full transcript.
 */
function buildPatternCoachingNote(
  repName: string,
  leadName: string,
  quote: string,
  outcome: string,
  category: { name: string; whatWorked: string[]; whatDidntWork: string[]; recoveryRate: number }
): string {
  const firstName = repName.split(" ")[0];
  if (outcome === "recovered") {
    return `${firstName} successfully overcame this ${category.name.toLowerCase()} objection when ${leadName} said "${quote.slice(0, 50)}..." This approach aligns with patterns that work: top reps ${category.whatWorked[0]?.toLowerCase().slice(0, 80) ?? "use specific tactics to keep the deal alive"}.`;
  }
  return `${firstName} didn't effectively handle the ${category.name.toLowerCase()} objection when ${leadName} said "${quote.slice(0, 50)}..." Across ${Math.round(category.recoveryRate * 100)}% of recoverable calls, successful reps use tactics like: "${category.whatWorked[0]}" Instead, this response fell into a pattern with low success rates.`;
}

export default function CallDetailScreen({
  callId,
  objection,
  onBack,
}: CallDetailScreenProps) {
  const call = OBJECTION_CALLS.find((c) => c.id === callId);
  const category = OBJECTION_CATEGORIES.find((o) => o.id === objection);
  if (!call) return null;

  const transcript = getTranscriptForCall(callId);

  return (
    <div className="p-3">
      {/* Call header */}
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
          <p className="text-[10px] text-slate-500 font-heading font-semibold">
            {call.repName} &rarr; {call.leadName} &middot;{" "}
            {transcript ? transcript.duration : "---"} &middot;{" "}
            <span className="font-mono text-red-500">
              {formatDollars(call.revenueAtStake)}
            </span>
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`text-[10px] rounded px-1.5 py-0.5 font-medium ${outcomeBadge[call.outcome]}`}
            >
              {call.outcome}
            </span>
            <span
              className={`text-[10px] rounded px-1.5 py-0.5 font-medium ${scoreBadge(call.checkpointScore)}`}
            >
              QC: {call.checkpointScore}%
            </span>
            <span className="text-[10px] bg-slate-100 text-slate-500 rounded px-1.5 py-0.5">
              {call.serviceType}
            </span>
          </div>
        </div>
      </div>

      {/* Transcript */}
      {transcript ? (
        <div className="max-h-[200px] overflow-y-auto space-y-1 pr-1">
          {transcript.exchanges.map((exchange, i) => (
            <div
              key={i}
              className={`flex items-start gap-1.5 text-[11px] leading-snug ${
                exchange.isObjectionMoment
                  ? "bg-red-50 -mx-1 px-1 py-0.5 rounded border-l-2 border-red-400"
                  : ""
              }`}
            >
              {/* Objection moment marker */}
              {exchange.isObjectionMoment ? (
                <span className="text-red-500 flex-shrink-0 mt-0.5 w-3 text-center text-[9px]">
                  &#9888;
                </span>
              ) : (
                <span className="w-3 flex-shrink-0" />
              )}
              <span className="font-medium text-slate-500 w-12 flex-shrink-0">
                {exchange.speakerName}:
              </span>
              <span
                className={
                  exchange.isObjectionMoment
                    ? "text-red-600/80 font-medium"
                    : "text-slate-600"
                }
              >
                {exchange.text}
              </span>
            </div>
          ))}
        </div>
      ) : (
        /* Simplified preview for calls without full transcripts */
        <div className="max-h-[200px] overflow-y-auto">
          <div className="bg-slate-50 rounded-lg p-3">
            <p className="text-[10px] text-slate-400 mb-1 font-heading font-semibold">
              Key Moment
            </p>
            <p className="text-[11px] text-slate-600 leading-relaxed italic">
              &ldquo;{call.quote}&rdquo;
            </p>
            <p className="text-[10px] text-slate-400 mt-2">
              &mdash; {call.leadName}, {call.serviceType} call via{" "}
              {call.leadSource}
            </p>
          </div>
        </div>
      )}

      {/* Coaching note */}
      <div className="rounded-lg border-l-3 border-primary bg-primary/5 p-3 mt-3">
        <div className="flex items-center gap-1.5 mb-1.5">
          <div className="w-4 h-4 rounded bg-primary flex items-center justify-center">
            <span className="text-white text-[8px] font-bold">P</span>
          </div>
          <span className="text-[10px] font-heading font-semibold text-slate-700">
            Plaibook Coach
          </span>
          {category && (
            <span className="text-[9px] bg-red-100 text-red-600 rounded px-1.5 py-0.5 ml-auto">
              {category.name}
            </span>
          )}
        </div>
        <p className="text-[11px] text-slate-700 leading-relaxed">
          {transcript
            ? transcript.coachingNote.summary
            : category
              ? buildPatternCoachingNote(
                  call.repName,
                  call.leadName,
                  call.quote,
                  call.outcome,
                  category
                )
              : `${call.repName.split(" ")[0]} didn't effectively handle the objection when ${call.leadName} said "${call.quote.slice(0, 60)}..." The call ended without a close attempt or follow-up commitment.`}
        </p>
        {/* Suggested response */}
        {transcript && (
          <div className="mt-2 bg-white/70 rounded p-2">
            <p className="text-[9px] text-slate-500 font-heading font-semibold mb-0.5">
              Try instead:
            </p>
            <p className="text-[11px] text-slate-600 leading-relaxed italic">
              &ldquo;{transcript.coachingNote.suggestedResponse}&rdquo;
            </p>
          </div>
        )}
        {!transcript && category && (
          <div className="mt-2 bg-white/70 rounded p-2">
            <p className="text-[9px] text-slate-500 font-heading font-semibold mb-0.5">
              What top reps do instead:
            </p>
            <p className="text-[11px] text-slate-600 leading-relaxed italic">
              &ldquo;{category.whatWorked[0]}&rdquo;
            </p>
          </div>
        )}
      </div>

      {/* Outcome tag */}
      <div className="mt-2 text-[10px] text-slate-500 bg-slate-50 rounded px-2 py-1">
        {transcript
          ? transcript.outcomeTag
          : call.outcome === "recovered"
            ? `Lead recovered - appointment booked after follow-up`
            : call.outcome === "stalled"
              ? `Lead stalled - enrolled in SMS recovery campaign`
              : `Deal lost - ${category?.name ?? "objection"} not addressed`}
      </div>
    </div>
  );
}
