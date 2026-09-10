import React, { useState } from 'react';
import { useMarket } from '../context/MarketContext';
import { MarketCard } from '../components/markets/MarketCard';
import { MarketCategory, MarketStatus } from '../types/market';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Radio, 
  Grid, 
  List, 
  ShieldAlert, 
  Sparkles,
  Zap,
  RotateCcw
} from 'lucide-react';

interface MarketsPageProps {
  navigate: (route: string) => void;
  onTradeClick: (market: any, outcome: 'YES' | 'NO') => void;
}

export const MarketsPage: React.FC<MarketsPageProps> = ({ navigate, onTradeClick }) => {
  const {
    filteredMarkets,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    lastGlobalUpdate
  } = useMarket();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories: MarketCategory[] = [
    'All',
    'Crypto',
    'AI',
    'Finance',
    'Technology',
    'Sports',
    'Politics',
    'Entertainment',
    'Culture'
  ];

  const statuses: (MarketStatus | 'All')[] = ['All', 'Active', 'Closing Soon', 'Closed', 'Resolved'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header & Live Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              LIVE REAL-TIME FEED
            </span>
            <span className="text-xs text-white/40 font-mono">
              • Updated {lastGlobalUpdate}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Live Prediction Markets
          </h1>
          <p className="text-xs text-white/60 mt-1">
            Explore active consensus odds across global events with verified resolution oracles.
          </p>
        </div>

        {/* Mandatory Demo Label */}
        <div className="p-3 rounded-2xl bg-red-950/20 border border-[#EF233C]/30 flex items-center gap-2.5 text-xs">
          <ShieldAlert className="w-4 h-4 text-[#EF233C] shrink-0" />
          <div className="font-mono">
            <span className="text-white font-bold block text-[11px]">DEMO MODE — VIRTUAL FUNDS ONLY</span>
            <span className="text-white/50 text-[10px]">Real-money trading requires separate KYC compliance</span>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-[#EF233C] to-[#d91d34] text-white shadow-[0_0_15px_-3px_rgba(239,35,60,0.5)]'
                  : 'bg-[#101014] text-white/70 hover:text-white hover:bg-white/5 border border-white/[0.08]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Search, Status & Sorting Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        
        {/* Search Input */}
        <div className="sm:col-span-5 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events, tickers, or oracles..."
            className="w-full bg-[#0F0F14] border border-white/10 rounded-xl px-4 py-2.5 pl-10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-emerald-500/50 font-mono"
          />
          <Search className="w-4 h-4 text-white/40 absolute left-3 top-3" />
        </div>

        {/* Status Dropdown */}
        <div className="sm:col-span-3">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as any)}
            className="w-full bg-[#0F0F14] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500/50 font-mono"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                Status: {status}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="sm:col-span-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full bg-[#0F0F14] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500/50 font-mono"
          >
            <option value="trending">Sort: Trending First</option>
            <option value="volume">Sort: Highest Volume</option>
            <option value="closingSoon">Sort: Closing Soon</option>
            <option value="highestOdds">Sort: Highest Probability</option>
            <option value="newest">Sort: Most Participants</option>
          </select>
        </div>

        {/* View Switcher */}
        <div className="sm:col-span-1 flex justify-end">
          <div className="p-1 rounded-xl bg-white/5 border border-white/10 flex">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg ${viewMode === 'grid' ? 'bg-white/20 text-white' : 'text-white/40 hover:text-white'}`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg ${viewMode === 'list' ? 'bg-white/20 text-white' : 'text-white/40 hover:text-white'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Markets Content */}
      {filteredMarkets.length === 0 ? (
        <div className="p-16 text-center rounded-3xl bg-[#0E0E12] border border-white/[0.08] space-y-3">
          <p className="text-sm font-bold text-white">No prediction markets found matching your criteria</p>
          <p className="text-xs text-white/50">Try broadening your search or resetting active filters.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedStatus('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-colors inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMarkets.map((market) => (
            <MarketCard
              key={market.id}
              market={market}
              onTradeClick={(m, outcome) => onTradeClick(m, outcome)}
              onViewDetails={(id) => navigate(`/market/${id}`)}
            />
          ))}
        </div>
      ) : (
        /* List View */
        <div className="rounded-2xl bg-[#0E0E12] border border-white/10 divide-y divide-white/[0.06] overflow-hidden">
          {filteredMarkets.map((m) => (
            <div
              key={m.id}
              className="p-4 hover:bg-white/[0.02] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/10 text-white/70">
                    {m.category}
                  </span>
                  <span className="text-[11px] text-emerald-400 font-mono">
                    LIVE • {m.lastUpdated}
                  </span>
                </div>
                <h4
                  onClick={() => navigate(`/market/${m.id}`)}
                  className="text-sm font-bold text-white hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {m.title}
                </h4>
                <p className="text-xs text-white/50 font-mono mt-1 truncate">
                  Oracle: {m.resolutionSource}
                </p>
              </div>

              {/* Odds & Quick Trade */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right font-mono mr-2">
                  <span className="text-sm font-bold text-emerald-400 block">{m.yesProbability}% YES</span>
                  <span className="text-[10px] text-white/40">${(m.volume24h / 1000).toFixed(0)}k volume</span>
                </div>

                <button
                  onClick={() => onTradeClick(m, 'YES')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/40 text-emerald-400 text-xs font-bold font-mono transition-all flex items-center gap-1"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Trade YES</span>
                </button>

                <button
                  onClick={() => onTradeClick(m, 'NO')}
                  className="px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/50 border border-[#EF233C]/40 text-[#EF233C] text-xs font-bold font-mono transition-all flex items-center gap-1"
                >
                  <span>Trade NO</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
