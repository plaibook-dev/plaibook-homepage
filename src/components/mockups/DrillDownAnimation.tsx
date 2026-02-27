"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer } from "recharts";
import BrowserFrame from "@/components/ui/BrowserFrame";

const SCENE_LABELS = ["Dashboard", "Call List", "Transcript", "Coaching"];
const SCENE_DURATION = 3500;

const agentData = [
  { name: "Marcus R.", closeRate: 38 },
  { name: "Sarah C.", closeRate: 34 },
  { name: "Jake M.", closeRate: 29 },
  { name: "Priya P.", closeRate: 41 },
  { name: "Tyler B.", closeRate: 26 },
  { name: "Amanda R.", closeRate: 33 },
];

const highlightAgent = 1; // Sarah C.

const callRows = [
  { lead: "Jennifer Walsh", source: "Referral", duration: "5:42", outcome: "qualified", score: 88 },
  { lead: "Tom Bradley", source: "Google Ads", duration: "4:38", outcome: "qualified", score: 82 },
  { lead: "Lisa Chen", source: "Direct Mail", duration: "3:18", outcome: "qualified", score: 68 },
  { lead: "Amy Davis", source: "Meta Ads", duration: "6:14", outcome: "sold", score: 91 },
  { lead: "Mark Russell", source: "Organic", duration: "4:02", outcome: "sold", score: 86 },
];

const highlightCall = 2; // Lisa Chen

const transcriptLines = [
  { speaker: "Sarah", text: "Hi Lisa, thanks for calling Pest Control.", check: true },
  { speaker: "Lisa", text: "Hi, yeah I found you guys online. We're seeing roaches in the kitchen." },
  { speaker: "Sarah", text: "I'm sorry to hear that. How long has that been going on?", check: true },
  { speaker: "Lisa", text: "Maybe two weeks? It's getting worse." },
  { speaker: "Sarah", text: "Got it. For roaches, our quarterly plan is the best fit. It covers full interior and perimeter treatment.", check: true },
  { speaker: "Lisa", text: "What does that run?" },
  { speaker: "Sarah", text: "It's $189 for the initial visit, then $149 per quarter after that.", check: true },
  { speaker: "Lisa", text: "Hmm, your price is a little higher than I expected..." },
  { speaker: "Sarah", text: "I understand. Let me tell you about our coverage — we also treat the attic and crawlspace...", check: false },
  { speaker: "Lisa", text: "Ok let me think about it. Can you send me some info?" },
];

const outcomeBadge: Record<string, string> = {
  sold: "bg-emerald-100 text-emerald-700",
  qualified: "bg-amber-100 text-amber-700",
};

const sceneVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

