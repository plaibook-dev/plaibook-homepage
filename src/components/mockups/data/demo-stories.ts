export interface StoryCheckpoint {
  label: string;
  passed: boolean;
  timestamp?: string; // e.g. "2:14"
}

export interface StoryTranscriptLine {
  speaker: "agent" | "customer";
  text: string;
  timestamp: string; // e.g. "4:23"
}

export interface StorySMSMessage {
  sender: "ai" | "lead";
  text: string;
  time: string;
}

export interface Story {
  id: string;
  repName: string;
  repInitials: string;
  leadName: string;
  leadSource: string;
  callDuration: number;
  callTimestamp: string;
  checkpointScore: number; // 0-100
  checkpoints: StoryCheckpoint[];
  // Transcript snippet — key moment from the call
  transcriptSnippet: StoryTranscriptLine[];
  // Insight frame data
  objection: string;
  objectionShort: string;
  customerQuote: string; // italicized quote from the customer
  sentimentStart: string; // e.g. "Interested"
  sentimentEnd: string; // e.g. "Hesitant"
  coachingNote: string; // what the rep should have done
  revenueAtStake: number;
  pipelineStages: string[];
  stalledStageIndex: number;
  // SMS thread
  smsThread: StorySMSMessage[];
  recoveredRevenue: number;
}

const PIPELINE = ["New Lead", "Qualified", "Proposal", "Negotiation", "Closed"];

