"use client";

import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer } from "recharts";
import BrowserFrame from "@/components/ui/BrowserFrame";
import { DEMO_LEAD_SOURCES } from "./data/demo-lead-sources";

const sorted = [...DEMO_LEAD_SOURCES].sort((a, b) => b.revenue - a.revenue);

export default function LeadSourceAttribution({ className = "" }: { className?: string }) {
  return (
    <BrowserFrame className={className}>
      <div className="bg-slate-50 p-3">
        <p className="text-xs font-heading font-semibold text-slate-700 mb-2">Revenue by Channel</p>
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={sorted} layout="vertical" margin={{ top: 0, right: 4, bottom: 0, left: 0 }}>
            <XAxis type="number" tick={{ fontSize: 9, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} />
            <YAxis type="category" dataKey="channel" tick={{ fontSize: 9, fill: "#64748b" }} axisLine={false} tickLine={false} width={70} />
            <Bar dataKey="revenue" radius={[0, 3, 3, 0]} barSize={14}>
              {sorted.map((s) => (
                <Cell key={s.channel} fill={s.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Table */}
        <div className="mt-3 rounded-lg bg-white ring-1 ring-slate-900/10 overflow-hidden">
          <table className="w-full text-[10px]">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500">
                <th className="text-left font-medium px-2 py-1.5">Channel</th>
                <th className="text-right font-medium px-2 py-1.5">Leads</th>
                <th className="text-left font-medium px-2 py-1.5 w-20">Close Rate</th>
                <th className="text-right font-medium px-2 py-1.5">Revenue</th>
                <th className="text-right font-medium px-2 py-1.5">Rev/Lead</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((src) => (
                <tr key={src.channel} className="border-b border-slate-50">
                  <td className="px-2 py-1 font-medium text-slate-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: src.color }} />
                    {src.channel}
                  </td>
                  <td className="px-2 py-1 text-right font-mono tabular-nums text-slate-600">{src.leads}</td>
                  <td className="px-2 py-1">
                    <div className="flex items-center gap-1">
                      <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${src.closeRate * 100}%` }}
                        />
                      </div>
                      <span className="font-mono tabular-nums text-slate-500 w-7 text-right">
                        {Math.round(src.closeRate * 100)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-2 py-1 text-right font-mono tabular-nums text-slate-700 font-medium">
                    ${src.revenue.toLocaleString()}
                  </td>
                  <td className="px-2 py-1 text-right font-mono tabular-nums text-slate-500">
                    ${src.revenuePerLead}
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
