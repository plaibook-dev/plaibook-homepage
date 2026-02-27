"use client";

import BrowserFrame from "@/components/ui/BrowserFrame";
import { DEMO_CHECKPOINT_DATA, CHECKPOINT_STEPS } from "./data/demo-checkpoints";

function cellColor(score: number) {
  if (score >= 90) return "bg-emerald-500 text-white";
  if (score >= 75) return "bg-emerald-400 text-white";
  if (score >= 60) return "bg-amber-400 text-white";
  return "bg-red-400 text-white";
}

const SHORT_LABELS: Record<string, string> = {
  Greeting: "Greet",
  "Needs Assessment": "Needs",
  "Service Recommendation": "Rec",
  "Price Presentation": "Price",
  "Objection Handling": "Object",
  "Urgency / Close Attempt": "Close",
  "Booking Attempt": "Book",
};

export default function QCScorecard({ className = "" }: { className?: string }) {
  return (
    <BrowserFrame className={className}>
      <div className="bg-slate-50 p-3">
        <p className="text-xs font-heading font-semibold text-slate-700 mb-2">QC Checkpoint Scorecard</p>
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead>
              <tr>
                <th className="text-left font-medium text-slate-500 px-1.5 py-1 sticky left-0 bg-slate-50">Rep</th>
                {CHECKPOINT_STEPS.map((step) => (
                  <th key={step} className="text-center font-medium text-slate-500 px-1 py-1 w-12">
                    <span className="block leading-tight">{SHORT_LABELS[step]}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DEMO_CHECKPOINT_DATA.map((rep) => (
                <tr key={rep.name} className="border-t border-slate-100">
                  <td className="font-medium text-slate-700 px-1.5 py-1 sticky left-0 bg-slate-50 whitespace-nowrap">
                    {rep.name}
                  </td>
                  {CHECKPOINT_STEPS.map((step) => {
                    const score = rep.scores[step];
                    return (
                      <td key={step} className="px-0.5 py-0.5 text-center">
                        <span
                          className={`inline-block w-full rounded px-1 py-0.5 font-mono tabular-nums font-medium ${cellColor(score)}`}
                        >
                          {score}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </BrowserFrame>
  );
}
