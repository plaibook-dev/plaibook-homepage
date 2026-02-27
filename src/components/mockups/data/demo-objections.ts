/* ------------------------------------------------------------------ */
/*  Revenue-Loss Demo Data — objections, calls, and transcripts       */
/* ------------------------------------------------------------------ */

// ── Types ────────────────────────────────────────────────────────────

export interface ObjectionCategory {
  id: string;
  name: string;
  shortName: string;
  revenueLost: number;
  callCount: number;
  recoveryRate: number; // 0-1
  whatWorked: string[];
  whatDidntWork: string[];
}

export interface ObjectionCall {
  id: string;
  objectionId: string;
  leadName: string;
  repName: string;
  revenueAtStake: number;
  leadSource: string;
  serviceType: string;
  quote: string; // the moment the objection killed the deal
  outcome: "lost" | "stalled" | "recovered";
  checkpointScore: number;
  highlighted?: boolean;
}

export interface ObjectionTranscriptExchange {
  speaker: "rep" | "lead";
  speakerName: string;
  text: string;
  isObjectionMoment?: boolean;
  timestamp?: string;
}

export interface ObjectionTranscript {
  callId: string;
  repName: string;
  leadName: string;
  objectionId: string;
  duration: string;
  exchanges: ObjectionTranscriptExchange[];
  coachingNote: {
    summary: string;
    suggestedResponse: string;
    objectionName: string;
  };
  outcomeTag: string;
}

// ── Objection Categories ─────────────────────────────────────────────

export const OBJECTION_CATEGORIES: ObjectionCategory[] = [
  {
    id: "spouse",
    name: "Spouse / Decision Maker",
    shortName: "Spouse Objection",
    revenueLost: 37_400,
    callCount: 14,
    recoveryRate: 0.61,
    whatWorked: [
      "Agent explained the card-on-file process and offered to call back in 5 minutes after the customer spoke with her husband.",
      "Agent offered to send a text with the quote to simplify the next steps.",
      "Agent acknowledged the need to talk and offered to check for further discounts to save time.",
      "Agent re-offered a free inspection which the customer accepted as a next step, securing a follow-up action.",
    ],
    whatDidntWork: [
      "Agent offered to save the quote and send it to her so she could show her husband.",
      "Agent explained the preference for having the decision maker present during the inspection for efficiency.",
      "Agent offered to set it up with the husband instead to save time.",
      "Agent agreed and offered to send a text for easy follow-up within the hour.",
    ],
  },
  {
    id: "price",
    name: "Price Too High",
    shortName: "Price Objection",
    revenueLost: 24_200,
    callCount: 11,
    recoveryRate: 0.42,
    whatWorked: [
      "Agent discounted the monthly rate from $62 to $59 and emphasized that the startup fee was already waived.",
      "Agent offered a price matching guarantee for a similar service and highlighted company reviews/service quality.",
      "Agent focused on location-based discounts and bundled value, eventually offering a military/senior credit.",
      "Agent explained that the offered rate was already reduced and highly competitive compared to their website.",
    ],
    whatDidntWork: [
      "The agent contrasted their local service with Terminix\u2019s national scale and offered a price match guarantee and a discount.",
      "Agent mentioned they are highly rated on Google and offered a price match program if the customer finds a better price.",
      "Agent explained the billing structure and the value of the warranty and free re-treatments.",
      "Agent emphasized the quality of service reflected in reviews and offered a discount to $50/month.",
    ],
  },
  {
    id: "think",
    name: "Need to Think About It",
    shortName: "Think-About-It",
    revenueLost: 18_900,
    callCount: 9,
    recoveryRate: 0.35,
    whatWorked: [
      "Agent immediately dropped the pitch and quoted the direct price of $79 for the pest control renewal.",
      "Agent offered to book the service out for the following month and not charge until then, while still locking in the discounted rate.",
      "Agent maintained focus on the immediate need and suggested specific appointment times.",
      "Agent explained that the first payment is only due at the first service and suggested starting in March or April.",
    ],
    whatDidntWork: [
      "None. The agent immediately agreed to send the email without attempting to overcome the delay.",
      "Agent explained that the tech can\u2019t service without it, but can cancel on-site if the customer decides not to proceed.",
      "Agent provided his name and noted that the customer could call back the same number to reach him.",
      "Agent tried to add value by offering a free initial pest control treatment bundled with the flea service.",
    ],
  },
  {
    id: "existing",
    name: "Already Have Service",
    shortName: "Existing Service",
    revenueLost: 12_100,
    callCount: 6,
    recoveryRate: 0.28,
    whatWorked: [
      "Agent asked what specific pests the current provider was treating and found a coverage gap.",
      "Agent offered a free inspection to compare results side-by-side before asking for a switch.",
    ],
    whatDidntWork: [
      "Agent immediately asked when their current contract expires instead of addressing satisfaction.",
      "Agent badmouthed the competitor, which made the customer defensive.",
    ],
  },
  {
    id: "callback",
    name: "Call Back Later",
    shortName: "Callback Stall",
    revenueLost: 8_800,
    callCount: 7,
    recoveryRate: 0.22,
    whatWorked: [
      "Agent confirmed a specific callback time and sent a calendar invite to lock it in.",
      "Agent asked one quick qualifying question before letting them go, keeping engagement alive.",
    ],
    whatDidntWork: [
      "Agent said 'no problem' and hung up without setting a specific callback time.",
      "Agent called back at a random time the next day with no reference to the prior conversation.",
    ],
  },
];

