export interface DemoSMSMessage {
  sender: "ai" | "lead";
  text: string;
  time: string;
}

export const DEMO_SMS_THREAD: DemoSMSMessage[] = [
  {
    sender: "ai",
    text: "Hey Jennifer, this is Sarah's team at Pest Control. You chatted with her earlier about getting your place on a quarterly plan. She mentioned you wanted to think it over — totally fair. Just wanted to see if any questions came up?",
    time: "2:47 PM",
  },
  {
    sender: "lead",
    text: "Yeah honestly the price was a little more than I expected. I was looking at like $40/month from another company",
    time: "3:12 PM",
  },
  {
    sender: "ai",
    text: "That's a fair comparison. The difference is we cover the full perimeter plus interior treatment, attic and crawlspace — most companies at that price point do exterior only. And if anything comes back between visits, we re-treat at no charge. Does the other quote include that?",
    time: "3:13 PM",
  },
  {
    sender: "lead",
    text: "I dont think so actually. They didnt mention the attic",
    time: "3:18 PM",
  },
  {
    sender: "ai",
    text: "Yeah, that's usually the gap. Especially in Arizona — scorpions and roaches nest in attics and if you're not treating up there, you're just managing the ones that make it downstairs. Want me to get you on the schedule? We have Thursday or Friday open this week.",
    time: "3:18 PM",
  },
  {
    sender: "lead",
    text: "Thursday works. Morning if possible",
    time: "3:24 PM",
  },
  {
    sender: "ai",
    text: "Done — Thursday 8-10 AM. I'm sending over a quick link to get your service agreement signed and your card on file. First quarterly treatment is $189, then $149/quarter after that.",
    time: "3:24 PM",
  },
  {
    sender: "lead",
    text: "Ok sounds good, just got the link",
    time: "3:31 PM",
  },
  {
    sender: "ai",
    text: "You're all set. Subscription created and tech confirmed for Thursday morning. You'll get a text reminder the night before. Welcome aboard, Jennifer!",
    time: "3:34 PM",
  },
];
