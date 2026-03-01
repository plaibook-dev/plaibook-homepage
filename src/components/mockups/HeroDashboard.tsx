"use client";

import BrowserFrame from "@/components/ui/BrowserFrame";
import MockupKPICard from "./MockupKPICard";
import { DEMO_AGENTS } from "./data/demo-agents";

const PhoneIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const TargetIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);

const DollarIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

function rateBarColor(rate: number, thresholds: [number, number]) {
  if (rate >= thresholds[1]) return "bg-emerald-500";
  if (rate >= thresholds[0]) return "bg-amber-400";
  return "bg-red-400";
}

export default function HeroDashboard({ className = "" }: { className?: string }) {
  const sorted = [...DEMO_AGENTS].sort((a, b) => b.revenue - a.revenue);

  return (
    <BrowserFrame className={className}>
      <div className="bg-slate-50 p-3">
        {/* KPI row */}
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-2 mb-3">
          <MockupKPICard icon={<PhoneIcon />} label="Sales Calls" value="786" subtitle="This month" />
          <MockupKPICard icon={<CheckIcon />} label="Qualified Rate" value="67.2%" subtitle="+4.1% vs last" />
          <MockupKPICard icon={<TargetIcon />} label="Close Rate" value="31.4%" subtitle="+2.8% vs last" />
          <MockupKPICard icon={<DollarIcon />} label="Revenue" value="$142,800" subtitle="Feb 2026" />
          <MockupKPICard icon={<ClockIcon />} label="Avg Duration" value="5m 42s" subtitle="Talk time" />
        </div>

        {/* Agent performance table */}
        <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-900/10 overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500">
                <th className="text-left font-medium px-3 py-2">Agent</th>
                <th className="text-right font-medium px-3 py-2">Calls</th>
                <th className="text-left font-medium px-3 py-2 w-28">Close Rate</th>
                <th className="text-left font-medium px-3 py-2 w-28">Checkpoint</th>
                <th className="text-right font-medium px-3 py-2">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((agent) => (
                <tr key={agent.name} className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="px-3 py-1.5 font-medium text-slate-800">{agent.name}</td>
                  <td className="px-3 py-1.5 text-right font-mono tabular-nums text-slate-600">
                    {agent.totalCalls}
                  </td>
                  <td className="px-3 py-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${rateBarColor(agent.closeRate, [0.25, 0.35])}`}
                          style={{ width: `${agent.closeRate * 100}%` }}
                        />
                      </div>
                      <span className="font-mono tabular-nums text-slate-600 w-8 text-right">
                        {Math.round(agent.closeRate * 100)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${rateBarColor(agent.checkpointScore, [0.70, 0.85])}`}
                          style={{ width: `${agent.checkpointScore * 100}%` }}
                        />
                      </div>
                      <span className="font-mono tabular-nums text-slate-600 w-8 text-right">
                        {Math.round(agent.checkpointScore * 100)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-1.5 text-right font-mono tabular-nums text-slate-800 font-medium">
                    ${agent.revenue.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </BrowserFrame>
  );
}
