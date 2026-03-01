"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  FormEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

function renderMessageContent(text: string): ReactNode {
  // Split on markdown links [label](url) and bare URLs
  const parts = text.split(/(\[[^\]]+\]\(https?:\/\/[^)]+\)|https?:\/\/[^\s)]+)/g);
  return parts.map((part, i) => {
    const mdMatch = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
    if (mdMatch) {
      return (
        <a key={i} href={mdMatch[2]} target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">
          {mdMatch[1]}
        </a>
      );
    }
    if (/^https?:\/\//.test(part)) {
      return (
        <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">
          {part}
        </a>
      );
    }
    return part;
  });
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

const MIN_W = 300;
const MIN_H = 350;
const MAX_W = 600;
const MAX_H = 700;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState({ w: 380, h: 500 });
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastMsgRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<{ startX: number; startY: number; startW: number; startH: number } | null>(null);

  useEffect(() => {
    if (lastMsgRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const el = lastMsgRef.current;
      const top = el.offsetTop - container.offsetTop;
      container.scrollTo({ top, behavior: "smooth" });
    } else if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  // --- Resize logic (drag top-left corner) ---
  const onResizeStart = useCallback(
    (e: ReactPointerEvent) => {
      e.preventDefault();
      dragging.current = {
        startX: e.clientX,
        startY: e.clientY,
        startW: size.w,
        startH: size.h,
      };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [size]
  );

  const onResizeMove = useCallback((e: ReactPointerEvent) => {
    if (!dragging.current) return;
    const { startX, startY, startW, startH } = dragging.current;
    const dw = startX - e.clientX; // dragging left = bigger
    const dh = startY - e.clientY; // dragging up = bigger
    setSize({
      w: Math.min(MAX_W, Math.max(MIN_W, startW + dw)),
      h: Math.min(MAX_H, Math.max(MIN_H, startH + dh)),
    });
  }, []);

  const onResizeEnd = useCallback(() => {
    dragging.current = null;
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply ?? "Sorry, something went wrong." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Couldn't reach the server. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={() => setOpen(true)}
            aria-label="Open chat"
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary-dark cursor-pointer"
          >
            <MessageCircle size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col overflow-hidden rounded-2xl bg-surface shadow-2xl shadow-black/15 border border-black/5"
            style={{
              width: Math.min(size.w, window.innerWidth - 48),
              height: Math.min(size.h, window.innerHeight - 96),
            }}
          >
            {/* Resize handle — top-left corner */}
            <div
              onPointerDown={onResizeStart}
              onPointerMove={onResizeMove}
              onPointerUp={onResizeEnd}
              onPointerCancel={onResizeEnd}
              className="absolute top-0 left-0 z-10 h-5 w-5 cursor-nwse-resize"
              style={{ touchAction: "none" }}
            />

            {/* Header */}
            <div className="flex items-center justify-between bg-primary px-4 py-3">
              <div className="flex items-center gap-2">
                <MessageCircle size={18} className="text-white" />
                <span className="font-semibold text-white text-sm">Ask about Plaibook</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="flex h-7 w-7 items-center justify-center rounded-full text-white/80 hover:bg-white/20 hover:text-white cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.length === 0 && !loading && (
                <p className="text-center text-text-muted text-sm pt-8">
                  Hi! Ask me anything about Plaibook.
                </p>
              )}

              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  ref={i === messages.length - 1 ? lastMsgRef : undefined}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-white rounded-br-md"
                        : "bg-black/[0.06] text-text-primary rounded-bl-md"
                    }`}
                  >
                    {msg.role === "assistant" ? renderMessageContent(msg.content) : msg.content}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex gap-1.5 rounded-2xl rounded-bl-md bg-black/[0.06] px-4 py-3">
                    {[0, 1, 2].map((dot) => (
                      <motion.span
                        key={dot}
                        className="block h-2 w-2 rounded-full bg-text-secondary"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: dot * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="border-t border-black/5 px-3 py-2.5">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message…"
                  className="flex-1 rounded-xl bg-surface-alt px-3.5 py-2 text-sm text-text-primary placeholder:text-text-muted outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  aria-label="Send message"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white disabled:opacity-40 hover:bg-primary-dark cursor-pointer"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
