"use client";

import { motion } from "framer-motion";

interface Message {
  sender: "ai" | "customer";
  text: string;
  meta?: string;
}

interface ConversationProps {
  title: string;
  subtitle: string;
  messages: Message[];
}

function Bubble({ msg, index }: { msg: Message; index: number }) {
  const isCustomer = msg.sender === "customer";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.3 }}
      className={`flex flex-col ${isCustomer ? "items-end" : "items-start"}`}
    >
      {msg.meta && (
        <span className="text-[10px] text-slate-400 mb-1 px-1 italic">
          {msg.meta}
        </span>
      )}
      <div
        className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed max-w-[85%] ${
          isCustomer
            ? "bg-primary text-white rounded-br-sm"
            : "bg-slate-200 text-slate-800 rounded-bl-sm"
        }`}
      >
        {msg.text}
      </div>
    </motion.div>
  );
}

export default function CaseStudySMS({
  title,
  subtitle,
  messages,
}: ConversationProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 px-5 py-3">
        <p className="text-sm font-heading font-semibold text-slate-800">
          {title}
        </p>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>

      {/* Messages */}
      <div className="px-4 py-4 space-y-3 bg-slate-50/50">
        {messages.map((msg, i) => (
          <Bubble key={i} msg={msg} index={i} />
        ))}
      </div>
    </div>
  );
}
