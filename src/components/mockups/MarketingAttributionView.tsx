"use client";

import BrowserFrame from "@/components/ui/BrowserFrame";
import {
  DEMO_ATTRIBUTION,
  FLAGGED_CAMPAIGN_LABEL,
  UNQUALIFIED_REASONS,
} from "@/components/mockups/data/demo-attribution";

function roasColor(roas: number | null): string {
  if (roas === null) return "text-emerald-600"; // organic — infinite ROAS
  if (roas >= 2) return "text-emerald-600";
  if (roas >= 1) return "text-amber-600";
  return "text-red-600";
}

function unqualifiedRateColor(rate: number): string {
  if (rate <= 10) return "text-slate-500";
  if (rate <= 20) return "text-amber-600";
  return "text-red-600";
}

export default function MarketingAttributionView({
  className = "",
}: {
  className?: string;
}) {
  return (
    <BrowserFrame className={className} url="app.plaibook.tech/attribution">
      <div className="bg-slate-50 min-h-[300px]">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2.5 bg-white border-b border-slate-100">
          <h3 className="text-xs font-heading font-semibold text-slate-800">
            Lead Source Performance
          </h3>
          <span className="text-[10px] text-slate-400 font-mono tabular-nums">
            Last 90 Days
          </span>
        </div>

        {/* Table */}
        <div className="px-3 py-2 overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead>
              <tr>
                <th className="text-left font-medium text-slate-500 px-1.5 py-1 sticky left-0 bg-slate-50">
                  Lead Source
                </th>
                <th className="text-right font-medium text-slate-500 px-1.5 py-1">
                  Leads
                </th>
                <th className="text-right font-medium text-slate-500 px-1.5 py-1">
                  Closed
                </th>
                <th className="text-right font-medium text-slate-500 px-1.5 py-1">
                  Revenue
                </th>
                <th className="text-right font-medium text-slate-500 px-1.5 py-1">
                  Unqual
                </th>
                <th className="text-right font-medium text-slate-500 px-1.5 py-1">
                  Unqual %
                </th>
                <th className="text-right font-medium text-slate-500 px-1.5 py-1">
                  Cost/Lead
                </th>
                <th className="text-right font-medium text-slate-500 px-1.5 py-1">
                  ROAS
                </th>
              </tr>
            </thead>
            <tbody>
              {DEMO_ATTRIBUTION.map((row) => {
                const unqualRate =
                  row.leads > 0
                    ? ((row.unqualified / row.leads) * 100).toFixed(1)
                    : "0.0";

                return (
                  <tr
                    key={row.source}
                    className={`border-t border-slate-100 ${
                      row.flagged
                        ? "bg-red-50/60 border-l-2 border-l-red-400"
                        : ""
                    }`}
                  >
                    <td className="font-medium text-slate-700 px-1.5 py-1.5 sticky left-0 bg-inherit whitespace-nowrap">
                      {row.source}
                    </td>
                    <td className="text-right font-mono tabular-nums text-slate-600 px-1.5 py-1.5">
                      {row.leads}
                    </td>
                    <td className="text-right font-mono tabular-nums text-slate-600 px-1.5 py-1.5">
                      {row.closed}
                    </td>
                    <td className="text-right font-mono tabular-nums text-slate-700 font-medium px-1.5 py-1.5">
                      ${row.revenue.toLocaleString()}
                    </td>
                    <td className="text-right font-mono tabular-nums text-slate-600 px-1.5 py-1.5">
                      {row.unqualified}
                    </td>
                    <td
                      className={`text-right font-mono tabular-nums font-medium px-1.5 py-1.5 ${unqualifiedRateColor(
                        parseFloat(unqualRate)
                      )}`}
                    >
                      {unqualRate}%
                    </td>
                    <td className="text-right font-mono tabular-nums text-slate-600 px-1.5 py-1.5">
                      {row.costPerLead === 0 ? "—" : `$${row.costPerLead}`}
                    </td>
                    <td
                      className={`text-right font-mono tabular-nums font-medium px-1.5 py-1.5 ${roasColor(
                        row.roas
                      )}`}
                    >
                      {row.roas === null ? "\u221E" : `${row.roas}x`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Unqualified Reasons breakdown */}
        <div className="mx-3 mb-3 mt-1 rounded-md border border-slate-200 bg-white p-2.5">
          <p className="text-[10px] font-medium text-slate-500 mb-1.5">
            Unqualified Breakdown:{" "}
            <span className="text-red-600 font-semibold">
              {FLAGGED_CAMPAIGN_LABEL}
            </span>
          </p>
          <div className="space-y-1">
            {UNQUALIFIED_REASONS.map((r) => (
              <div
                key={r.reason}
                className="flex items-center justify-between text-[10px]"
              >
                <span className="text-slate-600">{r.reason}</span>
                <span className="font-mono tabular-nums text-slate-700 font-medium ml-4">
                  {r.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}