export const STORIES: Story[] = [
  // Story 1: Marcus Rivera / Rebecca Hall — spouse objection
  {
    id: "story-marcus",
    repName: "Marcus Rivera",
    repInitials: "MR",
    leadName: "Rebecca Hall",
    leadSource: "Google Ads",
    callDuration: 312,
    callTimestamp: "2 hr ago",
    checkpointScore: 88,
    checkpoints: [
      { label: "Greeting & rapport", passed: true, timestamp: "0:08" },
      { label: "Needs assessment", passed: true, timestamp: "1:12" },
      { label: "Price presentation", passed: true, timestamp: "3:20" },
      { label: "Overcame spouse objection", passed: false, timestamp: "4:15" },
      { label: "Asked for the sale", passed: true, timestamp: "4:52" },
    ],
    transcriptSnippet: [
      { speaker: "customer", text: "That sounds good but I really need to talk to my husband first before we commit to anything.", timestamp: "4:15" },
      { speaker: "agent", text: "I totally understand. Let me send you a summary with all the pricing so you have everything in front of you.", timestamp: "4:22" },
      { speaker: "customer", text: "Yeah that would be great. He's going to ask about the guarantee for sure.", timestamp: "4:31" },
    ],
    objection: "Spouse objection — lead wants to talk it over",
    objectionShort: "Spouse objection",
    customerQuote: "I really need to talk to my husband first before we commit to anything.",
    sentimentStart: "Interested",
    sentimentEnd: "Hesitant",
    coachingNote: "Invite the spouse to join the call or offer a 3-way callback",
    revenueAtStake: 389,
    pipelineStages: PIPELINE,
    stalledStageIndex: 3,
    smsThread: [
      { sender: "ai", text: "Hey Rebecca, this is Marcus's team. He mentioned you wanted to talk things over with your husband — totally fair. Just following up with details so you both have everything.", time: "7:32 PM" },
      { sender: "lead", text: "Yeah we talked about it. He wants to know about the guarantee", time: "7:48 PM" },
      { sender: "ai", text: "Great question! If you see any pest activity between visits, we re-treat at no charge. Full guarantee, no fine print.", time: "7:49 PM" },
      { sender: "lead", text: "Ok that works. Can we do Saturday morning?", time: "7:55 PM" },
      { sender: "ai", text: "Done — Saturday 8-10 AM. Sending the agreement now. Welcome aboard!", time: "7:56 PM" },
      { sender: "lead", text: "Just signed. Thanks!", time: "8:02 PM" },
    ],
    recoveredRevenue: 389,
  },

  // Story 2: Sarah Chen / Tom Bradley — price objection
  {
    id: "story-sarah",
    repName: "Sarah Chen",
    repInitials: "SC",
    leadName: "Tom Bradley",
    leadSource: "Google Ads",
    callDuration: 278,
    callTimestamp: "53 min ago",
    checkpointScore: 72,
    checkpoints: [
      { label: "Greeting & rapport", passed: true, timestamp: "0:05" },
      { label: "Needs assessment", passed: true, timestamp: "0:48" },
      { label: "Price presentation", passed: false, timestamp: "2:34" },
      { label: "Handled price objection", passed: false, timestamp: "3:10" },
      { label: "Set urgency", passed: true, timestamp: "4:02" },
    ],
    transcriptSnippet: [
      { speaker: "customer", text: "Let me talk to my wife about it. We were getting quotes from a couple of companies.", timestamp: "3:10" },
      { speaker: "agent", text: "Of course, take your time. What's your availability look like next week if you decide to move forward?", timestamp: "3:18" },
      { speaker: "customer", text: "Probably Thursday or Friday. But honestly the other quote was cheaper.", timestamp: "3:25" },
    ],
    objection: "Price objection — comparing with cheaper competitor",
    objectionShort: "Price objection",
    customerQuote: "Honestly the other quote was cheaper.",
    sentimentStart: "Neutral",
    sentimentEnd: "Price-sensitive",
    coachingNote: "Anchor on value difference (attic + crawlspace coverage) before price reveal",
    revenueAtStake: 449,
    pipelineStages: PIPELINE,
    stalledStageIndex: 2,
    smsThread: [
      { sender: "ai", text: "Hey Tom, Sarah's team here. She mentioned you were comparing quotes — just wanted to make sure you're comparing apples to apples.", time: "7:30 PM" },
      { sender: "lead", text: "Yeah the other company is $40/month. You guys are $50", time: "7:41 PM" },
      { sender: "ai", text: "Fair point. We cover full perimeter + interior + attic and crawlspace. At $40 most do exterior only. And we re-treat free if anything comes back.", time: "7:42 PM" },
      { sender: "lead", text: "They didn't mention the attic actually. OK I'm in. Thursday?", time: "7:51 PM" },
      { sender: "ai", text: "Thursday 8-10 AM, locked in. Sending your agreement now!", time: "7:52 PM" },
      { sender: "lead", text: "Signed. See you Thursday", time: "7:58 PM" },
    ],
    recoveredRevenue: 449,
  },

  // Story 3: Priya Patel / William Chen — comparison shopping
  {
    id: "story-priya",
    repName: "Priya Patel",
    repInitials: "PP",
    leadName: "William Chen",
    leadSource: "Google Ads",
    callDuration: 312,
    callTimestamp: "2 hr ago",
    checkpointScore: 78,
    checkpoints: [
      { label: "Greeting & rapport", passed: true, timestamp: "0:06" },
      { label: "Needs assessment", passed: true, timestamp: "1:05" },
      { label: "Service recommendation", passed: true, timestamp: "2:18" },
      { label: "Overcame comparison objection", passed: false, timestamp: "3:42" },
      { label: "Booking attempt", passed: false, timestamp: "4:30" },
    ],
    transcriptSnippet: [
      { speaker: "customer", text: "I appreciate the info but I want to get a few more quotes before I decide.", timestamp: "3:42" },
      { speaker: "agent", text: "Totally understand. I'll send you a breakdown so you can compare side by side.", timestamp: "3:48" },
      { speaker: "customer", text: "That'd be helpful actually. I've got two others coming this week.", timestamp: "3:55" },
    ],
    objection: "Comparison shopping — wants to get more quotes",
    objectionShort: "Shopping around",
    customerQuote: "I want to get a few more quotes before I decide.",
    sentimentStart: "Interested",
    sentimentEnd: "Non-committal",
    coachingNote: "Ask what they're comparing on — steer toward value differentiators",
    revenueAtStake: 449,
    pipelineStages: PIPELINE,
    stalledStageIndex: 2,
    smsThread: [
      { sender: "ai", text: "Hey William, Priya's team here. She mentioned you're gathering quotes — smart move. Here's ours side by side for easy comparison.", time: "7:35 PM" },
      { sender: "lead", text: "Yeah I got 3 quotes. You guys are in the middle price-wise", time: "7:44 PM" },
      { sender: "ai", text: "Quick question — do the others include termite monitoring and the free re-treat guarantee? Those usually tip the total cost in our favor over a year.", time: "7:45 PM" },
      { sender: "lead", text: "Actually no. Neither mentioned termites. Let's go with you guys", time: "7:53 PM" },
      { sender: "ai", text: "Great choice. Friday morning work? Agreement ready in 2 minutes.", time: "7:54 PM" },
      { sender: "lead", text: "Friday works. Just signed the link", time: "8:01 PM" },
    ],
    recoveredRevenue: 449,
  },
];
