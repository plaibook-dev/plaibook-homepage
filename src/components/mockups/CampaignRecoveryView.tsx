"use client";

import BrowserFrame from "@/components/ui/BrowserFrame";
import { DEMO_RECOVERY_LEADS } from "@/components/mockups/data/demo-recovery";

const statusBadge: Record<string, { className: string; label: string }> = {
  "in-conversation": {
    className: "bg-blue-100 text-blue-700",
    label: "Active",
  },
  "re-engaged": {
    className: "bg-amber-100 text-amber-700",
    label: "Re-engaged",
  },
  closed: {
    className: "bg-emerald-100 text-emerald-700",
    label: "Closed",
  },
  "no-response": {
    className: "bg-slate-100 text-slate-500",
    label: "No Response",
  },
};

const totalRecovered = DEMO_RECOVERY_LEADS.reduce(
  (sum, lead) => sum + (lead.revenue ?? 0),
  0
);
const pipelineCount = DEMO_RECOVERY_LEADS.length;

export default function CampaignRecoveryView({
  className = "",
}: {
  className?: string;
}) {
  return (
    <BrowserFrame className={className} url="app.plaibook.tech/sms-recovery">
      <div className="bg-slate-50 min-h-[300px]">
        {/* Header row */}
        <div className="flex items-center justify-between px-3 py-2.5 bg-white border-b border-slate-100">
          <h3 className="text-xs font-heading font-semibold text-slate-800">
            SMS Recovery Pipeline
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-slate-500">
              <span className="font-mono font-semibold text-slate-700">
                {pipelineCount}
              </span>{" "}
              leads in pipeline
            </span>
            <span className="text-[10px] text-slate-500">
              <span className="font-mono font-semibold text-primary">
                ${totalRecovered.toLocaleString()}
              </span>{" "}
              recovered
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="px-3 py-2">
          {/* Table header */}
          <div className="flex items-center gap-2 text-[9px] font-medium text-slate-400 uppercase tracking-wider px-2 py-1">
            <span className="w-28">Lead</span>
            <span className="w-24">Agent</span>
            <span className="w-40 hidden sm:block">Call Outcome</span>
            <span className="w-20">Status</span>
            <span className="w-8 text-center">Msgs</span>
            <span className="w-16 text-right">Revenue</span>
          </div>

          {/* Table rows */}
          <div className="space-y-0">
            {DEMO_RECOVERY_LEADS.map((lead, i) => {
              const badge = statusBadge[lead.smsStatus];
              return (
                <div
                  key={i}
                  className="flex items-center gap-2 text-xs px-2 py-2 rounded min-h-[44px] hover:bg-white transition-colors"
                >
                  <span className="text-slate-700 font-medium w-28 truncate">
                    {lead.leadName}
                  </span>
                  <span className="text-slate-500 w-24 truncate">
                    {lead.originalAgent}
                  </span>
                  <span className="text-slate-500 w-40 truncate hidden sm:block text-[11px]">
                    {lead.callOutcome}
                  </span>
                  <span className="w-20 flex-shrink-0">
                    <span
                      className={`text-[10px] rounded px-1.5 py-0.5 font-medium ${badge.className}`}
                    >
                      {badge.label}
                    </span>
                  </span>
                  <span className="font-mono tabular-nums text-slate-400 w-8 text-center text-[11px]">
                    {lead.messagesSent}
                  </span>
                  <span
                    className={`font-mono tabular-nums w-16 text-right text-[11px] ${
                      lead.revenue ? "text-emerald-600 font-medium" : "text-slate-300"
                    }`}
                  >
                    {lead.revenue ? `$${lead.revenue}` : "\u2014"}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Summary footer */}
          <div className="flex items-center justify-end gap-2 px-2 pt-2 mt-1 border-t border-slate-100">
            <span className="text-[10px] text-slate-500">
              Total Recovered:
            </span>
            <span className="text-sm font-mono font-semibold text-primary">
              ${totalRecovered.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}
