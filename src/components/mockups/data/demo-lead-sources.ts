export interface DemoLeadSource {
  channel: string;
  leads: number;
  closeRate: number;
  revenue: number;
  revenuePerLead: number;
  color: string;
}

export const DEMO_LEAD_SOURCES: DemoLeadSource[] = [
  { channel: "Google Ads", leads: 342, closeRate: 0.34, revenue: 62400, revenuePerLead: 182, color: "#4285F4" },
  { channel: "Referral", leads: 128, closeRate: 0.48, revenue: 38200, revenuePerLead: 298, color: "#34A853" },
  { channel: "Yelp", leads: 97, closeRate: 0.22, revenue: 11800, revenuePerLead: 122, color: "#D32323" },
  { channel: "Meta Ads", leads: 214, closeRate: 0.28, revenue: 31600, revenuePerLead: 148, color: "#1877F2" },
  { channel: "Direct Mail", leads: 86, closeRate: 0.19, revenue: 8200, revenuePerLead: 95, color: "#8B5CF6" },
  { channel: "Organic", leads: 156, closeRate: 0.31, revenue: 24800, revenuePerLead: 159, color: "#F59E0B" },
];
