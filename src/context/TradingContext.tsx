import React, { createContext, useContext, useState, useEffect } from 'react';
import { DemoPosition, ClosedPosition, TradeTransaction, Outcome } from '../types/trade';
import { useMarket } from './MarketContext';
import confetti from 'canvas-confetti';

interface TradingContextType {
  virtualBalance: number;
  resetBalance: () => void;
  openPositions: DemoPosition[];
  closedPositions: ClosedPosition[];
  transactions: TradeTransaction[];
  totalPortfolioValue: number;
  totalUnrealizedPnL: number;
  totalRealizedPnL: number;
  winRate: number;
  executeDemoBuy: (
    marketId: string,
    marketTitle: string,
    category: string,
    outcome: Outcome,
    shares: number,
    pricePerShare: number
  ) => { success: boolean; message: string; transaction?: TradeTransaction };
  executeDemoSell: (
    positionId: string,
    sharesToSell: number,
    currentPrice: number
  ) => { success: boolean; message: string; transaction?: TradeTransaction; proceeds?: number; realizedPnL?: number };
  activeSellPosition: DemoPosition | null;
  setActiveSellPosition: (pos: DemoPosition | null) => void;
  recentReceipt: TradeTransaction | null;
  setRecentReceipt: (receipt: TradeTransaction | null) => void;
  pendingSharePost: { marketId: string; marketTitle: string; stance: Outcome; price: number; shares: number } | null;
  setPendingSharePost: (data: { marketId: string; marketTitle: string; stance: Outcome; price: number; shares: number } | null) => void;
}

const INITIAL_BALANCE = 10000.00;

const TradingContext = createContext<TradingContextType | undefined>(undefined);

