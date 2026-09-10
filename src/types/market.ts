export type MarketCategory = 
  | 'All'
  | 'Sports'
  | 'Crypto'
  | 'Politics'
  | 'Finance'
  | 'AI'
  | 'Technology'
  | 'Entertainment'
  | 'Culture';

export type MarketStatus = 'Active' | 'Closing Soon' | 'Closed' | 'Resolved';

export interface ChartPoint {
  time: string;
  yesPrice: number; // 0 to 1 (cents / probability)
  noPrice: number;
  volume: number;
}

export interface MarketExpertOpinion {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  badge: string;
  stance: 'YES' | 'NO';
  probabilityEstimate: number;
  rationale: string;
  likes: number;
  timestamp: string;
}

export interface Market {
  id: string;
  title: string;
  category: MarketCategory;
  description: string;
  status: MarketStatus;
  yesProbability: number; // 1 to 99%
  noProbability: number; // 100 - yesProbability
  change24h: number; // e.g. +4.2% or -2.1%
  volume24h: number; // in USD
  totalVolume: number;
  liquidity: number;
  closingDate: string;
  participantsCount: number;
  featured?: boolean;
  trending?: boolean;
  image?: string;
  lastUpdated: string;
  resolutionSource: string;
  resolutionSourceUrl: string;
  resolutionCriteria: string;
  excludedConditions: string;
  aiBrief: {
    summary: string;
    keyDrivers: string[];
    riskFactors: string[];
    sentimentBullish: number; // 0 to 100
    sources: { name: string; url: string }[];
  };
  chartHistory: {
    '1D': ChartPoint[];
    '1W': ChartPoint[];
    '1M': ChartPoint[];
    'ALL': ChartPoint[];
  };
  expertOpinions: MarketExpertOpinion[];
}
