"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { DEMO_AGENTS } from "@/components/mockups/data/demo-agents";
import { DEMO_CALLS } from "@/components/mockups/data/demo-calls";

interface DashboardScreenProps {
  onSelectRep: (agentName: string) => void;
  firstVisit: boolean;
}

const chartData = DEMO_AGENTS.slice(0, 6).map((a) => ({
  name: a.name.split(" ")[0] + " " + a.name.split(" ")[1][0] + ".",
  fullName: a.name,
  closeRate: Math.round(a.closeRate * 100),
}));

const totalCalls = DEMO_AGENTS.slice(0, 6).reduce(
  (sum, a) => sum + a.totalCalls,
  0
);
const avgQC = Math.round(
  (DEMO_AGENTS.slice(0, 6).reduce((sum, a) => sum + a.checkpointScore, 0) /
    6) *
    100
);
const dealsClosed = DEMO_CALLS.filter((c) => c.outcome === "sold").length;
const dealsLost = DEMO_CALLS.filter(
  (c) => c.outcome === "unqualified" || c.outcome === "abandoned"
).length;

const DEFAULT_FILL = "#cbd5e1";
const ACTIVE_FILL = "#6AA89A";
const HOVER_FILL = "#7bb8ab";

export default function DashboardScreen({
  onSelectRep,
  firstVisit,
}: DashboardScreenProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="p-3">
      <p className="text-[10px] text-slate-500 mb-2 font-heading font-semibold">
        Close Rate by Agent
      </p>

      <ResponsiveContainer width="100%" height={160}>
        <BarChart
          data={chartData}
          layout="horizontal"
          margin={{ top: 0, right: 4, bottom: 0, left: 4 }}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <XAxis
            dataKey="name"
            tick={{ fontSize: 9, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 9, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
            domain={[0, 50]}
          />
          <Bar
            dataKey="closeRate"
            radius={[3, 3, 0, 0]}
            cursor="pointer"
            onMouseEnter={(_, index) => setHoveredIndex(index)}
            onClick={(_, index) => {
              if (typeof index === "number") onSelectRep(chartData[index].fullName);
            }}
          >
            {chartData.map((_, i) => (
              <Cell
                key={i}
                fill={
                  hoveredIndex === i
                    ? HOVER_FILL
                    : hoveredIndex !== null
                      ? DEFAULT_FILL
                      : DEFAULT_FILL
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* First-visit prompt */}
      {firstVisit && (
        <div className="flex items-center justify-center gap-1.5 mt-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-[10px] text-primary font-medium">
            Click any bar to explore
          </span>
        </div>
      )}

      {/* Summary stats row */}
      <div className="grid grid-cols-4 gap-2 mt-3">
        <div className="bg-white rounded-lg p-2 text-center">
          <p className="text-[10px] text-slate-500">Calls This Week</p>
          <p className="text-sm font-mono font-semibold text-slate-800">
            {totalCalls}
          </p>
        </div>
        <div className="bg-white rounded-lg p-2 text-center">
          <p className="text-[10px] text-slate-500">Avg QC Score</p>
          <p className="text-sm font-mono font-semibold text-slate-800">
            {avgQC}%
          </p>
        </div>
        <div className="bg-white rounded-lg p-2 text-center">
          <p className="text-[10px] text-slate-500">Deals Closed</p>
          <p className="text-sm font-mono font-semibold text-slate-800">
            {dealsClosed}
          </p>
        </div>
        <div className="bg-white rounded-lg p-2 text-center">
          <p className="text-[10px] text-slate-500">Deals Lost</p>
          <p className="text-sm font-mono font-semibold text-slate-800">
            {dealsLost}
          </p>
        </div>
      </div>
    </div>
  );
}