export const TradingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { markets } = useMarket();

  const [virtualBalance, setVirtualBalance] = useState<number>(() => {
    const saved = localStorage.getItem('omx_demo_balance');
    return saved ? parseFloat(saved) : INITIAL_BALANCE;
  });

  const [openPositions, setOpenPositions] = useState<DemoPosition[]>(() => {
    const saved = localStorage.getItem('omx_demo_positions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    // Default demo positions so the user immediately sees their portfolio
    return [
      {
        id: 'pos-1',
        marketId: 'mkt-btc-120k',
        marketTitle: 'Will Bitcoin reach $120,000 before December 31, 2026?',
        category: 'Crypto',
        outcome: 'YES',
        shares: 500,
        averagePrice: 0.65,
        currentPrice: 0.71,
        totalCost: 325.00,
        currentValue: 355.00,
        unrealizedPnL: 30.00,
        unrealizedPnLPercent: 9.23,
        demoFees: 0,
        openedAt: '2026-09-08 14:30'
      },
      {
        id: 'pos-2',
        marketId: 'mkt-agi-frontier',
        marketTitle: 'Will an open-weight AI model score >85% on the ARC-AGI-2 benchmark in 2026?',
        category: 'AI',
        outcome: 'YES',
        shares: 300,
        averagePrice: 0.58,
        currentPrice: 0.64,
        totalCost: 174.00,
        currentValue: 192.00,
        unrealizedPnL: 18.00,
        unrealizedPnLPercent: 10.34,
        demoFees: 0,
        openedAt: '2026-09-08 16:15'
      }
    ];
  });

  const [closedPositions, setClosedPositions] = useState<ClosedPosition[]>(() => {
    const saved = localStorage.getItem('omx_closed_positions');
    return saved ? JSON.parse(saved) : [
      {
        id: 'cpos-1',
        marketId: 'mkt-election-resolved',
        marketTitle: 'Did the UK general parliamentary election conclude before August 2026?',
        category: 'Politics',
        outcome: 'YES',
        shares: 400,
        buyPrice: 0.75,
        sellPrice: 1.00,
        totalCost: 300.00,
        realizedProceeds: 400.00,
        realizedPnL: 100.00,
        realizedPnLPercent: 33.33,
        closedAt: '2026-08-02 11:20'
      }
    ];
  });

  const [transactions, setTransactions] = useState<TradeTransaction[]>(() => {
    const saved = localStorage.getItem('omx_demo_tx');
    return saved ? JSON.parse(saved) : [
      {
        id: 'tx-init-1',
        timestamp: '2026-09-08 14:30',
        type: 'DEMO_BUY',
        marketId: 'mkt-btc-120k',
        marketTitle: 'Will Bitcoin reach $120,000 before December 31, 2026?',
        outcome: 'YES',
        shares: 500,
        pricePerShare: 0.65,
        totalAmount: 325.00,
        demoFee: 0,
        status: 'COMPLETED'
      },
      {
        id: 'tx-init-2',
        timestamp: '2026-09-08 16:15',
        type: 'DEMO_BUY',
        marketId: 'mkt-agi-frontier',
        marketTitle: 'Will an open-weight AI model score >85% on the ARC-AGI-2 benchmark in 2026?',
        outcome: 'YES',
        shares: 300,
        pricePerShare: 0.58,
        totalAmount: 174.00,
        demoFee: 0,
        status: 'COMPLETED'
      }
    ];
  });

  const [activeSellPosition, setActiveSellPosition] = useState<DemoPosition | null>(null);
  const [recentReceipt, setRecentReceipt] = useState<TradeTransaction | null>(null);
  const [pendingSharePost, setPendingSharePost] = useState<{
    marketId: string;
    marketTitle: string;
    stance: Outcome;
    price: number;
    shares: number;
  } | null>(null);

  // Sync open positions with live market prices
  useEffect(() => {
    setOpenPositions((prev) =>
      prev.map((pos) => {
        const liveMarket = markets.find((m) => m.id === pos.marketId);
        if (!liveMarket) return pos;

        const liveProb = pos.outcome === 'YES' ? liveMarket.yesProbability : liveMarket.noProbability;
        const currentPrice = Number((liveProb / 100).toFixed(2));
        const currentValue = Number((pos.shares * currentPrice).toFixed(2));
        const unrealizedPnL = Number((currentValue - pos.totalCost).toFixed(2));
        const unrealizedPnLPercent = Number(((unrealizedPnL / pos.totalCost) * 100).toFixed(2));

        return {
          ...pos,
          currentPrice,
          currentValue,
          unrealizedPnL,
          unrealizedPnLPercent
        };
      })
    );
  }, [markets]);

  // Persist storage
  useEffect(() => {
    localStorage.setItem('omx_demo_balance', virtualBalance.toString());
  }, [virtualBalance]);

  useEffect(() => {
    localStorage.setItem('omx_demo_positions', JSON.stringify(openPositions));
  }, [openPositions]);

  useEffect(() => {
    localStorage.setItem('omx_closed_positions', JSON.stringify(closedPositions));
  }, [closedPositions]);

  useEffect(() => {
    localStorage.setItem('omx_demo_tx', JSON.stringify(transactions));
  }, [transactions]);

  const resetBalance = () => {
    setVirtualBalance(INITIAL_BALANCE);
    setOpenPositions([]);
    setClosedPositions([]);
    setTransactions([]);
    localStorage.removeItem('omx_demo_balance');
    localStorage.removeItem('omx_demo_positions');
    localStorage.removeItem('omx_closed_positions');
    localStorage.removeItem('omx_demo_tx');
  };

  // Demo Buy
  const executeDemoBuy = (
    marketId: string,
    marketTitle: string,
    category: string,
    outcome: Outcome,
    shares: number,
    pricePerShare: number
  ) => {
    const totalCost = Number((shares * pricePerShare).toFixed(2));

    if (totalCost > virtualBalance) {
      return { success: false, message: 'Insufficient virtual funds. Reset your demo balance to continue.' };
    }

    const newBalance = Number((virtualBalance - totalCost).toFixed(2));
    setVirtualBalance(newBalance);

    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const transaction: TradeTransaction = {
      id: `tx-${Date.now()}`,
      timestamp: now,
      type: 'DEMO_BUY',
      marketId,
      marketTitle,
      outcome,
      shares,
      pricePerShare,
      totalAmount: totalCost,
      demoFee: 0,
      status: 'COMPLETED'
    };

    setTransactions((prev) => [transaction, ...prev]);

    // Check if position already exists for this market & outcome
    setOpenPositions((prev) => {
      const existing = prev.find((p) => p.marketId === marketId && p.outcome === outcome);
      if (existing) {
        const totalShares = existing.shares + shares;
        const totalSpent = existing.totalCost + totalCost;
        const averagePrice = Number((totalSpent / totalShares).toFixed(2));
        const currentValue = Number((totalShares * pricePerShare).toFixed(2));
        const unrealizedPnL = Number((currentValue - totalSpent).toFixed(2));
        const unrealizedPnLPercent = Number(((unrealizedPnL / totalSpent) * 100).toFixed(2));

        return prev.map((p) =>
          p.id === existing.id
            ? {
                ...p,
                shares: totalShares,
                averagePrice,
                currentPrice: pricePerShare,
                totalCost: totalSpent,
                currentValue,
                unrealizedPnL,
                unrealizedPnLPercent
              }
            : p
        );
      } else {
        const newPos: DemoPosition = {
          id: `pos-${Date.now()}`,
          marketId,
          marketTitle,
          category,
          outcome,
          shares,
          averagePrice: pricePerShare,
          currentPrice: pricePerShare,
          totalCost,
          currentValue: totalCost,
          unrealizedPnL: 0,
          unrealizedPnLPercent: 0,
          demoFees: 0,
          openedAt: now
        };
        return [newPos, ...prev];
      }
    });

    // Trigger subtle celebratory confetti
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#22C55E', '#EF233C', '#FFFFFF']
      });
    } catch (e) {
      // safe fallback
    }

    setRecentReceipt(transaction);
    setPendingSharePost({
      marketId,
      marketTitle,
      stance: outcome,
      price: pricePerShare,
      shares
    });

    return { success: true, message: 'Simulated Demo Buy Completed Successfully!', transaction };
  };

  // Demo Sell
  const executeDemoSell = (
    positionId: string,
    sharesToSell: number,
    currentPrice: number
  ) => {
    const position = openPositions.find((p) => p.id === positionId);
    if (!position) {
      return { success: false, message: 'Position not found in portfolio.' };
    }

    if (sharesToSell <= 0 || sharesToSell > position.shares) {
      return { success: false, message: 'Invalid shares quantity.' };
    }

    const proceeds = Number((sharesToSell * currentPrice).toFixed(2));
    const costBasisOfSold = Number((sharesToSell * position.averagePrice).toFixed(2));
    const realizedPnL = Number((proceeds - costBasisOfSold).toFixed(2));
    const realizedPnLPercent = Number(((realizedPnL / costBasisOfSold) * 100).toFixed(2));

    const newBalance = Number((virtualBalance + proceeds).toFixed(2));
    setVirtualBalance(newBalance);

    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const transaction: TradeTransaction = {
      id: `tx-sell-${Date.now()}`,
      timestamp: now,
      type: 'DEMO_SELL',
      marketId: position.marketId,
      marketTitle: position.marketTitle,
      outcome: position.outcome,
      shares: sharesToSell,
      pricePerShare: currentPrice,
      totalAmount: proceeds,
      demoFee: 0,
      status: 'COMPLETED'
    };

    setTransactions((prev) => [transaction, ...prev]);

    // Update or remove open position
    if (sharesToSell >= position.shares) {
      setOpenPositions((prev) => prev.filter((p) => p.id !== positionId));
    } else {
      setOpenPositions((prev) =>
        prev.map((p) => {
          if (p.id === positionId) {
            const remainingShares = p.shares - sharesToSell;
            const remainingCost = Number((remainingShares * p.averagePrice).toFixed(2));
            const currentValue = Number((remainingShares * currentPrice).toFixed(2));
            const unrealizedPnL = Number((currentValue - remainingCost).toFixed(2));
            const unrealizedPnLPercent = Number(((unrealizedPnL / remainingCost) * 100).toFixed(2));

            return {
              ...p,
              shares: remainingShares,
              totalCost: remainingCost,
              currentValue,
              unrealizedPnL,
              unrealizedPnLPercent
            };
          }
          return p;
        })
      );
    }

    // Add to closed positions record
    const closedRecord: ClosedPosition = {
      id: `cpos-${Date.now()}`,
      marketId: position.marketId,
      marketTitle: position.marketTitle,
      category: position.category,
      outcome: position.outcome,
      shares: sharesToSell,
      buyPrice: position.averagePrice,
      sellPrice: currentPrice,
      totalCost: costBasisOfSold,
      realizedProceeds: proceeds,
      realizedPnL,
      realizedPnLPercent,
      closedAt: now
    };
    setClosedPositions((prev) => [closedRecord, ...prev]);

    setRecentReceipt(transaction);
    setActiveSellPosition(null);

    return {
      success: true,
      message: 'Simulated Demo Sell Executed!',
      transaction,
      proceeds,
      realizedPnL
    };
  };

  // Aggregated Portfolio Metrics
  const totalPositionsValue = openPositions.reduce((sum, p) => sum + p.currentValue, 0);
  const totalPortfolioValue = Number((virtualBalance + totalPositionsValue).toFixed(2));
  const totalUnrealizedPnL = Number(openPositions.reduce((sum, p) => sum + p.unrealizedPnL, 0).toFixed(2));
  const totalRealizedPnL = Number(closedPositions.reduce((sum, p) => sum + p.realizedPnL, 0).toFixed(2));

  const totalClosedTrades = closedPositions.length;
  const profitableClosed = closedPositions.filter((c) => c.realizedPnL > 0).length;
  const winRate = totalClosedTrades > 0 ? Math.round((profitableClosed / totalClosedTrades) * 100) : 75;

  return (
    <TradingContext.Provider
      value={{
        virtualBalance,
        resetBalance,
        openPositions,
        closedPositions,
        transactions,
        totalPortfolioValue,
        totalUnrealizedPnL,
        totalRealizedPnL,
        winRate,
        executeDemoBuy,
        executeDemoSell,
        activeSellPosition,
        setActiveSellPosition,
        recentReceipt,
        setRecentReceipt,
        pendingSharePost,
        setPendingSharePost
      }}
    >
      {children}
    </TradingContext.Provider>
  );
};

export const useTrading = () => {
  const context = useContext(TradingContext);
  if (!context) {
    throw new Error('useTrading must be used within a TradingProvider');
  }
  return context;
};