// ── Calls by Objection ───────────────────────────────────────────────
// Revenue amounts per call roughly sum to the category total.

export const OBJECTION_CALLS: ObjectionCall[] = [
  // ── Spouse / Decision Maker ($37,400) ──────────────────────────────
  {
    id: "oc-s1",
    objectionId: "spouse",
    leadName: "Rebecca Hall",
    repName: "Jake Morrison",
    revenueAtStake: 548,
    leadSource: "Google Ads",
    serviceType: "General Pest",
    quote: "I need to talk to my husband first before we commit to anything.",
    outcome: "lost",
    checkpointScore: 58,
    highlighted: true,
  },
  {
    id: "oc-s2",
    objectionId: "spouse",
    leadName: "Karen Mitchell",
    repName: "Tyler Brooks",
    revenueAtStake: 624,
    leadSource: "Direct Mail",
    serviceType: "Termite",
    quote: "My wife handles the bills. I can't sign up without her OK.",
    outcome: "lost",
    checkpointScore: 62,
  },
  {
    id: "oc-s3",
    objectionId: "spouse",
    leadName: "Maria Santos",
    repName: "Sarah Chen",
    revenueAtStake: 475,
    leadSource: "Meta Ads",
    serviceType: "General Pest",
    quote: "I want to but my husband will kill me if I sign up for something without asking.",
    outcome: "stalled",
    checkpointScore: 72,
  },
  {
    id: "oc-s4",
    objectionId: "spouse",
    leadName: "Tom Bradley",
    repName: "Jake Morrison",
    revenueAtStake: 396,
    leadSource: "Google Ads",
    serviceType: "Mosquito",
    quote: "Let me talk to my wife. She's the one who brought up the pest thing anyway.",
    outcome: "lost",
    checkpointScore: 55,
  },
  {
    id: "oc-s5",
    objectionId: "spouse",
    leadName: "Diane Foster",
    repName: "Amanda Reyes",
    revenueAtStake: 718,
    leadSource: "Referral",
    serviceType: "Termite + General Pest",
    quote: "I really need to run this by my husband. He does all the house stuff.",
    outcome: "recovered",
    checkpointScore: 84,
  },
  {
    id: "oc-s6",
    objectionId: "spouse",
    leadName: "Stephanie Owens",
    repName: "Tyler Brooks",
    revenueAtStake: 562,
    leadSource: "Yelp",
    serviceType: "General Pest",
    quote: "Honestly I'd say yes right now, but my husband would want to look at it.",
    outcome: "lost",
    checkpointScore: 60,
  },

  // ── Price Too High ($24,200) ───────────────────────────────────────
  {
    id: "oc-p1",
    objectionId: "price",
    leadName: "Lisa Chen",
    repName: "Tyler Brooks",
    revenueAtStake: 498,
    leadSource: "Direct Mail",
    serviceType: "General Pest",
    quote: "That's more than I was expecting to pay. Another company quoted me $120.",
    outcome: "lost",
    checkpointScore: 68,
    highlighted: true,
  },
  {
    id: "oc-p2",
    objectionId: "price",
    leadName: "Greg Patterson",
    repName: "Jake Morrison",
    revenueAtStake: 385,
    leadSource: "Google Ads",
    serviceType: "General Pest",
    quote: "Whoa, that's way more than I thought. I was thinking like $100.",
    outcome: "lost",
    checkpointScore: 56,
  },
  {
    id: "oc-p3",
    objectionId: "price",
    leadName: "Laura Martinez",
    repName: "Sarah Chen",
    revenueAtStake: 596,
    leadSource: "Google Ads",
    serviceType: "Termite",
    quote: "I just can't justify spending that much right now with everything going on.",
    outcome: "stalled",
    checkpointScore: 78,
  },
  {
    id: "oc-p4",
    objectionId: "price",
    leadName: "Brian Kowalski",
    repName: "Tyler Brooks",
    revenueAtStake: 420,
    leadSource: "Meta Ads",
    serviceType: "General Pest",
    quote: "Yeah, that's steep. I've been getting by with the stuff from Home Depot.",
    outcome: "lost",
    checkpointScore: 52,
  },
  {
    id: "oc-p5",
    objectionId: "price",
    leadName: "Cheryl Adams",
    repName: "Amanda Reyes",
    revenueAtStake: 650,
    leadSource: "Referral",
    serviceType: "Termite + Mosquito",
    quote: "I love the coverage but I'm not sure it fits our budget this quarter.",
    outcome: "recovered",
    checkpointScore: 82,
  },

  // ── Need to Think About It ($18,900) ───────────────────────────────
  {
    id: "oc-t1",
    objectionId: "think",
    leadName: "Chris Palmer",
    repName: "Tyler Brooks",
    revenueAtStake: 470,
    leadSource: "Yelp",
    serviceType: "General Pest",
    quote: "Let me think about it and I'll call you back if I decide to go with you guys.",
    outcome: "lost",
    checkpointScore: 60,
    highlighted: true,
  },
  {
    id: "oc-t2",
    objectionId: "think",
    leadName: "Jennifer Walsh",
    repName: "Sarah Chen",
    revenueAtStake: 545,
    leadSource: "Referral",
    serviceType: "General Pest",
    quote: "I'm not ready to decide today. Can you send me something I can look over?",
    outcome: "stalled",
    checkpointScore: 74,
  },
  {
    id: "oc-t3",
    objectionId: "think",
    leadName: "Derek Young",
    repName: "Jake Morrison",
    revenueAtStake: 388,
    leadSource: "Google Ads",
    serviceType: "Mosquito",
    quote: "I want to sleep on it. I never make decisions like this on the phone.",
    outcome: "lost",
    checkpointScore: 58,
  },
  {
    id: "oc-t4",
    objectionId: "think",
    leadName: "Angela Torres",
    repName: "Tyler Brooks",
    revenueAtStake: 512,
    leadSource: "Meta Ads",
    serviceType: "General Pest",
    quote: "I need some time to think this through. Can I call you back tomorrow?",
    outcome: "lost",
    checkpointScore: 64,
  },
  {
    id: "oc-t5",
    objectionId: "think",
    leadName: "William Chen",
    repName: "Priya Patel",
    revenueAtStake: 680,
    leadSource: "Google Ads",
    serviceType: "Termite",
    quote: "I want to compare a few options before I pull the trigger.",
    outcome: "stalled",
    checkpointScore: 76,
  },

  // ── Already Have Service ($12,100) ─────────────────────────────────
  {
    id: "oc-e1",
    objectionId: "existing",
    leadName: "James Wilson",
    repName: "Tyler Brooks",
    revenueAtStake: 390,
    leadSource: "Direct Mail",
    serviceType: "General Pest",
    quote: "We already have someone coming out every quarter. I'm under contract.",
    outcome: "lost",
    checkpointScore: 64,
  },
  {
    id: "oc-e2",
    objectionId: "existing",
    leadName: "Nancy Clark",
    repName: "Jake Morrison",
    revenueAtStake: 425,
    leadSource: "Yelp",
    serviceType: "General Pest",
    quote: "I've got a guy who's been doing my place for years. Hard to switch.",
    outcome: "lost",
    checkpointScore: 58,
  },
  {
    id: "oc-e3",
    objectionId: "existing",
    leadName: "Robert Garcia",
    repName: "Sarah Chen",
    revenueAtStake: 580,
    leadSource: "Google Ads",
    serviceType: "Termite",
    quote: "We're already with Terminix. They're not great but we're locked in.",
    outcome: "stalled",
    checkpointScore: 70,
  },
  {
    id: "oc-e4",
    objectionId: "existing",
    leadName: "Patricia Moore",
    repName: "Amanda Reyes",
    revenueAtStake: 475,
    leadSource: "Direct Mail",
    serviceType: "General Pest",
    quote: "My son-in-law does pest control so we just have him come by.",
    outcome: "lost",
    checkpointScore: 66,
  },

  // ── Call Back Later ($8,800) ───────────────────────────────────────
  {
    id: "oc-cb1",
    objectionId: "callback",
    leadName: "Tony Nguyen",
    repName: "Jake Morrison",
    revenueAtStake: 350,
    leadSource: "Meta Ads",
    serviceType: "General Pest",
    quote: "I'm driving right now. Can you call me back in like an hour?",
    outcome: "lost",
    checkpointScore: 52,
  },
  {
    id: "oc-cb2",
    objectionId: "callback",
    leadName: "Brandon Lee",
    repName: "Tyler Brooks",
    revenueAtStake: 410,
    leadSource: "Meta Ads",
    serviceType: "General Pest",
    quote: "This isn't a good time. Can you try me again tomorrow afternoon?",
    outcome: "lost",
    checkpointScore: 48,
  },
  {
    id: "oc-cb3",
    objectionId: "callback",
    leadName: "Sandra Lewis",
    repName: "Sarah Chen",
    revenueAtStake: 520,
    leadSource: "Google Ads",
    serviceType: "Termite",
    quote: "I'm at work, I can't really talk. Call me after 5?",
    outcome: "stalled",
    checkpointScore: 56,
  },
  {
    id: "oc-cb4",
    objectionId: "callback",
    leadName: "Mark Russell",
    repName: "Tyler Brooks",
    revenueAtStake: 380,
    leadSource: "Organic",
    serviceType: "General Pest",
    quote: "Hey I'm about to walk into a meeting. Try me later today.",
    outcome: "lost",
    checkpointScore: 44,
  },
];

