"use client";

import BrowserFrame from "@/components/ui/BrowserFrame";
import { DEMO_OBJECTIONS } from "./data/demo-objections";

const sorted = [...DEMO_OBJECTIONS].sort((a, b) => b.frequency - a.frequency);

function rateColor(rate: number) {
  if (rate > 60) return "bg-emerald-500";
  if (rate >= 40) return "bg-amber-400";
  return "bg-red-400";
}

export default function ObjectionClustering({ className = "" }: { className?: string }) {
  const maxFreq = Math.max(...sorted.map((o) => o.frequency));

  return (
    <BrowserFrame className={className}>
      <div className="bg-slate-50 p-3">
        <p className="text-xs font-heading font-semibold text-slate-700 mb-2">Deal-Killing Objections</p>
        <div className="space-y-1.5">
          {sorted.map((obj) => (
            <div key={obj.name} className="rounded-lg bg-white ring-1 ring-slate-900/10 px-3 py-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-slate-800">{obj.name}</span>
                <span className="text-[10px] font-mono tabular-nums text-slate-500">
                  {obj.frequency} occurrences
                </span>
              </div>
              <div className="flex items-center gap-3 text-[10px]">
                {/* Overcome rate bar */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-slate-500">Overcome rate</span>
                    <span className="font-mono tabular-nums text-slate-600">{obj.overcomeRate}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${rateColor(obj.overcomeRate)}`}
                      style={{ width: `${obj.overcomeRate}%` }}
                    />
                  </div>
                </div>
                {/* Stats */}
                <div className="flex gap-3 flex-shrink-0">
                  <div className="text-center">
                    <p className="font-mono tabular-nums text-slate-700 font-medium">{obj.dealsBlocked}</p>
                    <p className="text-slate-400">blocked</p>
                  </div>
                  <div className="text-center">
                    <p className="font-mono tabular-nums text-red-600 font-medium">
                      ${(obj.lostRevenue / 1000).toFixed(1)}k
                    </p>
                    <p className="text-slate-400">lost</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}
