"use client";

import BrowserFrame from "@/components/ui/BrowserFrame";

interface RecRow {
  agent: string;
  callOutcome: string;
  crmRecord: string;
  status: "match" | "mismatch" | "gap";
}

const rows: RecRow[] = [
  { agent: "Marcus R.", callOutcome: "Sold Plan", crmRecord: "Subscription created 2/26", status: "match" },
  { agent: "Sarah C.", callOutcome: "Sold Plan", crmRecord: "No record found", status: "mismatch" },
  { agent: "Jake M.", callOutcome: "Booked Inspection", crmRecord: "Appointment 2/28", status: "match" },
  { agent: "Priya P.", callOutcome: "Sold Plan", crmRecord: "Subscription created 2/26", status: "match" },
  { agent: "Tyler B.", callOutcome: "Qualified - Follow Up", crmRecord: "No activity logged", status: "gap" },
  { agent: "Amanda R.", callOutcome: "Sold Plan", crmRecord: "Service completed 2/25", status: "match" },
];

const statusConfig = {
  match: { label: "\u2713 Match", className: "bg-emerald-100 text-emerald-700" },
  mismatch: { label: "\u2717 Mismatch", className: "bg-red-100 text-red-700" },
  gap: { label: "\u26A0 Gap", className: "bg-amber-100 text-amber-700" },
};

export default function FSMReconciliation({ className = "" }: { className?: string }) {
  return (
    <BrowserFrame className={className}>
      <div className="bg-slate-50 p-3">
        <p className="text-xs font-heading font-semibold text-slate-700 mb-2">CRM Reconciliation</p>
        <div className="rounded-lg bg-white ring-1 ring-slate-900/10 overflow-hidden">
          <table className="w-full text-[10px]">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500">
                <th className="text-left font-medium px-2.5 py-1.5">Agent</th>
                <th className="text-left font-medium px-2.5 py-1.5">Call Outcome</th>
                <th className="text-left font-medium px-2.5 py-1.5">FieldRoutes Record</th>
                <th className="text-left font-medium px-2.5 py-1.5">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const s = statusConfig[row.status];
                return (
                  <tr key={row.agent} className="border-b border-slate-50">
                    <td className="px-2.5 py-1.5 font-medium text-slate-700">{row.agent}</td>
                    <td className="px-2.5 py-1.5 text-slate-600">{row.callOutcome}</td>
                    <td className="px-2.5 py-1.5 text-slate-600">{row.crmRecord}</td>
                    <td className="px-2.5 py-1.5">
                      <span className={`inline-block rounded px-1.5 py-0.5 font-medium ${s.className}`}>
                        {s.label}
                      </span>
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