// ── Full Transcripts (for highlighted calls) ─────────────────────────

export const OBJECTION_TRANSCRIPTS: ObjectionTranscript[] = [
  // ── Spouse Objection — Jake Morrison / Rebecca Hall ────────────────
  {
    callId: "oc-s1",
    repName: "Jake Morrison",
    leadName: "Rebecca Hall",
    objectionId: "spouse",
    duration: "4:12",
    exchanges: [
      {
        speaker: "rep",
        speakerName: "Jake",
        text: "Thanks for calling Pest Control, this is Jake. How can I help you today?",
        timestamp: "0:00",
      },
      {
        speaker: "lead",
        speakerName: "Rebecca",
        text: "Hi Jake. I saw your ad on Google. We're having a roach problem in our kitchen and it's getting pretty bad.",
        timestamp: "0:08",
      },
      {
        speaker: "rep",
        speakerName: "Jake",
        text: "I'm sorry to hear that, Rebecca. How long have you been seeing them?",
        timestamp: "0:18",
      },
      {
        speaker: "lead",
        speakerName: "Rebecca",
        text: "About three weeks now. Started with one or two and now I'm seeing them every morning. My kids are freaked out.",
        timestamp: "0:24",
      },
      {
        speaker: "rep",
        speakerName: "Jake",
        text: "Yeah, that's definitely something we want to get ahead of. Roaches multiply fast. For your situation, our quarterly plan would be the best fit. It includes the initial treatment plus ongoing prevention.",
        timestamp: "0:36",
      },
      {
        speaker: "lead",
        speakerName: "Rebecca",
        text: "OK, how much is that going to run us?",
        timestamp: "0:52",
      },
      {
        speaker: "rep",
        speakerName: "Jake",
        text: "The initial visit is $199 and then it's $149 per quarter after that. Everything's covered under our guarantee.",
        timestamp: "0:56",
      },
      {
        speaker: "lead",
        speakerName: "Rebecca",
        text: "That sounds reasonable actually. The thing is, I need to talk to my husband first before we commit to anything.",
        isObjectionMoment: true,
        timestamp: "1:12",
      },
      {
        speaker: "rep",
        speakerName: "Jake",
        text: "Oh yeah, totally understand. No rush at all. Why don't I send you over the details and you can talk it over?",
        timestamp: "1:24",
      },
      {
        speaker: "lead",
        speakerName: "Rebecca",
        text: "Yeah, that would be great. My email is rebecca.hall@gmail.com.",
        timestamp: "1:38",
      },
      {
        speaker: "rep",
        speakerName: "Jake",
        text: "Got it. I'll shoot that over right now. Just give us a call back when you're ready.",
        timestamp: "1:44",
      },
      {
        speaker: "lead",
        speakerName: "Rebecca",
        text: "Will do. Thanks, Jake.",
        timestamp: "1:56",
      },
    ],
    coachingNote: {
      summary:
        "Jake offered to save the quote and send it over — this approach has a low success rate for spouse objections. Higher-performing reps offer to call back in 5 minutes after the customer talks to their spouse, or send a text with the quote to simplify next steps. 61% of spouse objections are recoverable with these tactics.",
      suggestedResponse:
        "Totally understand — what if I give you 5 minutes to talk it over with your husband, and I'll call right back? That way you've got all the details fresh and I can answer any questions he has too.",
      objectionName: "Spouse / Decision Maker",
    },
    outcomeTag:
      "Lead asked to check with spouse - no follow-up attempt made. Deal lost.",
  },

  // ── Price Objection — Tyler Brooks / Lisa Chen ─────────────────────
  {
    callId: "oc-p1",
    repName: "Tyler Brooks",
    leadName: "Lisa Chen",
    objectionId: "price",
    duration: "3:18",
    exchanges: [
      {
        speaker: "rep",
        speakerName: "Tyler",
        text: "Thanks for calling Pest Control, this is Tyler. How can I help you?",
        timestamp: "0:00",
      },
      {
        speaker: "lead",
        speakerName: "Lisa",
        text: "Hi, yeah I found you guys online. We're seeing roaches in the kitchen and I need someone to come out.",
        timestamp: "0:08",
      },
      {
        speaker: "rep",
        speakerName: "Tyler",
        text: "I'm sorry to hear that. How long has that been going on?",
        timestamp: "0:18",
      },
      {
        speaker: "lead",
        speakerName: "Lisa",
        text: "Maybe two weeks? It started in the kitchen but now I'm seeing them in the bathroom too. It's getting worse.",
        timestamp: "0:24",
      },
      {
        speaker: "rep",
        speakerName: "Tyler",
        text: "Got it. For roaches, our quarterly plan is the best fit. It covers full interior and perimeter treatment.",
        timestamp: "0:35",
      },
      {
        speaker: "lead",
        speakerName: "Lisa",
        text: "OK, what does that run?",
        timestamp: "0:46",
      },
      {
        speaker: "rep",
        speakerName: "Tyler",
        text: "It's $189 for the initial visit, then $149 per quarter after that.",
        timestamp: "0:50",
      },
      {
        speaker: "lead",
        speakerName: "Lisa",
        text: "That's more than I was expecting to pay. I got a quote from another company for $120.",
        isObjectionMoment: true,
        timestamp: "1:02",
      },
      {
        speaker: "rep",
        speakerName: "Tyler",
        text: "I understand. Let me tell you about our coverage - we also treat the attic and crawlspace, which most companies don't include.",
        timestamp: "1:12",
      },
      {
        speaker: "lead",
        speakerName: "Lisa",
        text: "I mean, I really just need the kitchen and bathroom taken care of. Do you do one-time treatments?",
        timestamp: "1:28",
      },
      {
        speaker: "rep",
        speakerName: "Tyler",
        text: "We do, but the quarterly plan is really the way to go because roaches tend to come back without ongoing treatment.",
        timestamp: "1:36",
      },
      {
        speaker: "lead",
        speakerName: "Lisa",
        text: "OK, let me think about it. Can you send me some info?",
        timestamp: "1:52",
      },
      {
        speaker: "rep",
        speakerName: "Tyler",
        text: "Sure, I'll email you over the details. What's a good email for you?",
        timestamp: "2:01",
      },
      {
        speaker: "lead",
        speakerName: "Lisa",
        text: "It's lisa.chen@gmail.com. Thanks.",
        timestamp: "2:12",
      },
    ],
    coachingNote: {
      summary:
        "Tyler emphasized coverage features instead of addressing the price gap directly. Reps who win on price objections offer a concrete discount (e.g. dropping $62 to $59) or a price-match guarantee — not feature lists. Explaining billing structure and warranty value also has a low success rate for this objection.",
      suggestedResponse:
        "I hear you on the price — $120 for a one-time treatment sounds good up front. We actually have a price-match guarantee for similar services. Plus our plan includes a full guarantee: if you see a single roach between visits, we come back free.",
      objectionName: "Price Too High",
    },
    outcomeTag:
      "Lead said they'd think about it - enrolled in SMS follow-up. No callback.",
  },

  // ── Think About It — Tyler Brooks / Chris Palmer ───────────────────
  {
    callId: "oc-t1",
    repName: "Tyler Brooks",
    leadName: "Chris Palmer",
    objectionId: "think",
    duration: "3:45",
    exchanges: [
      {
        speaker: "rep",
        speakerName: "Tyler",
        text: "Pest Control, this is Tyler.",
        timestamp: "0:00",
      },
      {
        speaker: "lead",
        speakerName: "Chris",
        text: "Hey Tyler, I'm calling about a scorpion problem. I found two in the house this week and my wife is losing it.",
        timestamp: "0:06",
      },
      {
        speaker: "rep",
        speakerName: "Tyler",
        text: "Yeah, scorpions are no joke. Where in the house are you finding them?",
        timestamp: "0:16",
      },
      {
        speaker: "lead",
        speakerName: "Chris",
        text: "One in the master bathroom, one in the garage. We've got little kids so it's kind of urgent.",
        timestamp: "0:22",
      },
      {
        speaker: "rep",
        speakerName: "Tyler",
        text: "Absolutely. We handle scorpions with our quarterly plan. Covers the full interior, exterior, and we seal common entry points.",
        timestamp: "0:32",
      },
      {
        speaker: "lead",
        speakerName: "Chris",
        text: "What's the cost looking like?",
        timestamp: "0:44",
      },
      {
        speaker: "rep",
        speakerName: "Tyler",
        text: "Initial treatment is $219 because of the scorpion specialty treatment. Then $149 a quarter.",
        timestamp: "0:48",
      },
      {
        speaker: "lead",
        speakerName: "Chris",
        text: "Let me think about it and I'll call you back if I decide to go with you guys.",
        isObjectionMoment: true,
        timestamp: "1:02",
      },
      {
        speaker: "rep",
        speakerName: "Tyler",
        text: "Sure, no problem. We're here whenever you're ready.",
        timestamp: "1:10",
      },
      {
        speaker: "lead",
        speakerName: "Chris",
        text: "OK, thanks.",
        timestamp: "1:16",
      },
    ],
    coachingNote: {
      summary:
        "Tyler immediately agreed and let the lead go — this matches the lowest-performing pattern for delay objections. Successful reps focus on the immediate need by suggesting specific appointment times, or offer to book the service out and not charge until then. Tyler missed a strong buying signal (kids + urgency) that top reps would have leveraged.",
      suggestedResponse:
        "I totally get it — since you mentioned the little ones, what I can do is book a tech for Saturday morning and you won't be charged until the service is done. That way your kids are safe this weekend, and you can decide on the quarterly plan after you see the results.",
      objectionName: "Need to Think About It",
    },
    outcomeTag:
      "Lead said they'd think about it. Never called back. Scorpion concern unresolved.",
  },
];

// ── Helpers ──────────────────────────────────────────────────────────

/** Get all calls for a specific objection */
export function getCallsByObjection(objectionId: string): ObjectionCall[] {
  return OBJECTION_CALLS.filter((c) => c.objectionId === objectionId);
}

/** Get the full transcript for a call if available */
export function getTranscriptForCall(
  callId: string
): ObjectionTranscript | undefined {
  return OBJECTION_TRANSCRIPTS.find((t) => t.callId === callId);
}

/** Computed totals */
export const OBJECTION_SUMMARY = {
  totalLost: OBJECTION_CATEGORIES.reduce((s, o) => s + o.revenueLost, 0),
  qualifiedUnclosed: OBJECTION_CATEGORIES.reduce(
    (s, o) => s + o.callCount,
    0
  ),
  recoverable: Math.round(
    OBJECTION_CATEGORIES.reduce(
      (s, o) => s + o.revenueLost * o.recoveryRate,
      0
    )
  ),
};

// ── Backward-compatible export for ObjectionClustering.tsx ───────────

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
