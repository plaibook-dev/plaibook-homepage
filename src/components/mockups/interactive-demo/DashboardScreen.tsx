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
import {
  OBJECTION_CATEGORIES,
  OBJECTION_SUMMARY,
} from "@/components/mockups/data/demo-objections";

interface DashboardScreenProps {
  onSelectObjection: (objectionId: string) => void;
  firstVisit: boolean;
}

const chartData = OBJECTION_CATEGORIES.map((o) => ({
  name: o.shortName,
  id: o.id,
  revenueLost: o.revenueLost,
  label: `$${(o.revenueLost / 1000).toFixed(1)}K`,
}));

const DEFAULT_FILL = "#f87171"; // red-400
const HOVER_FILL = "#ef4444"; // red-500
const DIMMED_FILL = "#fca5a5"; // red-300

function formatDollars(n: number): string {
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`;
  return `$${n.toLocaleString()}`;
}

export default function DashboardScreen({
  onSelectObjection,
  firstVisit,
}: DashboardScreenProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="p-3">
      <p className="text-[10px] text-slate-500 mb-2 font-heading font-semibold">
        Revenue Lost by Objection
      </p>

      <ResponsiveContainer width="100%" height={170}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 0, right: 40, bottom: 0, left: 4 }}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <XAxis
            type="number"
            tick={{ fontSize: 9, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}K`}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fontSize: 9, fill: "#64748b" }}
            axisLine={false}
            tickLine={false}
            width={90}
          />
          <Bar
            dataKey="revenueLost"
            radius={[0, 3, 3, 0]}
            cursor="pointer"
            onMouseEnter={(_, index) => setHoveredIndex(index)}
            onClick={(_, index) => {
              if (typeof index === "number")
                onSelectObjection(chartData[index].id);
            }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            label={(props: any) => {
              const x = Number(props.x ?? 0);
              const y = Number(props.y ?? 0);
              const w = Number(props.width ?? 0);
              const v = Number(props.value ?? 0);
              return (
                <text
                  x={x + w + 4}
                  y={y + 10}
                  fontSize={10}
                  fill="#94a3b8"
                  fontFamily="monospace"
                >
                  ${(v / 1000).toFixed(1)}K
                </text>
              );
            }}
          >
            {chartData.map((_, i) => (
              <Cell
                key={i}
                fill={
                  hoveredIndex === null
                    ? DEFAULT_FILL
                    : hoveredIndex === i
                      ? HOVER_FILL
                      : DIMMED_FILL
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
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400" />
          </span>
          <span className="text-[10px] text-red-500 font-medium">
            Click any objection to see the calls behind it
          </span>
        </div>
      )}

      {/* Summary stats row */}
      <div className="grid grid-cols-3 gap-2 mt-3">
        <div className="bg-white rounded-lg p-2 text-center">
          <p className="text-[10px] text-slate-500">Total Lost</p>
          <p className="text-sm font-mono font-semibold text-red-600">
            {formatDollars(OBJECTION_SUMMARY.totalLost)}
          </p>
        </div>
        <div className="bg-white rounded-lg p-2 text-center">
          <p className="text-[10px] text-slate-500">Qualified Unclosed</p>
          <p className="text-sm font-mono font-semibold text-slate-800">
            {OBJECTION_SUMMARY.qualifiedUnclosed} leads
          </p>
        </div>
        <div className="bg-white rounded-lg p-2 text-center">
          <p className="text-[10px] text-slate-500">Recoverable</p>
          <p className="text-sm font-mono font-semibold text-emerald-600">
            {formatDollars(OBJECTION_SUMMARY.recoverable)}
          </p>
        </div>
      </div>
    </div>
  );
}
