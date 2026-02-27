export const CHECKPOINT_STEPS = [
  "Greeting",
  "Needs Assessment",
  "Service Recommendation",
  "Price Presentation",
  "Objection Handling",
  "Urgency / Close Attempt",
  "Booking Attempt",
] as const;

export type CheckpointStep = (typeof CHECKPOINT_STEPS)[number];

export interface RepCheckpoints {
  name: string;
  scores: Record<CheckpointStep, number>;
}

export const DEMO_CHECKPOINT_DATA: RepCheckpoints[] = [
  {
    name: "Marcus R.",
    scores: { Greeting: 98, "Needs Assessment": 94, "Service Recommendation": 96, "Price Presentation": 92, "Objection Handling": 88, "Urgency / Close Attempt": 90, "Booking Attempt": 94 },
  },
  {
    name: "Sarah C.",
    scores: { Greeting: 95, "Needs Assessment": 90, "Service Recommendation": 88, "Price Presentation": 86, "Objection Handling": 82, "Urgency / Close Attempt": 78, "Booking Attempt": 84 },
  },
  {
    name: "Jake M.",
    scores: { Greeting: 88, "Needs Assessment": 82, "Service Recommendation": 78, "Price Presentation": 74, "Objection Handling": 62, "Urgency / Close Attempt": 58, "Booking Attempt": 68 },
  },
  {
    name: "Priya P.",
    scores: { Greeting: 96, "Needs Assessment": 92, "Service Recommendation": 94, "Price Presentation": 90, "Objection Handling": 86, "Urgency / Close Attempt": 88, "Booking Attempt": 92 },
  },
  {
    name: "Tyler B.",
    scores: { Greeting: 82, "Needs Assessment": 76, "Service Recommendation": 70, "Price Presentation": 68, "Objection Handling": 56, "Urgency / Close Attempt": 52, "Booking Attempt": 62 },
  },
  {
    name: "Amanda R.",
    scores: { Greeting: 92, "Needs Assessment": 88, "Service Recommendation": 84, "Price Presentation": 82, "Objection Handling": 78, "Urgency / Close Attempt": 74, "Booking Attempt": 80 },
  },
  {
    name: "Devon H.",
    scores: { Greeting: 94, "Needs Assessment": 90, "Service Recommendation": 90, "Price Presentation": 88, "Objection Handling": 84, "Urgency / Close Attempt": 82, "Booking Attempt": 88 },
  },
  {
    name: "Chris T.",
    scores: { Greeting: 90, "Needs Assessment": 84, "Service Recommendation": 80, "Price Presentation": 78, "Objection Handling": 72, "Urgency / Close Attempt": 68, "Booking Attempt": 76 },
  },
];
