"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneFrame from "@/components/ui/PhoneFrame";
import { STORIES, type Story, type StorySMSMessage } from "./data/demo-stories";

// ─── Constants ───────────────────────────────────────────────────
const FRAME_DURATION = 5500;
const TOTAL_FRAMES = 3;

// ─── Helpers ─────────────────────────────────────────────────────
function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// ─── Animated number counter ─────────────────────────────────────
function AnimatedNumber({ value, prefix = "" }: { value: number; prefix?: string }) {
  const [displayed, setDisplayed] = useState(value);
  const prevRef = useRef(value);
  useEffect(() => {
    const from = prevRef.current;
    const to = value;
    if (from === to) return;
    prevRef.current = to;
    const duration = 800;
    const start = performance.now();
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(from + (to - from) * eased));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [value]);
  return <span className="font-mono tabular-nums">{prefix}{displayed.toLocaleString()}</span>;
}

// ─── Dark card wrapper ───────────────────────────────────────────
function DarkCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-slate-800/80 backdrop-blur-sm border border-white/[0.08] shadow-2xl shadow-black/20 overflow-hidden">
      {children}
    </div>
  );
}

// ─── Waveform SVG ────────────────────────────────────────────────
function Waveform({ storyId }: { storyId: string }) {
  const bars = 48;
  const seed = storyId.charCodeAt(storyId.length - 1);
  return (
    <motion.svg viewBox={`0 0 ${bars * 3} 32`} className="w-full h-8" preserveAspectRatio="none" initial="hidden" animate="visible">
      {Array.from({ length: bars }).map((_, i) => {
        const h = 4 + seededRandom(seed + i) * 24;
        const y = (32 - h) / 2;
        return (
          <motion.rect
            key={i}
            x={i * 3}
            y={y}
            width={1.8}
            rx={0.9}
            height={h}
            className="fill-primary"
            variants={{
              hidden: { scaleY: 0.1, opacity: 0.15 },
              visible: { scaleY: 1, opacity: 0.7, transition: { delay: i * 0.01, duration: 0.3 } },
            }}
            style={{ transformOrigin: `${i * 3 + 0.9}px 16px` }}
          />
        );
      })}
    </motion.svg>
  );
}

