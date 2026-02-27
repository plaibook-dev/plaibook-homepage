"use client";

import { DEMO_CALLS } from "@/components/mockups/data/demo-calls";
import {
  TRANSCRIPT_COACHING,
  TRANSCRIPT_EXEMPLARY,
  type DemoTranscript,
} from "@/components/mockups/data/demo-transcript";

interface CallDetailScreenProps {
  callId: string;
  agentName: string;
  onBack: () => void;
}

const outcomeBadge: Record<string, string> = {
  sold: "bg-emerald-100 text-emerald-700",
  qualified: "bg-amber-100 text-amber-700",
  unqualified: "bg-slate-100 text-slate-500",
  abandoned: "bg-red-100 text-red-700",
};

function scoreBadge(score: number): string {
  if (score >= 90) return "bg-emerald-100 text-emerald-700";
  if (score >= 75) return "bg-amber-100 text-amber-700";
  return "bg-red-100 text-red-700";
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function CallDetailScreen({
  callId,
  agentName,
  onBack,
}: CallDetailScreenProps) {
  const call = DEMO_CALLS.find((c) => c.id === callId);
  if (!call) return null;

  // Determine which transcript to use
  let transcript: DemoTranscript | null = null;
  if (callId === "c-005") transcript = TRANSCRIPT_COACHING;
  else if (callId === "c-001") transcript = TRANSCRIPT_EXEMPLARY;

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
            {agentName} &rarr; {call.leadName} &middot;{" "}
            {formatDuration(call.duration)}
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
          </div>
        </div>
      </div>

      {/* Transcript */}
      {transcript ? (
        <div className="max-h-[200px] overflow-y-auto space-y-1 pr-1">
          {transcript.exchanges.map((exchange, i) => (
            <div
              key={i}
              className="flex items-start gap-1.5 text-[11px] leading-snug"
            >
              {/* Checkpoint marker */}
              {exchange.checkpoint ? (
                exchange.checkpoint.hit ? (
                  <span className="text-emerald-500 flex-shrink-0 mt-0.5 w-3 text-center">
                    &#10003;
                  </span>
                ) : (
                  <span className="text-red-500 flex-shrink-0 mt-0.5 w-3 text-center">
                    &#10007;
                  </span>
                )
              ) : (
                <span className="w-3 flex-shrink-0" />
              )}
              <span className="font-medium text-slate-500 w-12 flex-shrink-0">
                {exchange.speakerName}:
              </span>
              <span
                className={
                  exchange.checkpoint?.hit === false
                    ? "text-red-600/80"
                    : "text-slate-600"
                }
              >
                {exchange.text}
              </span>
            </div>
          ))}
        </div>
      ) : (
        /* Simplified transcript preview for calls without full transcripts */
        <div className="max-h-[200px] overflow-y-auto">
          <div className="bg-slate-50 rounded-lg p-3">
            <p className="text-[10px] text-slate-400 mb-1 font-heading font-semibold">
              Transcript Preview
            </p>
            <p className="text-[11px] text-slate-600 leading-relaxed italic">
              &ldquo;{call.transcriptPreview}&rdquo;
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
        </div>
        <p className="text-[11px] text-slate-700 leading-relaxed">
          {transcript
            ? transcript.coachingNote.summary
            : call.checkpointScore >= 85
              ? `Strong performance on this call. ${agentName.split(" ")[0]} hit the key checkpoints and maintained good flow through the conversation.`
              : `${agentName.split(" ")[0]} should focus on building urgency and handling objections more directly. The call lost momentum after the price discussion.`}
        </p>
        <p className="text-[10px] text-slate-400 mt-2 font-mono">
          Based on checkpoint:{" "}
          {transcript ? transcript.coachingNote.checkpoint : "Overall"} (scored{" "}
          {transcript ? transcript.coachingNote.score : call.checkpointScore}%)
        </p>
      </div>

      {/* Outcome tag */}
      <div className="mt-2 text-[10px] text-slate-500 bg-slate-50 rounded px-2 py-1">
        {transcript
          ? transcript.outcomeTag
          : call.outcome === "sold"
            ? `Closed - appointment booked`
            : call.outcome === "qualified"
              ? `Lead qualified - enrolled in SMS follow-up`
              : call.outcome === "unqualified"
                ? `Lead did not meet qualification criteria`
                : `Call abandoned - enrolled in SMS recovery`}
      </div>
    </div>
  );
}
