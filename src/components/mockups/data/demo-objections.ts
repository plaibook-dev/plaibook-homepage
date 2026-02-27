export interface DemoObjection {
  name: string;
  frequency: number;
  overcomeRate: number;
  dealsBlocked: number;
  lostRevenue: number;
}

export const DEMO_OBJECTIONS: DemoObjection[] = [
  { name: "Price too high", frequency: 156, overcomeRate: 42, dealsBlocked: 91, lostRevenue: 48200 },
  { name: "Already has a provider", frequency: 98, overcomeRate: 28, dealsBlocked: 71, lostRevenue: 37600 },
  { name: "Need to talk to spouse", frequency: 134, overcomeRate: 61, dealsBlocked: 52, lostRevenue: 27500 },
  { name: "Just getting quotes", frequency: 87, overcomeRate: 35, dealsBlocked: 57, lostRevenue: 30100 },
  { name: "Not the homeowner", frequency: 43, overcomeRate: 12, dealsBlocked: 38, lostRevenue: 20100 },
  { name: "Bad past experience", frequency: 62, overcomeRate: 54, dealsBlocked: 29, lostRevenue: 15300 },
];