// ─── Frame 1: The Call ───────────────────────────────────────────
function CallFrame({ story }: { story: Story }) {
  return (
    <DarkCard>
      <div className="p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary">
              {story.repInitials}
            </div>
            <div>
              <p className="text-base font-heading font-semibold text-white">{story.repName}</p>
              <p className="text-sm text-slate-400">
                {story.leadName} &middot; {story.leadSource}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-mono tabular-nums text-slate-400">{formatDuration(story.callDuration)}</p>
            <p className="text-xs text-slate-500">{story.callTimestamp}</p>
          </div>
        </div>

        {/* Waveform player */}
        <div className="bg-slate-900/60 rounded-lg p-3.5 mb-4 border border-white/[0.04]">
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0 hover:bg-primary/30 transition-colors">
              <svg className="w-3.5 h-3.5 text-primary ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            <Waveform storyId={story.id} />
            <span className="text-xs font-mono text-slate-500 flex-shrink-0">{formatDuration(story.callDuration)}</span>
          </div>
        </div>

        {/* Checkpoints — bigger text, more breathing room */}
        <div className="bg-slate-900/40 rounded-lg border border-white/[0.04]">
          <div className="px-4 py-2.5 flex items-center justify-between border-b border-white/[0.04]">
            <p className="text-sm font-medium text-slate-400">Quality Checkpoints</p>
            <div className={`text-sm font-mono font-bold px-2.5 py-0.5 rounded-md ${
              story.checkpointScore >= 85
                ? "bg-emerald-500/15 text-emerald-400"
                : story.checkpointScore >= 70
                  ? "bg-amber-500/15 text-amber-400"
                  : "bg-red-500/15 text-red-400"
            }`}>
              {story.checkpointScore}%
            </div>
          </div>
          <div className="p-1.5">
            {story.checkpoints.map((cp, i) => (
              <motion.div
                key={cp.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.2 }}
                className={`flex items-center gap-2.5 px-3 py-[7px] rounded-md ${
                  !cp.passed ? "bg-red-500/[0.06]" : ""
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                  cp.passed ? "bg-emerald-500/15" : "bg-red-500/15"
                }`}>
                  {cp.passed ? (
                    <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
                <span className={`text-sm flex-1 ${cp.passed ? "text-slate-400" : "text-red-300 font-medium"}`}>
                  {cp.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </DarkCard>
  );
}

// ─── Frame 2: The Insight ────────────────────────────────────────
function InsightFrame({ story }: { story: Story }) {
  return (
    <DarkCard>
      <div className="p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary">
              {story.repInitials}
            </div>
            <div>
              <p className="text-base font-heading font-semibold text-white">{story.leadName}</p>
              <p className="text-sm text-slate-400">{story.repName} &middot; {story.leadSource}</p>
            </div>
          </div>
          <div className="bg-amber-500/15 text-amber-400 text-xs font-semibold px-3 py-1 rounded-full border border-amber-500/20">
            At Risk
          </div>
        </div>

        {/* Objection barrier card */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="bg-red-500/[0.06] rounded-lg border border-red-500/15 p-4 mb-4"
        >
          <div className="flex items-start gap-3 mb-3">
            <div className="w-1 h-full min-h-[40px] rounded-full bg-red-500/60 flex-shrink-0" />
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-red-400/80">Barrier</span>
                <span className="text-sm bg-red-500/15 text-red-400 px-2 py-0.5 rounded font-medium">{story.objectionShort}</span>
              </div>
              <p className="text-[15px] text-slate-300 italic leading-relaxed">
                &ldquo;{story.customerQuote}&rdquo;
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between pl-4">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-500">{story.sentimentStart}</span>
              <svg className="w-3.5 h-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <span className="text-amber-400 font-medium">{story.sentimentEnd}</span>
            </div>
            <span className="text-base font-mono font-bold text-red-400">
              ${story.revenueAtStake}
            </span>
          </div>
        </motion.div>

        {/* Coaching tip */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="bg-slate-900/40 rounded-lg border border-white/[0.04] p-4"
        >
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-amber-500/15 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-amber-400/80 mb-1">Coaching Tip</p>
              <p className="text-sm text-slate-300 leading-relaxed">{story.coachingNote}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </DarkCard>
  );
}

// ─── Frame 3: The Action (SMS only — full width phone) ───────────
function SMSBubble({ msg, index }: { msg: StorySMSMessage; index: number }) {
  const isLead = msg.sender === "lead";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.15, duration: 0.3 }}
      className={`flex flex-col ${isLead ? "items-end" : "items-start"}`}
    >
      <span className="text-[8px] text-slate-400 mb-0.5 px-1">
        {isLead ? "Lead" : "Plaibook AI"} &middot; {msg.time}
      </span>
      <div
        className={`rounded-2xl px-3 py-2 text-[13px] leading-relaxed max-w-[85%] ${
          isLead
            ? "bg-primary text-white rounded-br-sm"
            : "bg-slate-200 text-slate-800 rounded-bl-sm"
        }`}
      >
        {msg.text}
      </div>
    </motion.div>
  );
}

function ActionFrame({ story }: { story: Story }) {
  const lastMsg = story.smsThread[story.smsThread.length - 1];
  const showConfirmation = lastMsg?.sender === "lead";
  return (
    <div className="flex flex-col items-center">
      {/* Recovered badge above phone */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-3"
      >
        <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-base font-semibold text-emerald-400">Deal Recovered</span>
        <span className="text-base font-mono font-bold text-emerald-300">+${story.recoveredRevenue}</span>
      </motion.div>

      {/* Phone — centered, comfortable width */}
      <div className="w-[300px]">
        <PhoneFrame>
          <div className="bg-white px-3 pt-2 pb-1 flex items-center justify-between">
            <span className="text-[10px] font-mono tabular-nums text-slate-500">7:56 PM</span>
            <div className="flex items-center gap-1">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-0.5 rounded-full bg-slate-800" style={{ height: 4 + i * 2 }} />
                ))}
              </div>
              <span className="text-[8px] text-slate-500 ml-1">5G</span>
            </div>
          </div>
          <div className="bg-white px-3 pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <div className="flex-1 text-center">
                <p className="text-xs font-heading font-semibold text-slate-800">{story.leadName}</p>
                <p className="text-[9px] text-slate-400">Plaibook AI</p>
              </div>
              <div className="w-4" />
            </div>
          </div>
          {/* Messages */}
          <div className="bg-slate-50 px-3 py-3 space-y-2 h-[320px] overflow-y-auto scrollbar-light">
            {story.smsThread.map((msg, i) => (
              <SMSBubble key={i} msg={msg} index={i} />
            ))}
            {showConfirmation && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + story.smsThread.length * 0.15, duration: 0.4, type: "spring" }}
                className="flex justify-center pt-2"
              >
                <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-3 py-1.5 text-xs font-medium">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Contract signed
                </div>
              </motion.div>
            )}
          </div>
          <div className="bg-white border-t border-slate-200 px-3 py-2 flex items-center gap-2">
            <div className="flex-1 bg-slate-100 rounded-full px-3 py-1.5 text-[10px] text-slate-400">iMessage</div>
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
              <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </div>
          </div>
        </PhoneFrame>
      </div>
    </div>
  );
}

