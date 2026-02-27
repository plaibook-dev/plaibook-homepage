"use client";

import BrowserFrame from "@/components/ui/BrowserFrame";
import { DEMO_AGENTS } from "./data/demo-agents";

const sorted = [...DEMO_AGENTS].sort((a, b) => b.revenue - a.revenue);

const rankAccent: Record<number, string> = {
  0: "#F59E0B", // gold
  1: "#94A3B8", // silver
  2: "#D97706", // bronze
};

const TrophyIcon = () => (
  <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v1a2 2 0 002 2h1v1a4 4 0 003 3.87V15H7a1 1 0 100 2h6a1 1 0 100-2h-2v-2.13A4 4 0 0014 9V8h1a2 2 0 002-2V5a2 2 0 00-2-2h-1V2a1 1 0 10-2 0v1H8V2a1 1 0 00-2 0v1H5zm0 2h1v3H5V5zm10 0h-1v3h1V5z" clipRule="evenodd" />
  </svg>
);

export default function Leaderboard({ className = "" }: { className?: string }) {
  return (
    <BrowserFrame className={className}>
      <div className="bg-slate-50 p-3">
        <div className="flex items-center gap-2 mb-2">
          <TrophyIcon />
          <p className="text-xs font-heading font-semibold text-slate-700">February Revenue Challenge</p>
        </div>
        <div className="rounded-lg bg-white ring-1 ring-slate-900/10 overflow-hidden">
          <table className="w-full text-[10px]">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500">
                <th className="text-center font-medium px-2 py-1.5 w-8">#</th>
                <th className="text-left font-medium px-2 py-1.5">Agent</th>
                <th className="text-right font-medium px-2 py-1.5">Revenue</th>
                <th className="text-right font-medium px-2 py-1.5">Deals</th>
                <th className="text-right font-medium px-2 py-1.5">Close Rate</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((agent, i) => {
                const deals = Math.round(agent.totalCalls * agent.closeRate);
                return (
                  <tr key={agent.name} className={`border-b border-slate-50 ${i < 3 ? "bg-slate-50/50" : ""}`}>
                    <td className="text-center py-1.5 px-2">
                      <span
                        className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold"
                        style={
                          rankAccent[i]
                            ? { backgroundColor: rankAccent[i] + "20", color: rankAccent[i] }
                            : undefined
                        }
                      >
                        {i + 1}
                      </span>
                    </td>
                    <td className="px-2 py-1.5 font-medium text-slate-800">{agent.name}</td>
                    <td className="px-2 py-1.5 text-right font-mono tabular-nums text-slate-800 font-medium">
                      ${agent.revenue.toLocaleString()}
                    </td>
                    <td className="px-2 py-1.5 text-right font-mono tabular-nums text-slate-600">{deals}</td>
                    <td className="px-2 py-1.5 text-right font-mono tabular-nums text-slate-600">
                      {Math.round(agent.closeRate * 100)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </BrowserFrame>
  );
}
