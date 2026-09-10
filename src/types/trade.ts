export type Outcome = 'YES' | 'NO';

export interface DemoPosition {
  id: string;
  marketId: string;
  marketTitle: string;
  category: string;
  outcome: Outcome;
  shares: number;
  averagePrice: number; // e.g. 0.62 ($0.62 per share)
  currentPrice: number; // e.g. 0.68
  totalCost: number; // shares * averagePrice
  currentValue: number; // shares * currentPrice
  unrealizedPnL: number; // currentValue - totalCost
  unrealizedPnLPercent: number; // (unrealizedPnL / totalCost) * 100
  demoFees: number; // 0 for simulated demo
  openedAt: string;
}

export interface ClosedPosition {
  id: string;
  marketId: string;
  marketTitle: string;
  category: string;
  outcome: Outcome;
  shares: number;
  buyPrice: number;
  sellPrice: number;
  totalCost: number;
  realizedProceeds: number;
  realizedPnL: number;
  realizedPnLPercent: number;
  closedAt: string;
}

export interface TradeTransaction {
  id: string;
  timestamp: string;
  type: 'DEMO_BUY' | 'DEMO_SELL';
  marketId: string;
  marketTitle: string;
  outcome: Outcome;
  shares: number;
  pricePerShare: number;
  totalAmount: number;
  demoFee: number;
  status: 'COMPLETED';
}

export interface SellPreview {
  positionId: string;
  marketTitle: string;
  outcome: Outcome;
  sharesToSell: number;
  currentPrice: number;
  estimatedProceeds: number;
  demoFee: number;
  projectedBalance: number;
  projectedPnL: number;
}
