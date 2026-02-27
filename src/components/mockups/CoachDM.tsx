"use client";

export default function CoachDM({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-xl bg-white shadow-sm ring-1 ring-slate-900/10 border-l-4 border-primary overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="px-4 pt-3 pb-2 flex items-center gap-2">
        <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xs font-bold font-heading">P</span>
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs font-heading font-semibold text-slate-800">Plaibook Coach</span>
        </div>
        <span className="text-[10px] text-slate-400 font-mono tabular-nums flex-shrink-0">2:52 PM</span>
      </div>

      {/* Body */}
      <div className="px-4 pb-3 space-y-2">
        <p className="text-xs text-slate-600 leading-relaxed">
          Hey Sarah, re: your call with Lisa Chen at 2:47 PM&hellip;
        </p>
        <p className="text-xs text-slate-700 leading-relaxed">
          You did a great job identifying the roach issue and recommending the quarterly plan. One thing to work on:
          when she said <em>&ldquo;your price is a little higher than expected,&rdquo;</em> you moved on to features
          instead of addressing the price directly. Try acknowledging the concern first &mdash;{" "}
          <em>&ldquo;I hear you, let me show you why our customers feel it&apos;s worth it&rdquo;</em> &mdash; then
          walk through the coverage difference.
        </p>
      </div>

      {/* Footer */}
      <div className="px-4 py-2 bg-slate-50 border-t border-slate-100">
        <p className="text-[10px] text-slate-400 font-mono">
          Based on checkpoint: Objection Handling (scored 68%)
        </p>
      </div>
    </div>
  );
}
