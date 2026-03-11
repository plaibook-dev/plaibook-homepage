"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BrowserFrame from "@/components/ui/BrowserFrame";
import DashboardScreen from "@/components/mockups/interactive-demo/DashboardScreen";
import ObjectionDrilldownScreen from "@/components/mockups/interactive-demo/RepDrilldownScreen";
import CallDetailScreen from "@/components/mockups/interactive-demo/CallDetailScreen";
import { OBJECTION_CATEGORIES } from "@/components/mockups/data/demo-objections";

type Screen =
  | { type: "dashboard" }
  | { type: "objection-drilldown"; objection: string }
  | { type: "call-detail"; callId: string; objection: string };

const sceneVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export default function InteractiveDemo({
  className = "",
}: {
  className?: string;
}) {
  const [screen, setScreen] = useState<Screen>({ type: "dashboard" });
  const [history, setHistory] = useState<Screen[]>([]);
  const [firstVisit, setFirstVisit] = useState(true);

  function navigateTo(next: Screen) {
    setHistory((prev) => [...prev, screen]);
    setScreen(next);
    setFirstVisit(false);
  }

  function goBack() {
    setHistory((prev) => {
      const copy = [...prev];
      const last = copy.pop();
      if (last) setScreen(last);
      return copy;
    });
  }

  // Extract objection info for breadcrumb
  const objectionId =
    screen.type === "objection-drilldown"
      ? screen.objection
      : screen.type === "call-detail"
        ? screen.objection
        : null;

  const objectionLabel = objectionId
    ? OBJECTION_CATEGORIES.find((o) => o.id === objectionId)?.shortName ??
      objectionId
    : null;

  // Build a unique key for AnimatePresence
  const screenKey =
    screen.type === "dashboard"
      ? "dashboard"
      : screen.type === "objection-drilldown"
        ? `objection-${screen.objection}`
        : `call-${screen.callId}`;

  return (
    <BrowserFrame className={className}>
      <div className="bg-slate-50 min-h-[340px] flex flex-col">
        {/* Breadcrumb bar */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border-b border-slate-100 text-[11px]">
          <button
            onClick={() => {
              setScreen({ type: "dashboard" });
              setHistory([]);
            }}
            className={
              screen.type === "dashboard"
                ? "text-slate-700 font-medium"
                : "text-primary hover:underline"
            }
          >
            Dashboard
          </button>
          {screen.type !== "dashboard" && objectionLabel && (
            <>
              <span className="text-slate-300">/</span>
              <button
                onClick={() => {
                  if (screen.type === "call-detail") {
                    setScreen({
                      type: "objection-drilldown",
                      objection: screen.objection,
                    });
                    setHistory([{ type: "dashboard" }]);
                  }
                }}
                className={
                  screen.type === "objection-drilldown"
                    ? "text-slate-700 font-medium"
                    : "text-primary hover:underline"
                }
              >
                {objectionLabel}
              </button>
            </>
          )}
          {screen.type === "call-detail" && (
            <>
              <span className="text-slate-300">/</span>
              <span className="text-slate-500">Call Detail</span>
            </>
          )}
        </div>

        {/* Screen content */}
        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={screenKey}
              variants={sceneVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {screen.type === "dashboard" && (
                <DashboardScreen
                  onSelectObjection={(id) =>
                    navigateTo({ type: "objection-drilldown", objection: id })
                  }
                  firstVisit={firstVisit}
                />
              )}
              {screen.type === "objection-drilldown" && (
                <ObjectionDrilldownScreen
                  objectionId={screen.objection}
                  onSelectCall={(callId) =>
                    navigateTo({
                      type: "call-detail",
                      callId,
                      objection: screen.objection,
                    })
                  }
                  onBack={goBack}
                />
              )}
              {screen.type === "call-detail" && (
                <CallDetailScreen
                  callId={screen.callId}
                  objection={screen.objection}
                  onBack={goBack}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </BrowserFrame>
  );
}
