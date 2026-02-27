export interface LeadSourceRow {
  source: string;
  leads: number;
  closed: number;
  revenue: number;
  unqualified: number;
  costPerLead: number;
  /** null means organic / no ad spend (renders as infinity) */
  roas: number | null;
  /** Flag problem campaigns for visual highlighting */
  flagged?: boolean;
}

export interface UnqualifiedReason {
  reason: string;
  count: number;
}

export const DEMO_ATTRIBUTION: LeadSourceRow[] = [
  {
    source: "Google LSA",
    leads: 142,
    closed: 48,
    revenue: 28400,
    unqualified: 12,
    costPerLead: 62,
    roas: 3.2,
  },
  {
    source: 'Google Ads — "pest control near me"',
    leads: 89,
    closed: 31,
    revenue: 18200,
    unqualified: 5,
    costPerLead: 45,
    roas: 4.5,
  },
  {
    source: 'Google Ads — "termite inspection"',
    leads: 34,
    closed: 8,
    revenue: 7800,
    unqualified: 9,
    costPerLead: 78,
    roas: 1.2,
    flagged: true,
  },
  {
    source: "Yelp",
    leads: 28,
    closed: 11,
    revenue: 6200,
    unqualified: 3,
    costPerLead: 55,
    roas: 2.8,
  },
  {
    source: "Referral / Direct",
    leads: 67,
    closed: 38,
    revenue: 22100,
    unqualified: 1,
    costPerLead: 0,
    roas: null,
  },
  {
    source: "Nextdoor",
    leads: 18,
    closed: 4,
    revenue: 2400,
    unqualified: 6,
    costPerLead: 42,
    roas: 0.9,
    flagged: true,
  },
];

export const FLAGGED_CAMPAIGN_LABEL = 'Google Ads — "termite inspection"';

export const UNQUALIFIED_REASONS: UnqualifiedReason[] = [
  { reason: "WDI Documentation (not pest control)", count: 5 },
  { reason: "Out of Service Area", count: 3 },
  { reason: "Commercial (residential only)", count: 1 },
];
