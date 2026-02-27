export interface TranscriptExchange {
  speaker: "rep" | "lead";
  speakerName: string;
  text: string;
  checkpoint?: {
    name: string;
    hit: boolean;
  };
  timestamp?: string;
}

export interface DemoTranscript {
  callId: string;
  agentName: string;
  leadName: string;
  duration: string;
  overallScore: number;
  exchanges: TranscriptExchange[];
  coachingNote: {
    summary: string;
    checkpoint: string;
    score: number;
  };
  outcomeTag: string;
}

/** Tyler Brooks / Lisa Chen — low score, needs coaching */
export const TRANSCRIPT_COACHING: DemoTranscript = {
  callId: "c-005",
  agentName: "Tyler Brooks",
  leadName: "Lisa Chen",
  duration: "3:18",
  overallScore: 68,
  exchanges: [
    {
      speaker: "rep",
      speakerName: "Tyler",
      text: "Thanks for calling Frontline Pest Control, this is Tyler. How can I help you?",
      checkpoint: { name: "Greeting", hit: true },
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
      checkpoint: { name: "Needs Assessment", hit: true },
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
      checkpoint: { name: "Service Recommendation", hit: true },
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
      checkpoint: { name: "Price Presentation", hit: true },
      timestamp: "0:50",
    },
    {
      speaker: "lead",
      speakerName: "Lisa",
      text: "Hmm, your price is a little higher than I expected. I got a quote from another company for $120.",
      timestamp: "1:02",
    },
    {
      speaker: "rep",
      speakerName: "Tyler",
      text: "I understand. Let me tell you about our coverage — we also treat the attic and crawlspace, which most companies don't include.",
      checkpoint: { name: "Objection Handling", hit: false },
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
      checkpoint: { name: "Urgency / Close Attempt", hit: false },
      timestamp: "2:01",
    },
    {
      speaker: "lead",
      speakerName: "Lisa",
      text: "It's lisa.chen@gmail.com. Thanks.",
      timestamp: "2:12",
    },
    {
      speaker: "rep",
      speakerName: "Tyler",
      text: "Got it. I'll send that over. Feel free to call back anytime if you have questions.",
      checkpoint: { name: "Booking Attempt", hit: false },
      timestamp: "2:18",
    },
  ],
  coachingNote: {
    summary:
      "Tyler missed the urgency close on this call. When Lisa raised the price objection, he pivoted to features (attic and crawlspace coverage) instead of addressing her specific concern — she said another company quoted $120. A better response: acknowledge the competing quote, then reframe around value and guarantee. When she said \"let me think about it,\" Tyler accepted the stall instead of creating urgency (\"I have a tech in your area Thursday — if we get you on the schedule today, I can waive the initial inspection fee\").",
    checkpoint: "Objection Handling",
    score: 68,
  },
  outcomeTag: "Lead said they'd think about it — enrolled in SMS follow-up",
};

/** Marcus Rivera / Mike Thompson — high score, exemplary */
export const TRANSCRIPT_EXEMPLARY: DemoTranscript = {
  callId: "c-001",
  agentName: "Marcus Rivera",
  leadName: "Mike Thompson",
  duration: "8:07",
  overallScore: 96,
  exchanges: [
    {
      speaker: "rep",
      speakerName: "Marcus",
      text: "Thanks for calling Frontline Pest Control, this is Marcus. Who do I have the pleasure of speaking with?",
      checkpoint: { name: "Greeting", hit: true },
      timestamp: "0:00",
    },
    {
      speaker: "lead",
      speakerName: "Mike",
      text: "Hey Marcus, this is Mike Thompson. I got your mailer about the free termite inspection?",
      timestamp: "0:10",
    },
    {
      speaker: "rep",
      speakerName: "Marcus",
      text: "Great to hear from you, Mike. Absolutely — we're running those in your area this month. Before we get into that, tell me a little about your home. What kind of pest concerns are you dealing with?",
      checkpoint: { name: "Needs Assessment", hit: true },
      timestamp: "0:18",
    },
    {
      speaker: "lead",
      speakerName: "Mike",
      text: "Honestly, a few things. We've got some ants coming in through the kitchen, and my wife thought she saw a termite swarm near the garage last spring.",
      timestamp: "0:34",
    },
    {
      speaker: "rep",
      speakerName: "Marcus",
      text: "OK, so ants in the kitchen and a possible termite concern near the garage. How long have the ants been an issue?",
      timestamp: "0:48",
    },
    {
      speaker: "lead",
      speakerName: "Mike",
      text: "Probably a couple months. We tried the store-bought stuff but they keep coming back.",
      timestamp: "0:56",
    },
    {
      speaker: "rep",
      speakerName: "Marcus",
      text: "That's really common — the OTC products just treat the surface. For a property like yours with both ant and termite concerns, I'd recommend our quarterly plan. It covers full interior and perimeter treatment for general pest, and we include the termite inspection as part of your initial visit at no extra charge.",
      checkpoint: { name: "Service Recommendation", hit: true },
      timestamp: "1:05",
    },
    {
      speaker: "lead",
      speakerName: "Mike",
      text: "OK, what does something like that cost?",
      timestamp: "1:28",
    },
    {
      speaker: "rep",
      speakerName: "Marcus",
      text: "For a property your size, the initial visit is $249 — that includes the full treatment plus the termite inspection. After that, it's $149 per quarter for ongoing protection. And everything's backed by our satisfaction guarantee — if you see any activity between visits, we come back at no cost.",
      checkpoint: { name: "Price Presentation", hit: true },
      timestamp: "1:34",
    },
    {
      speaker: "lead",
      speakerName: "Mike",
      text: "That's not bad. My neighbor uses a different company and I think they pay about the same. What makes you guys different?",
      timestamp: "2:02",
    },
    {
      speaker: "rep",
      speakerName: "Marcus",
      text: "Great question. The biggest difference is our coverage — we treat the attic, crawlspace, and garage in addition to the interior and exterior. Most companies skip those areas. Plus, that quarterly price is locked in for as long as you're a customer. No surprise increases.",
      checkpoint: { name: "Objection Handling", hit: true },
      timestamp: "2:14",
    },
    {
      speaker: "lead",
      speakerName: "Mike",
      text: "That's good to know. Yeah, we can definitely get someone out there this week. For a property your size, we're looking at the quarterly plan which covers all general pest...",
      timestamp: "2:38",
    },
    {
      speaker: "rep",
      speakerName: "Marcus",
      text: "I actually have a tech in your area Thursday morning between 8 and 10. If we get you on the schedule now, I can lock in that $249 rate before our spring pricing goes up next month.",
      checkpoint: { name: "Urgency / Close Attempt", hit: true },
      timestamp: "2:52",
    },
    {
      speaker: "lead",
      speakerName: "Mike",
      text: "Thursday works. Let's do it.",
      timestamp: "3:08",
    },
    {
      speaker: "rep",
      speakerName: "Marcus",
      text: "Perfect. Let me get you set up. I'll need the address and a card on file for the initial visit. You'll get a confirmation text with your tech's name and a two-hour window.",
      checkpoint: { name: "Booking Attempt", hit: true },
      timestamp: "3:12",
    },
  ],
  coachingNote: {
    summary:
      "Textbook call from Marcus. Strong needs assessment that uncovered both the immediate ant problem and the longer-term termite concern. Handled the comparison objection by leading with coverage differences and the price lock guarantee. Created urgency naturally with the Thursday availability and spring pricing deadline. Clean close with next steps clearly communicated.",
    checkpoint: "Overall",
    score: 96,
  },
  outcomeTag: "Closed — quarterly plan, Thursday appointment booked",
};
