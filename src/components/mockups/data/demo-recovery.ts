export interface RecoveryLead {
  leadName: string;
  originalAgent: string;
  callOutcome: string;
  smsStatus: "in-conversation" | "re-engaged" | "closed" | "no-response";
  messagesSent: number;
  daysSinceCall: number;
  revenue: number | null;
  service: string;
}

export const DEMO_RECOVERY_LEADS: RecoveryLead[] = [
  {
    leadName: "Jennifer Walsh",
    originalAgent: "Sarah Chen",
    callOutcome: "Said she'd think about it",
    smsStatus: "closed",
    messagesSent: 7,
    daysSinceCall: 3,
    revenue: 589,
    service: "Quarterly Plan",
  },
  {
    leadName: "Lisa Chen",
    originalAgent: "Tyler Brooks",
    callOutcome: "Price objection — comparing quotes",
    smsStatus: "closed",
    messagesSent: 5,
    daysSinceCall: 2,
    revenue: 449,
    service: "Quarterly Plan",
  },
  {
    leadName: "Tom Bradley",
    originalAgent: "Sarah Chen",
    callOutcome: "Needs to talk to wife",
    smsStatus: "re-engaged",
    messagesSent: 4,
    daysSinceCall: 1,
    revenue: null,
    service: "Quarterly Plan",
  },
  {
    leadName: "Karen Mitchell",
    originalAgent: "Devon Hall",
    callOutcome: "Wanted more info",
    smsStatus: "in-conversation",
    messagesSent: 3,
    daysSinceCall: 1,
    revenue: null,
    service: "Initial Treatment",
  },
  {
    leadName: "James Wilson",
    originalAgent: "Tyler Brooks",
    callOutcome: "Under contract with competitor",
    smsStatus: "no-response",
    messagesSent: 2,
    daysSinceCall: 5,
    revenue: null,
    service: "Quarterly Plan",
  },
  {
    leadName: "Patricia Moore",
    originalAgent: "Jake Morrison",
    callOutcome: "Budget concerns",
    smsStatus: "closed",
    messagesSent: 8,
    daysSinceCall: 4,
    revenue: 349,
    service: "One-Time Treatment",
  },
  {
    leadName: "Ryan Cooper",
    originalAgent: "Amanda Reyes",
    callOutcome: "Wanted to get other quotes",
    smsStatus: "re-engaged",
    messagesSent: 3,
    daysSinceCall: 2,
    revenue: null,
    service: "Quarterly Plan",
  },
  {
    leadName: "Maria Santos",
    originalAgent: "Chris Tanaka",
    callOutcome: "Call dropped — never called back",
    smsStatus: "closed",
    messagesSent: 6,
    daysSinceCall: 3,
    revenue: 589,
    service: "Quarterly Plan + Termite",
  },
];
