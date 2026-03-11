"use client";

import { motion } from "framer-motion";
import PhoneFrame from "@/components/ui/PhoneFrame";
import { DEMO_SMS_THREAD } from "./data/demo-sms";

export default function SMSConversation({ className = "" }: { className?: string }) {
  return (
    <PhoneFrame className={className}>
      {/* Status bar */}
      <div className="bg-white px-4 pt-2 pb-1 flex items-center justify-between">
        <span className="text-[10px] font-mono tabular-nums text-slate-500">3:34 PM</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`w-0.5 rounded-full bg-slate-800`} style={{ height: 4 + i * 2 }} />
            ))}
          </div>
          <span className="text-[8px] text-slate-500 ml-1">5G</span>
          <div className="w-5 h-2.5 border border-slate-800 rounded-sm relative ml-1">
            <div className="absolute inset-0.5 bg-slate-800 rounded-xs" style={{ width: "70%" }} />
          </div>
        </div>
      </div>

      {/* Nav bar */}
      <div className="bg-white px-4 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <div className="flex-1 text-center">
            <p className="text-xs font-heading font-semibold text-slate-800">Pest Control</p>
            <p className="text-[9px] text-slate-400">Messages</p>
          </div>
          <div className="w-4" />
        </div>
      </div>

      {/* Messages */}
      <div className="bg-slate-50 px-3 py-3 space-y-2 max-h-[380px] overflow-y-auto scrollbar-light">
        {DEMO_SMS_THREAD.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
            className={`flex flex-col ${msg.sender === "lead" ? "items-end" : "items-start"}`}
          >
            <span className="text-[8px] text-slate-400 mb-0.5 px-1">
              {msg.sender === "ai" ? "Pest Control" : "Jennifer"} &middot; {msg.time}
            </span>
            <div
              className={`rounded-2xl px-3 py-2 text-[11px] leading-relaxed max-w-[85%] ${
                msg.sender === "lead"
                  ? "bg-primary text-white rounded-br-sm"
                  : "bg-slate-200 text-slate-800 rounded-bl-sm"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input bar */}
      <div className="bg-white border-t border-slate-200 px-3 py-2 flex items-center gap-2">
        <div className="flex-1 bg-slate-100 rounded-full px-3 py-1.5 text-[10px] text-slate-400">
          iMessage
        </div>
        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
          <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </div>
      </div>
    </PhoneFrame>
  );
}
