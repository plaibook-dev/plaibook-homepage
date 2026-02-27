export interface DemoAgent {
  name: string;
  totalCalls: number;
  closeRate: number;
  checkpointScore: number;
  revenue: number;
  avgSaleValue: number;
  avgTalkTime: number;
  qualifiedRate: number;
}

export const DEMO_AGENTS: DemoAgent[] = [
  { name: "Marcus Rivera", totalCalls: 147, closeRate: 0.38, checkpointScore: 0.94, revenue: 31200, avgSaleValue: 558, avgTalkTime: 342, qualifiedRate: 0.71 },
  { name: "Sarah Chen", totalCalls: 132, closeRate: 0.34, checkpointScore: 0.88, revenue: 24800, avgSaleValue: 552, avgTalkTime: 298, qualifiedRate: 0.68 },
  { name: "Jake Morrison", totalCalls: 158, closeRate: 0.29, checkpointScore: 0.76, revenue: 22100, avgSaleValue: 482, avgTalkTime: 267, qualifiedRate: 0.62 },
  { name: "Priya Patel", totalCalls: 119, closeRate: 0.41, checkpointScore: 0.91, revenue: 28600, avgSaleValue: 586, avgTalkTime: 378, qualifiedRate: 0.74 },
  { name: "Tyler Brooks", totalCalls: 141, closeRate: 0.26, checkpointScore: 0.72, revenue: 17400, avgSaleValue: 474, avgTalkTime: 245, qualifiedRate: 0.58 },
  { name: "Amanda Reyes", totalCalls: 136, closeRate: 0.33, checkpointScore: 0.85, revenue: 23500, avgSaleValue: 524, avgTalkTime: 312, qualifiedRate: 0.66 },
  { name: "Devon Hall", totalCalls: 124, closeRate: 0.36, checkpointScore: 0.89, revenue: 25800, avgSaleValue: 578, avgTalkTime: 356, qualifiedRate: 0.70 },
  { name: "Chris Tanaka", totalCalls: 143, closeRate: 0.31, checkpointScore: 0.82, revenue: 21200, avgSaleValue: 478, avgTalkTime: 284, qualifiedRate: 0.64 },
];