function DashboardScene() {
  return (
    <div className="p-3">
      <p className="text-[10px] text-slate-500 mb-2 font-heading font-semibold">Close Rate by Agent</p>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={agentData} layout="horizontal" margin={{ top: 0, right: 4, bottom: 0, left: 4 }}>
          <XAxis dataKey="name" tick={{ fontSize: 9, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 9, fill: "#94a3b8" }} axisLine={false} tickLine={false} domain={[0, 50]} />
          <Bar dataKey="closeRate" radius={[3, 3, 0, 0]}>
            {agentData.map((_, i) => (
              <Cell
                key={i}
                fill={i === highlightAgent ? "#6AA89A" : "#cbd5e1"}
                className={i === highlightAgent ? "animate-pulse" : ""}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex items-center gap-1 mt-1 justify-center">
        <svg className="w-3 h-3 text-primary" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.5 2c0 .444-.092.876-.258 1.276A5.5 5.5 0 0118 8.5a.5.5 0 01-1 0 4.5 4.5 0 00-3.898-4.46A4.5 4.5 0 0113.5 2z" />
          <path d="M5.032 9.875a.5.5 0 01.354.612 7 7 0 008.127 8.127.5.5 0 01.258.966 8 8 0 01-9.351-9.351.5.5 0 01.612-.354z" />
        </svg>
        <span className="text-[10px] text-primary font-medium">Click to drill into Sarah C.&apos;s calls</span>
      </div>
    </div>
  );
}

function CallListScene() {
  return (
    <div className="p-3">
      <p className="text-[10px] text-slate-500 mb-2 font-heading font-semibold">
        Sarah Chen &mdash; Recent Calls
      </p>
      <div className="space-y-0">
        {callRows.map((row, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 text-xs px-2 py-1.5 rounded ${
              i === highlightCall ? "bg-primary/10 ring-1 ring-primary/30" : ""
            }`}
          >
            <span className="text-slate-700 font-medium w-24 truncate">{row.lead}</span>
            <span className="text-[10px] bg-slate-100 text-slate-500 rounded px-1 py-0.5">{row.source}</span>
            <span className="font-mono tabular-nums text-slate-500 ml-auto">{row.duration}</span>
            <span className={`text-[10px] rounded px-1.5 py-0.5 font-medium ${outcomeBadge[row.outcome]}`}>
              {row.outcome}
            </span>
            <span className="font-mono tabular-nums text-slate-400 text-[10px] w-6 text-right">{row.score}%</span>
          </div>
        ))}
      </div>
      {highlightCall !== undefined && (
        <div className="flex items-center gap-1 mt-2 justify-center">
          <svg className="w-3 h-3 text-primary" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.5 2c0 .444-.092.876-.258 1.276A5.5 5.5 0 0118 8.5a.5.5 0 01-1 0 4.5 4.5 0 00-3.898-4.46A4.5 4.5 0 0113.5 2z" />
            <path d="M5.032 9.875a.5.5 0 01.354.612 7 7 0 008.127 8.127.5.5 0 01.258.966 8 8 0 01-9.351-9.351.5.5 0 01.612-.354z" />
          </svg>
          <span className="text-[10px] text-primary font-medium">View transcript for Lisa Chen call</span>
        </div>
      )}
    </div>
  );
}

function TranscriptScene() {
  return (
    <div className="p-3">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[10px] text-slate-500 font-heading font-semibold">
          Sarah Chen &rarr; Lisa Chen &middot; 3:18
        </p>
        <span className="text-[10px] bg-amber-100 text-amber-700 rounded px-1.5 py-0.5 font-medium">Score: 68%</span>
      </div>
      <div className="space-y-1 max-h-[155px] overflow-hidden">
        {transcriptLines.map((line, i) => (
          <div key={i} className="flex items-start gap-1.5 text-[11px] leading-snug">
            {line.check !== undefined ? (
              line.check ? (
                <span className="text-emerald-500 flex-shrink-0 mt-0.5">&#10003;</span>
              ) : (
                <span className="text-red-500 flex-shrink-0 mt-0.5">&#10007;</span>
              )
            ) : (
              <span className="w-3 flex-shrink-0" />
            )}
            <span className="font-medium text-slate-500 flex-shrink-0 w-10">{line.speaker}:</span>
            <span className={line.check === false ? "text-red-600/80" : "text-slate-600"}>{line.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CoachingScene() {
  return (
    <div className="p-3">
      <div className="rounded-lg border-l-3 border-primary bg-primary/5 p-3">
        <div className="flex items-center gap-1.5 mb-1.5">
          <div className="w-4 h-4 rounded bg-primary flex items-center justify-center">
            <span className="text-white text-[8px] font-bold">P</span>
          </div>
          <span className="text-[10px] font-heading font-semibold text-slate-700">Plaibook Coach</span>
        </div>
        <p className="text-[11px] text-slate-700 leading-relaxed">
          Sarah missed the urgency close on this termite lead. She identified the problem but didn&apos;t create urgency
          around the free inspection offer.
        </p>
        <p className="text-[11px] text-slate-600 leading-relaxed mt-2">
          When Lisa said <em>&ldquo;your price is a little higher than expected,&rdquo;</em> Sarah moved on to features
          instead of addressing the price directly. Try: <em>&ldquo;I hear you, let me show you why our customers feel
          it&apos;s worth it&rdquo;</em> &mdash; then walk through the coverage difference.
        </p>
        <p className="text-[10px] text-slate-400 mt-2 font-mono">
          Based on checkpoint: Objection Handling (scored 68%)
        </p>
      </div>
    </div>
  );
}

const scenes = [DashboardScene, CallListScene, TranscriptScene, CoachingScene];

export default function DrillDownAnimation({ className = "" }: { className?: string }) {
  const [scene, setScene] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setScene((s) => (s + 1) % 4), SCENE_DURATION);
    return () => clearInterval(id);
  }, []);

  const Scene = scenes[scene];

  return (
    <BrowserFrame className={className}>
      <div className="bg-slate-50 min-h-[280px] flex flex-col">
        {/* Scene content */}
        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={scene}
              variants={sceneVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <Scene />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-1.5 px-3 pb-2 justify-center">
          {SCENE_LABELS.map((label, i) => (
            <button
              key={label}
              onClick={() => setScene(i)}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] transition-colors ${
                i === scene
                  ? "bg-primary/15 text-primary font-semibold"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  i === scene ? "bg-primary" : "bg-slate-300"
                }`}
              />
              {label}
            </button>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}
