export const SITE_URL = "https://plaibook.tech";
export const SITE_NAME = "Plaibook";
export const SITE_DESCRIPTION =
  "AI-powered sales optimization for home service businesses. Analyze every call, automate follow-ups, and close more deals.";

export const NAV_LINKS = [
  {
    label: "Products",
    children: [
      {
        label: "Analytics",
        href: "/analytics",
        description: "See every dollar. Track every call.",
      },
      {
        label: "SMS Upsales",
        href: "/sms-upsales",
        description: "AI conversations that close deals while you sleep.",
      },
      {
        label: "Auto Followups",
        href: "/auto-followups",
        description: "Never lose a lead to silence again.",
      },
      {
        label: "Homepage Widget",
        href: "/homepage-widget",
        description: "Turn website visitors into booked jobs.",
      },
      {
        label: "Competitions",
        href: "/competitions",
        description: "Gamify your sales team's performance.",
      },
    ],
  },
  { label: "Pricing", href: "#pricing" },
] as const;

export const PRODUCT_PAGES = [
  {
    slug: "analytics",
    title: "Analytics",
    headline: "See Every Dollar. Track Every Call.",
    subheadline:
      "Your CRM tracks leads. Plaibook tracks revenue. Know exactly where every dollar is won or lost in your sales funnel.",
    problemStatement:
      "You're spending thousands on leads but have no idea which calls convert and why. Your CRM tells you who called — Plaibook tells you who's buying and why others aren't.",
    features: [
      {
        title: "Call-Level Revenue Attribution",
        description:
          "See which calls turned into jobs, which reps close the most, and where your funnel breaks down.",
      },
      {
        title: "AI Call Scoring",
        description:
          "Every call scored on objection handling, upselling, and closing technique — automatically.",
      },
      {
        title: "Revenue Dashboards",
        description:
          "Real-time visibility into close rates, average ticket size, and revenue by rep, by branch, by day.",
      },
      {
        title: "Funnel Leak Detection",
        description:
          "Pinpoint exactly where leads drop off and the common patterns behind lost deals.",
      },
    ],
    stat: { value: "2.3×", label: "average close rate improvement" },
    cta: "Start Tracking Revenue",
  },
  {
    slug: "sms-upsales",
    title: "SMS Upsales",
    headline: "AI That Sells While You Sleep",
    subheadline:
      "Not bulk SMS. Real, AI-powered conversations with thousands of customers simultaneously — each one personalized, each one closing.",
    problemStatement:
      "Your techs finished the job. The customer's happy. But you're leaving money on the table — no one's offering the upgrade, the add-on, the annual plan. Until now.",
    features: [
      {
        title: "Intelligent Conversation Engine",
        description:
          "AI that reads the customer's service history and crafts the perfect upsell at the perfect time.",
      },
      {
        title: "Multi-Touch Sequences",
        description:
          "Automated follow-up sequences that feel personal, not robotic. Customers think they're texting a real person.",
      },
      {
        title: "Smart Timing",
        description:
          "Messages sent when customers are most likely to respond — not when it's convenient for your team.",
      },
      {
        title: "Revenue Per Message Tracking",
        description:
          "Know exactly how much revenue each SMS campaign generates. No guesswork.",
      },
    ],
    stat: { value: "$147K", label: "average additional weekly revenue" },
    cta: "Start Selling Smarter",
  },
  {
    slug: "auto-followups",
    title: "Auto Followups",
    headline: "Never Lose a Lead to Silence Again",
    subheadline:
      "Your competitor called back in 30 minutes. Plaibook texted in 30 seconds. Every lead gets followed up on — instantly, intelligently, automatically.",
    problemStatement:
      "The average home service company loses 40% of leads to slow follow-up. Your sales reps are busy, leads pile up, and by the time someone calls back — they've already booked with someone else.",
    features: [
      {
        title: "Instant Lead Response",
        description:
          "New lead comes in? AI sends a personalized text within seconds — before your competitor even picks up the phone.",
      },
      {
        title: "Persistent Re-Engagement",
        description:
          "Leads go cold? Multi-day follow-up sequences that bring them back — without your team lifting a finger.",
      },
      {
        title: "Smart Handoff",
        description:
          "When a lead is ready to book, AI seamlessly hands off to your team with full context.",
      },
      {
        title: "Lead Scoring",
        description:
          "AI prioritizes hot leads so your reps spend time on the ones most likely to close.",
      },
    ],
    stat: { value: "30s", label: "average response time" },
    cta: "Never Miss Another Lead",
  },
  {
    slug: "homepage-widget",
    title: "Homepage Widget",
    headline: "Turn Website Visitors Into Booked Jobs",
    subheadline:
      "A chat widget that actually closes deals. Not a chatbot that sends people to a FAQ page — an AI sales agent that books appointments.",
    problemStatement:
      "Most website visitors leave without converting. Your current chat widget is either a glorified FAQ or goes straight to voicemail. Plaibook's widget actually sells.",
    features: [
      {
        title: "AI Sales Agent",
        description:
          "Not a chatbot — a trained AI that understands your services, pricing, and availability.",
      },
      {
        title: "Instant Booking",
        description:
          "Customers book directly through the widget. No phone tag, no forms, no waiting.",
      },
      {
        title: "24/7 Availability",
        description:
          "Your website works when your team doesn't. Capture leads at midnight, on weekends, on holidays.",
      },
      {
        title: "Seamless Handoff",
        description:
          "When a visitor needs a human, the widget transfers with full context — no repeating themselves.",
      },
    ],
    stat: { value: "3.2×", label: "more website conversions" },
    cta: "Add Plaibook to Your Site",
  },
  {
    slug: "competitions",
    title: "Competitions",
    headline: "Make Sales Fun Again",
    subheadline:
      "Sales reps perform 3× better when they're competing. Leaderboards, challenges, and rewards that turn your team into closers.",
    problemStatement:
      "Your sales team is going through the motions. Same script, same effort, same results. They need something to fight for — and a reason to push harder on every call.",
    features: [
      {
        title: "Live Leaderboards",
        description:
          "Real-time rankings that light a fire under your team. Close rates, revenue, calls — tracked and displayed.",
      },
      {
        title: "Custom Challenges",
        description:
          "Create daily, weekly, or monthly competitions around the metrics that matter most to your business.",
      },
      {
        title: "Automated Rewards",
        description:
          "Set up prize pools and let the system handle tracking, announcing, and distributing rewards.",
      },
      {
        title: "Team vs. Team",
        description:
          "Branch vs. branch, shift vs. shift. Create healthy rivalry that drives results across your organization.",
      },
    ],
    stat: { value: "3×", label: "rep performance improvement" },
    cta: "Motivate Your Team",
  },
] as const;