// ─── Frame labels ────────────────────────────────────────────────
const FRAME_LABELS = ["Hear the Call", "Find the Issue", "Recover the Deal"];
const FRAME_ICONS = [
  <svg key="call" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>,
  <svg key="insight" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>,
  <svg key="action" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>,
];

// ─── Main Component ──────────────────────────────────────────────
export default function HeroStoryLoop({ className = "" }: { className?: string }) {
  const [storyIndex, setStoryIndex] = useState(0);
  const [frameIndex, setFrameIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const [progress, setProgress] = useState(0);
  const lastTickRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const advancingRef = useRef(false);

  useEffect(() => { lastTickRef.current = performance.now(); }, []);

  const [totalRecovered, setTotalRecovered] = useState(4200);

  const story = STORIES[storyIndex];
  const storyIndexRef = useRef(storyIndex);
  useEffect(() => { storyIndexRef.current = storyIndex; }, [storyIndex]);

  const advance = useCallback(() => {
    if (advancingRef.current) return;
    advancingRef.current = true;
    setProgress(0);
    lastTickRef.current = performance.now();
    setFrameIndex((prev) => {
      if (prev < TOTAL_FRAMES - 1) return prev + 1;
      setTotalRecovered((r) => r + STORIES[storyIndexRef.current].recoveredRevenue);
      setStoryIndex((si) => (si + 1) % STORIES.length);
      return 0;
    });
    requestAnimationFrame(() => { advancingRef.current = false; });
  }, []);

  useEffect(() => {
    if (isPaused) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }
    lastTickRef.current = performance.now();
    function tick(now: number) {
      const delta = now - lastTickRef.current;
      lastTickRef.current = now;
      setProgress((prev) => {
        const next = prev + delta;
        if (next >= FRAME_DURATION) {
          queueMicrotask(advance);
          return FRAME_DURATION;
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [isPaused, advance]);

  const progressPercent = Math.min((progress / FRAME_DURATION) * 100, 100);

  const jumpToFrame = useCallback((idx: number) => {
    advancingRef.current = false;
    setFrameIndex(idx);
    setProgress(0);
    setIsPaused(false);
  }, []);

  const togglePause = () => setIsPaused((p) => !p);

  return (
    <div className={`max-w-[440px] mx-auto ${className}`}>
      {/* Stats bar */}
      <div className="flex items-center gap-2 mb-3">
        {[
          { label: "Close Rate", value: "31.4%", animated: false },
          { label: "Recovered", value: totalRecovered, animated: true },
          { label: "Qualified", value: "67.2%", animated: false },
        ].map((stat) => (
          <div key={stat.label} className="flex-1 bg-white/[0.04] rounded-lg px-3 py-2.5 border border-white/[0.06]">
            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">{stat.label}</p>
            <p className="text-lg font-mono tabular-nums text-white font-semibold">
              {stat.animated ? <AnimatedNumber value={stat.value as number} prefix="$" /> : stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-[3px] mb-2.5">
        {Array.from({ length: TOTAL_FRAMES }).map((_, i) => (
          <button
            key={i}
            onClick={() => jumpToFrame(i)}
            className="flex-1 h-[3px] rounded-full overflow-hidden bg-white/[0.06] relative cursor-pointer group"
            aria-label={`Go to step: ${FRAME_LABELS[i]}`}
          >
            {i < frameIndex && <div className="absolute inset-0 bg-primary/60 rounded-full" />}
            {i === frameIndex && (
              <div className="absolute inset-y-0 left-0 bg-primary rounded-full" style={{ width: `${progressPercent}%` }} />
            )}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.06] rounded-full transition-colors" />
          </button>
        ))}
      </div>

      {/* Frame label + pause */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-slate-500">
          {FRAME_ICONS[frameIndex]}
          <AnimatePresence mode="wait">
            <motion.p
              key={`${storyIndex}-${frameIndex}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="text-sm text-slate-400 font-medium"
            >
              {FRAME_LABELS[frameIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
        <button
          onClick={togglePause}
          className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-400 transition-colors"
        >
          {isPaused ? (
            <><svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg><span>Resume</span></>
          ) : (
            <><svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" /></svg><span>Pause</span></>
          )}
        </button>
      </div>

      {/* Frame container */}
      <div className="h-[480px] relative flex items-start">
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${story.id}-${frameIndex}`}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              {frameIndex === 0 && <CallFrame story={story} />}
              {frameIndex === 1 && <InsightFrame story={story} />}
              {frameIndex === 2 && <ActionFrame story={story} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
