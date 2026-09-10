import React, { useState } from 'react';
import { useTrading } from '../context/TradingContext';
import { useMarket } from '../context/MarketContext';
import { PortfolioSummary } from '../components/portfolio/PortfolioSummary';
import { OpenPositionsTable } from '../components/portfolio/OpenPositionsTable';
import { ClosedPositionsTable } from '../components/portfolio/ClosedPositionsTable';
import { TransactionHistoryTable } from '../components/portfolio/TransactionHistoryTable';
import { MarketCard } from '../components/markets/MarketCard';
import { ShieldAlert, Star, Clock, CheckCircle, ArrowRight } from 'lucide-react';

interface PortfolioPageProps {
  navigate: (route: string) => void;
  onTradeClick: (market: any, outcome: 'YES' | 'NO') => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ navigate, onTradeClick }) => {
  const { openPositions, closedPositions, transactions } = useTrading();
  const { watchlist, markets } = useMarket();

  const [activeTab, setActiveTab] = useState<'open' | 'closed' | 'history' | 'watchlist'>('open');

  const watchlistedMarkets = markets.filter((m) => watchlist.includes(m.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Title & Mandatory Regulatory Warning */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Demo Trading Portfolio</span>
          </h1>
          <p className="text-xs text-white/50 mt-1">
            Real-time tracking of simulated open positions, settled predictions, and account equity.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-red-950/20 border border-[#EF233C]/30 flex items-center gap-2.5 text-xs">
          <ShieldAlert className="w-4 h-4 text-[#EF233C] shrink-0" />
          <div className="font-mono">
            <span className="text-white font-bold block text-[11px]">DEMO MODE — VIRTUAL FUNDS ONLY</span>
            <span className="text-white/50 text-[10px]">Simulated Demo Result — Not Real Money</span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <PortfolioSummary />

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto scrollbar-none font-mono text-xs">
        <button
          onClick={() => setActiveTab('open')}
          className={`px-4 py-2 rounded-xl transition-all font-bold ${
            activeTab === 'open'
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              : 'text-white/50 hover:text-white'
          }`}
        >
          Open Holdings ({openPositions.length})
        </button>

        <button
          onClick={() => setActiveTab('closed')}
          className={`px-4 py-2 rounded-xl transition-all font-bold ${
            activeTab === 'closed'
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              : 'text-white/50 hover:text-white'
          }`}
        >
          Closed & Settled ({closedPositions.length})
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-xl transition-all font-bold ${
            activeTab === 'history'
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              : 'text-white/50 hover:text-white'
          }`}
        >
          Transaction History ({transactions.length})
        </button>

        <button
          onClick={() => setActiveTab('watchlist')}
          className={`px-4 py-2 rounded-xl transition-all font-bold ${
            activeTab === 'watchlist'
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              : 'text-white/50 hover:text-white'
          }`}
        >
          Watchlist ({watchlist.length})
        </button>
      </div>

      {/* Tab Panes */}
      <div>
        {activeTab === 'open' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-white/60">
              <span>All holdings have direct 1-click Sell access without navigating away:</span>
            </div>
            <OpenPositionsTable onViewMarket={(id) => navigate(`/market/${id}`)} />
          </div>
        )}

        {activeTab === 'closed' && (
          <ClosedPositionsTable />
        )}

        {activeTab === 'history' && (
          <TransactionHistoryTable />
        )}

        {activeTab === 'watchlist' && (
          <div>
            {watchlistedMarkets.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-[#0E0E12] border border-white/10 text-white/40 text-xs">
                Your watchlist is empty. Star markets to track their live odds here.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {watchlistedMarkets.map((m) => (
                  <MarketCard
                    key={m.id}
                    market={m}
                    onTradeClick={(market, outcome) => onTradeClick(market, outcome)}
                    onViewDetails={(id) => navigate(`/market/${id}`)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};
